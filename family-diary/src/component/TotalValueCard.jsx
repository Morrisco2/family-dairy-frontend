import {
  FaUsers,
  FaCalendarCheck,
  FaClipboardList,
} from "react-icons/fa";

const TotalValueCard = () => {
    const totalValue = [
      { value: "25", title: "Total Members", icon: <FaUsers /> },
      { value: 5, title: "Total Events", icon: <FaCalendarCheck /> },
      { value: 30, title: "Total Incidents", icon: <FaClipboardList /> },
    ];
    return (
      <div className="flex  w-full justify-center gap-2">
        {totalValue.map((item, index) => (
          <div key={index} className="min-h-20 w-full bg-[#D0DDED] rounded-2xl py-1 px-2 flex flex-col gap-1 justify-center items-center shadow-md shadow-gray-200  ">
            <div className="h-10 w-10 bg-[#2E5E99] rounded-full text-gray-200 text-2xl flex justify-center items-center">
              {item.icon}
            </div>
            <div className="flex flex-col justify-center items-center a">
              <h1 className="font-bold text-lg">{item.value}</h1>
              <small className="text-gray-700">{item.title}</small>
            </div>
          </div>
        ))}
      </div>
    );
}

export default TotalValueCard