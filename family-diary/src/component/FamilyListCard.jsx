
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import { apiFetch } from "../utilities/apiRequest";
import baseUrl from "../utilities/BaseURL";
import Button from "./Button";
import AlertToaster from "./toasters/AlertToaster";

const FamilyListCard = ({
    familyName = "Morrison’s Family",
    leaderName = "Uffikairo Morrison",
    image = "",
    familyId
}) => {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState({
        show: false,
        status: "",
        message: ""
    })
    const data = { familyId: familyId }

    const backgroundImgStyle = {
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
    };

    const handleJoinFamily = async () => {
        try {
            setLoading(true);



            const req = await apiFetch(`${baseUrl}/family/join-family`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })

            const res = await req.json()

            if (!res.success) {
                setShowAlert((prev) => ({
                    show: true,
                    message: res.message,
                    status: "failed"
                }))

                return
            }

            setShowAlert((prev)=>({
                ...prev, show: true,
                message: res.message,
                status: "success"
            }))

            navigate('/dashboard')

        } catch (error) {
            console.error("Failed to join family:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="bg-[#D0DDED] min-h-20 rounded-2xl p-4 flex justify-between items-center">
                <div className="flex flex-col gap-2">
                    <h1 className="text-[#2E5E99] font-semibold text-lg">
                        {familyName}
                    </h1>

                    <div className="flex gap-2 items-center">
                        <div
                            className="h-6 w-6 bg-[#2E5E99] rounded-full"
                            style={backgroundImgStyle}
                        />

                        <p className="text-gray-600 text-sm font-light">
                            {leaderName}
                            <span className="text-gray-800 font-semibold">
                                (Leader)
                            </span>
                        </p>
                    </div>
                </div>

                <div>
                    <Button
                        onClick={handleJoinFamily}
                        loading={loading}
                        primary
                        long={false}
                        text="Join"
                    />
                </div>
            </div>

            {showAlert.show && (
                <AlertToaster show={showAlert.show}
                    status={showAlert.status}
                    message={showAlert.message}
                    duration={9000}
                    onClose={() => setShowAlert((prev) => ({ ...prev, show: false }))}

                />
            )}
        </div>
    );
};

export default FamilyListCard;
