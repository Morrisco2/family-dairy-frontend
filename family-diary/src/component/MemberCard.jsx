const MemberCard = ({
    name = "Morrison Christiana Adibor",
    role = "Mother",
    age = 54,
    dob = "Mar., 05 1975"
}) => {
    return (
        <div className="flex px-4 gap-4 flex-wrap">
            <div className="min-h-26 w-full bg-[#D0DDED] rounded-2xl px-4 py-5 flex flex-col gap-4 shadow-md shadow-gray-200">
                <div className="flex justify-between items-center">
                    <div className="h-15 w-15 bg-[#2E5E99] rounded-full border-2 border-[#2E5E99]"></div>
                    <button className="text-[#2E5E99] font-bold">view Profile</button>

                </div>
                <h1 className="font-semibold text-xl text-gray-800">{name} <span className="font-bold text-[#2E5E99]">({role})</span></h1>
                <div className="flex justify-between text-gray-600 items-center">
                    <p>{dob}</p>
                    <p className="text-gray-200 font-semibold bg-[#2E5E99]  rounded-md px-2 flex justify-center items-center">{age} yrs</p>
                </div>
            </div>
            <div className="min-h-26 w-full bg-[#D0DDED] rounded-2xl px-4 py-5 flex flex-col gap-4 shadow-md shadow-gray-200">
                <div className="flex justify-between items-center">
                    <div className="h-15 w-15 bg-[#2E5E99] rounded-full border-2 border-[#2E5E99]"></div>
                    <button className="text-[#2E5E99] font-bold">view Profile</button>

                </div>
                <h1 className="font-semibold text-xl text-gray-800">{name} <span className="font-bold text-[#2E5E99]">({role})</span></h1>
                <div className="flex justify-between text-gray-600 items-center">
                    <p>{dob}</p>
                    <p className="text-gray-200 font-semibold bg-[#2E5E99]  rounded-md px-2 flex justify-center items-center">{age} yrs</p>
                </div>
            </div>
            <div className="min-h-26 w-full bg-[#D0DDED] rounded-2xl px-4 py-5 flex flex-col gap-4 shadow-md shadow-gray-200">
                <div className="flex justify-between items-center">
                    <div className="h-15 w-15 bg-[#2E5E99] rounded-full border-2 border-[#2E5E99]"></div>
                    <button className="text-[#2E5E99] font-bold">view Profile</button>

                </div>
                <h1 className="font-semibold text-xl text-gray-800">{name} <span className="font-bold text-[#2E5E99]">({role})</span></h1>
                <div className="flex justify-between text-gray-600 items-center">
                    <p>{dob}</p>
                    <p className="text-gray-200 font-semibold bg-[#2E5E99]  rounded-md px-2 flex justify-center items-center">{age} yrs</p>
                </div>
            </div>
          
        </div>
    )
}

export default MemberCard