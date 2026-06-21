import Button from "./Button"

const FamilyListCard = ({
    familyName = "Morrison’s Family",
    leaderName = "Uffikairo Morrison",
    Image
}) => {
    return (
        <div className="px-4 flex flex-col gap-4 my-5">
            <div className="bg-[#D0DDED] min-h-20 rounded-2xl  p-4 flex justify-between items-center">
                <div className="flex flex-col gap-2">
                    <h1 className="text-[#2E5E99] font-semibold text-lg">{familyName}</h1>
                    <div className="flex gap-2 items-center">
                        <div className="h-6 w-6 bg-[#2E5E99] rounded-full"></div>
                        <p className="text-gray-600 text-sm">{leaderName} <span className="text-gray-800 font-semibold">(Leader)</span></p>
                    </div>
                </div>
                <div>
                    <Button primary long={false} text="Join" />
                </div>
            </div>
        </div>
    )
}

export default FamilyListCard