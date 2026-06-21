import { FaBell } from "react-icons/fa";

const EventList = ({
    eventTitle = "Morrison Samuel - April, 29",
    time = "in 3 days"
}) => {
  return (
    <div>
        <div className=" min-h-10 flex gap-3 px-4 ">
            <div className="h-12 w-12 rounded-full bg-[#D0DDED] flex justify-center items-center">
                <FaBell className="text-[#2E5E99] text-2xl"/>
            </div>
            <div className="bg-[#D0DDED] h-12 w-76 rounded-lg flex justify-between px-2 items-center">
                <p className="font-semibold  text-gray-500">{eventTitle}</p>
                <small className=" font-semibold text-[#2E5E99]">{time}</small>
            </div>
        </div>
    </div>
  )
}

export default EventList