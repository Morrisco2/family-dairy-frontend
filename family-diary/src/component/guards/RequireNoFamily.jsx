import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

import { apiFetch } from "../../utilities/apiRequest";
import baseUrl from "../../utilities/BaseURL";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import Button from "../Button";

const RequireNoFamily = () => {
    const [status, setStatus] = useState("checking");
    const [attempt, setAttempt] = useState(0);
    const [error, setError] = useState("");
    const [leaders, setLeaders] = useState({});

    const navigate = useNavigate()

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



                if (!response.ok || !result.success) {
                    throw new Error(
                        result.message || "Unable to verify family membership"
                    );
                }

                const families = result.data?.families || [];

                // 1. Check for an approved family first
                const approvedFamily = families.find(
                    (family) => family.members?.[0]?.status === "approved"
                );

                // 2. Filter ALL families with a pending status
                const pendingFamilies = families.filter(
                    (family) => family.members?.[0]?.status === "pending"
                );

                if (!ignore) {
                    if (approvedFamily) {
                        setStatus("member");
                    } else if (pendingFamilies.length > 0) {
                        // Build an object of objects keyed by family._id
                        const pendingLeadersMap = pendingFamilies.reduce((acc, family) => {
                            if (family.leader) {
                                acc[family._id] = {
                                    ...family.leader,
                                    familyName: family.familyName,
                                    requestedAt: family.members?.[0]?.requestedAt
                                };
                            }
                            return acc;
                        }, {});

                        setLeaders(pendingLeadersMap);
                        setStatus("pending");
                    } else {
                        setStatus("not-member");
                    }
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

    // Redirect existing approved family members
    if (status === "member") {
        return <Navigate to="/dashboard" replace />;
    }

    // Pending state
    // Pending state
    if (status === "pending") {
        return (
            <div className="min-h-screen flex flex-col py-5 items-center justify-center gap-5 px-5 text-center bg-[#E9F1FA]">
                <h2 className="text-lg font-semibold text-[#2E5E99]">
                    Request Pending
                </h2>
                <p className="text-sm text-gray-600 max-w-md">
                    Your request to join is still pending approval from the family leader. You can reach out to them directly below:
                </p>

                {/* Render each pending leader object */}
                <div className="w-full max-w-sm flex flex-col gap-3">
                    {Object.entries(leaders).map(([familyId, leaderInfo]) => {
                        // Support common field names from your User schema
                        const leaderImage = leaderInfo.imageUrl || leaderInfo.avatar || leaderInfo.profilePicture;
                        const leaderName = leaderInfo.name || `${leaderInfo.firstName || ""} ${leaderInfo.lastName || ""}`.trim();
                        const leaderPhone = leaderInfo.phone || leaderInfo.phoneNumber;

                        return (
                            <div
                                key={familyId}
                                className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl bg-[#D0DDED] shadow-sm text-left"
                            >
                                {/* Leader Profile Image (with fallback initials) */}
                                {leaderImage ? (
                                    <img
                                        src={leaderImage}
                                        alt={leaderName}
                                        className="w-12 h-12 rounded-full object-cover border border-gray-200 shrink-0"
                                    />
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-[#2E5E99]/10 text-[#2E5E99] flex items-center justify-center font-semibold text-base shrink-0">
                                        {leaderName?.charAt(0)?.toUpperCase() || "L"}
                                    </div>
                                )}

                                {/* Family Name, Leader Name & Contact Info */}
                                <div className="flex flex-col gap-1 min-w-0 flex-1">
                                    <div className="mb-3 flex flex-col gap-1">
                                        <p className="text-sm font-semibold text-gray-900 truncate">
                                            {leaderInfo.familyName}
                                        </p>
                                        <p className="text-xs font-medium text-gray-700">
                                            {leaderName} (Leader)
                                        </p>

                                    </div>
                                    <div className="flex flex-col gap-2">
                                        {leaderInfo.email && (
                                            <div className="flex gap-2">
                                                <FaEnvelope className="text-[#2E5E99]" />
                                                <a
                                                    href={`mailto:${leaderInfo.email}`}
                                                    className="text-xs text-[#2E5E99] hover:underline truncate"
                                                >
                                                    {leaderInfo.email}
                                                </a>
                                            </div>
                                        )}

                                        {leaderPhone && (

                                            <div className="flex gap-2">
                                                <FaPhone className="text-[#2E5E99]" />
                                                <a
                                                    href={`tel:${leaderPhone}`}
                                                    className="text-xs text-[#2E5E99] hover:underline"
                                                >
                                                    {leaderPhone}
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div >
                <div className="flex gap-5 justify-center py-5">
                    <Button primary long={false} text="Go Back" onClick={()=>navigate('/login')} />

                <button
                    onClick={() => setAttempt((prev) => prev + 1)}
                    className="mt-2 text-[#2E5E99] font-semibold text-sm hover:underline"
                >
                    Refresh Status
                </button>
                </div>

            </div>
        );
    }


    // Error state
    if (status === "error") {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-3 px-5 text-center">
                <p className="text-red-500 text-sm">
                    {error}
                </p>
                <button
                    onClick={() => setAttempt((prev) => prev + 1)}
                    className="text-[#2E5E99] font-semibold text-sm"
                >
                    Try Again
                </button>
            </div>
        );
    }

    // Allow users without an approved or pending family membership
    return <Outlet />;
};

export default RequireNoFamily;
