
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { apiFetch } from "../../utilities/apiRequest"
import baseUrl from "../../utilities/BaseURL";

const RequireNoFamily = () => {
    const [status, setStatus] = useState("checking");
    const [attempt, setAttempt] = useState(0);
    const [error, setError] = useState("");

    useEffect(() => {
        let ignore = false;

        const checkMembership = async () => {
            try {
                setStatus("checking");
                setError("");

                const response = await apiFetch(
                    `${baseUrl}/family/my-membership`,
                    {
                        method: "GET",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                );

                const result = await response.json();

                console.log("Membership API response:", result);
                console.log("Has family:", result.data?.hasFamily);

                if (!response.ok || !result.success) {
                    throw new Error(
                        result.message || "Unable to verify family membership"
                    );
                }

                if (!ignore) {
                    setStatus(
                        result.data?.hasFamily
                            ? "member"
                            : "not-member"
                    );
                }

            } catch (error) {
                console.error("Membership check failed:", error);

                if (!ignore) {
                    setError(error.message);
                    setStatus("error");
                }
            }
        };

        checkMembership();

        return () => {
            ignore = true;
        };

    }, [attempt]);

    // Loading state
    if (status === "checking") {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-3">
                <div className="w-8 h-8 border-4 border-[#2E5E99] border-t-transparent rounded-full animate-spin" />

                <p className="text-sm text-gray-500">
                    Checking your family membership...
                </p>
            </div>
        );
    }

    // Redirect existing family members
    if (status === "member") {
        return <Navigate to="/dashboard" replace />;
    }

    // Error state
    if (status === "error") {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-3 px-5 text-center">
                <p className="text-red-500 text-sm">
                    {error}
                </p>

                <button
                    onClick={() => setAttempt(prev => prev + 1)}
                    className="text-[#2E5E99] font-semibold text-sm"
                >
                    Try Again
                </button>
            </div>
        );
    }

    // Allow users without an approved family membership
    return <Outlet />;
};

export default RequireNoFamily;
