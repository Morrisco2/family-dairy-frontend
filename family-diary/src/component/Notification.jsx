import React from "react";
import { FaEllipsisH } from "react-icons/fa";

const Notification = ({ notification , onClick }) => {
  const text = notification.text;
  return (
    <button className="  w-full" onClick={onClick}>
      <div
        className={`px-3 py-4 flex flex-col gap-2 rounded-2xl ${notification.status === "read" ? "bg-transparent" : "bg-[#D0DDED]"}`}>
        <div className="flex justify-between items-top">
          <b>{notification.title}</b>
          <button className="text-2xl font-bold" >
            <FaEllipsisH />
          </button>
        </div>
        <div className="flex flex-col items-start">
          <p className="text-gray-500 ">{text.slice(0, 30) + "..."}</p>
          <p className="text-gray-400 text-sm">{notification.time}</p>
        </div>
      </div>
    </button>
  );
};

export default Notification;
