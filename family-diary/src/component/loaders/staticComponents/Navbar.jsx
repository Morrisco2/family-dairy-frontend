import { FaHome, FaUsers, FaBell, FaImage } from "react-icons/fa";

const Navbar = () => {
    return (
        <div className="bg-[#D0DDED] w-screen min-h-10 fixed bottom-0 z-50 flex gap-5 justify-center items-center py-2">
            <div className="flex flex-col gap-1 items-center">
                <div className=" bg-[#2E5E99] text-[#D0DDED] px-3 py-3 rounded-xl shadow-md shadow-gray-300">
                    <FaHome className="text-3xl  " />
                </div>
                <small className="font-semibold text-[#2E5E99]">Home</small>
            </div>
            <div className="flex flex-col gap-1 items-center">
                <div className="px-3 py-3 bg-gray-200 text-[#2E5E99] rounded-xl shadow-md shadow-gray-300">
                    <FaUsers className="text-3xl " />
                </div>
                <small className="font-semibold text-[#2E5E99]">Members</small>
            </div>
            <div className="flex flex-col gap-1 items-center">
                <div className="px-3 py-3 bg-gray-200 text-[#2E5E99] rounded-xl shadow-md shadow-gray-300">
                    <FaBell className="text-3xl " />
                </div>
                <small className="font-semibold text-[#2E5E99]">Events</small>
            </div>
            <div className="flex flex-col gap-1 items-center">

                <div className="px-3 py-3 bg-gray-200 text-[#2E5E99] rounded-xl shadow-md shadow-gray-300">
                    <FaImage className="text-3xl " />
                </div>
                <small className="font-semibold text-[#2E5E99]">Gallery</small>
            </div>


        </div>
    )
}

export default Navbar