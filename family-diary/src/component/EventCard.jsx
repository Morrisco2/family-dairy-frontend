import { FaUser } from "react-icons/fa";

const EventCard = ({
    title = "family meeting",
    date = "Tomorrow",
    time = "2:30pm"
}) => {
  return (
    <div className="flex px-4 gap-4 flex-wrap my-5 ">
        <div className="bg-[#D0DDED] min-h-26 w-42 rounded-2xl px-2 py-3 flex flex-col gap-2 shadow-md shadow-gray-200">
            <div className=" flex justify-between ">
                <FaUser className="text-[#2E5E99] text-xl " />
                <button className=" text-[#2E5E99] px-2 py-0.5 rounded-lg font-semibold">view</button>
            </div>
            <div className="font-semibold">
                <p>{title}</p>
            </div>
            <div className="flex justify-between text-gray-600">
                <small>{date}</small>
                <small>{time}</small>
            </div>
        </div>
        <div className="bg-[#D0DDED] min-h-26 w-42 rounded-2xl px-2 py-3 flex flex-col gap-2 shadow-md shadow-gray-200">
            <div className=" flex justify-between ">
                <FaUser className="text-[#2E5E99] text-xl " />
                <button className=" text-[#2E5E99] px-2 py-0.5 rounded-lg font-semibold">view</button>
            </div>
            <div className="font-semibold">
                <p>{title}</p>
            </div>
            <div className="flex justify-between text-gray-600">
                <small>{date}</small>
                <small>{time}</small>
            </div>
        </div>
       
    </div>
  )
}

export default EventCard