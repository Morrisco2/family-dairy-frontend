import {
  FaHome,
  FaUsers,
  FaCalendarCheck,
  FaClipboardList,
  FaHistory
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-[#D0DDED] w-screen min-h-10 md:min-h-screen md:w-20 fixed bottom-0 z-50 flex md:flex-col md:left-32 lg:left-44  gap-5 justify-center items-center py-2">
      <div className="flex flex-col gap-1 items-center">
        <NavLink
          to={"/dashboard"}
          end
          className={({ isActive }) =>
            isActive
              ? "bg-[#2E5E99] rounded-xl text-[#D0DDED] font-semibold border-b-2 "
              : "text-[#2E5E99] bg-transparent "
          }>
          <div className="  px-3 py-3 ">
            <FaHome className="text-3xl  " />
          </div>
        </NavLink>
        <small className="font-semibold text-[#2E5E99]">Home</small>
      </div>
      <div className="flex flex-col gap-1 items-center">
        <NavLink
          to={"/dashboard/members"}
          className={({ isActive }) =>
            isActive
              ? "bg-[#2E5E99] rounded-xl text-[#D0DDED] font-semibold border-b-2 "
              : "text-[#2E5E99] bg-transparent "
          }>
          <div className="px-3 py-3">
            <FaUsers className="text-3xl " />
          </div>
        </NavLink>
        <small className="font-semibold text-[#2E5E99]">Members</small>
      </div>
      <div className="flex flex-col gap-1 items-center">
        <NavLink
          to={"/dashboard/events"}
          className={({ isActive }) =>
            isActive
              ? "bg-[#2E5E99] rounded-xl text-[#D0DDED] font-semibold border-b-2 "
              : "text-[#2E5E99] bg-transparent "
          }>
          <div className="px-3 py-3    ">
            <FaCalendarCheck className="text-3xl " />
          </div>
        </NavLink>
        <small className="font-semibold text-[#2E5E99]">Events</small>
      </div>
      {/* <div className="flex flex-col gap-1 items-center">
        <NavLink
          to={"/dashboard/incidence"}
          className={({ isActive }) =>
            isActive
              ? "bg-[#2E5E99] rounded-xl text-[#D0DDED] font-semibold border-b-2 "
              : "text-[#2E5E99] bg-transparent "
          }>
          <div className="px-3 py-3">
            <FaClipboardList className="text-3xl " />
          </div>
        </NavLink>
        <small className="font-semibold text-[#2E5E99]">Incidents</small>
      </div> */}
      <div className="flex flex-col gap-1 items-center">
        <NavLink
          to={"/dashboard/history"}
          className={({ isActive }) =>
            isActive
              ? "bg-[#2E5E99] rounded-xl text-[#D0DDED] font-semibold border-b-2 "
              : "text-[#2E5E99] bg-transparent "
          }>
          <div className="px-3 py-3">
            <FaHistory className="text-3xl " />
          </div>
        </NavLink>
        <small className="font-semibold text-[#2E5E99]">History</small>
      </div>
    </div>
  );
};

export default Navbar;
