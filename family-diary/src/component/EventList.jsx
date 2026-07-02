// import {
//   FaBirthdayCake,
//   FaMeetup,
//   FaCalendarCheck,
//   FaClipboardList,
//   FaUsers
// } from "react-icons/fa";

// const EventList = ({
//     eventTitle = "Morrison Samuel - April, 29",
//     time = "in 3 days",
//     type = "event"
// }) => {
//     let iconType = ''
//     const icon = () => {
//         if (type === "birthday") {
//             iconType = <FaBirthdayCake />
//         }else if (type === "meeting") {
//             iconType = <FaUsers />;

//         }else if (type === "incident") {
//           iconType = <FaClipboardList />;

//         } else {
//             iconType = <FaCalendarCheck />

//         }
//     }

//     icon()

//     return (
//       <div className="w-full ">
//         <div className=" min-h-10 w-full flex gap-3 ">
//           <div className="h-12 w-12 rounded-full bg-[#D0DDED] flex justify-center items-center">
//             <div className="text-[#2E5E99] text-2xl ">{iconType}</div>
//           </div>
//           <div className="bg-[#D0DDED] h-12 w-full rounded-lg flex justify-between px-2 items-center">
//             <p className="font-semibold  text-gray-500">{eventTitle}</p>
//             <small className=" font-semibold text-[#2E5E99]">{time}</small>
//           </div>
//         </div>
//       </div>
//     );
// }

// export default EventList

import {
  FaBirthdayCake,
  FaCalendarCheck,
  FaClipboardList,
  FaUsers,
} from "react-icons/fa";

const EventList = ({ event }) => {
  const icon =
    event.type === "birthday" ? (
      <FaBirthdayCake />
    ) : event.type === "meeting" ? (
      <FaUsers />
    ) : event.type === "incident" ? (
      <FaClipboardList />
    ) : (
      <FaCalendarCheck />
    );
  const displayTitle = event.title || event.celebrant;
  
  return (
    <div className="w-full">
      <div className="flex gap-3">
        <div className="h-12 w-12 rounded-full bg-[#D0DDED] flex justify-center items-center">
          <div className="text-[#2E5E99] text-2xl">{icon}</div>
        </div>

        <div className="bg-[#D0DDED] h-12 flex-1 rounded-lg flex justify-between items-center px-3">
          <p className="font-semibold text-gray-500 text-sm truncate">
            {displayTitle.length > 13
              ? displayTitle.slice(0, 13) + "..."
              : displayTitle}
            {" - "}
            <small className="text-2xs">{event.date}</small>
          </p>

          <small className="font-semibold text-[#2E5E99]">{event.time}</small>
        </div>
      </div>
    </div>
  );
};

export default EventList;
