import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import BackgroundGradient from "../utilities/BackgroundGradient";
import PageTitleCard from "../component/PageTitleCard";
import Notification from "../component/Notification";

const NotificationPage = () => {
  const [open, setOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false)
  const notification = [
    {
      id: 1,
      title: "Birthday Reminder",
      text: "Tomorrow is Morrison Samuel’s Birthday, Please endavour to send him your wishes",
      time: "2 hrs ago",
      status: "unread",
    },
    {
      id: 1,
      title: "Birthday Reminder",
      text: "Tomorrow is Morrison Samuel’s Birthday, Please endavour to send him your wishes",
      time: "2 hrs ago",
      status: "read",
    },
    {
      id: 1,
      title: "Birthday Reminder",
      text: "Tomorrow is Morrison Samuel’s Birthday, Please endavour to send him your wishes",
      time: "2 hrs ago",
      status: "unread",
    },
    {
      id: 1,
      title: "Birthday Reminder",
      text: "Tomorrow is Morrison Samuel’s Birthday, Please endavour to send him your wishes",
      time: "2 hrs ago",
      status: "read",
    },
    {
      id: 1,
      title: "Birthday Reminder",
      text: "Tomorrow is Morrison Samuel’s Birthday, Please endavour to send him your wishes",
      time: "2 hrs ago",
      status: "unread",
    },
  ];
  return (
    <div className="px-4 py-4 min-h-screen flex flex-col gap-4">
      <div>
        <PageTitleCard title="Notification" icon />
      </div>
      <div className="flex flex-col gap-3 -mt-4">
        {notification.map((item, index) => (
          <Notification
            key={index}
            notification={item}
            onClick={() => setOpen(true)}
          />
        ))}
      </div>

      {open && (
        <div className="inset-0 fixed bg-black/50 z-999 animate-modal ">
          <div className="flex justify-center items-center min-h-screen px-4">
            <div className="bg-[#E9F1FA] py-4 px-4 rounded-2xl flex flex-col gap-4">
              <div className="flex justify-between">
                <h1 className="text-lg font-semibold text-[#2E5E99]">
                  Birthday Reminder
                </h1>
                <button onClick={() => setOpen(false)}>
                  <FaTimes />
                </button>
              </div>
              <p className="text-gray-500">
                Tomorrow is Morrison Samuel’s Birthday, Please endavour to send
                him your wishes
              </p>
              <div className="flex justify-between">
                <small className="text-gray-500">2 hours ago</small>
                <div className="flex gap-3">
                  <button onClick={()=>setOpen(false)} className="bg-[#D0DDED] text-[#2E5E99] px-3 py-1 rounded-lg ">
                    Close
                  </button>
                  <button onClick={()=>setConfirmDelete(true)} className="bg-red-500 text-[#E9F1FA] px-3 py-1 rounded-lg ">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          {confirmDelete && (
            <div className="inset-0 fixed bg-black/50 z-999 animate-modal px-5 ">
              <div className="flex justify-center items-center min-h-screen">
                <div className="bg-[#E9F1FA] py-4 px-4 rounded-2xl flex flex-col gap-4">
                  <p className="text-lg text-gray-500">
                    Are you sure you want to delete this notification?
                  </p>
                  <div className="flex gap-3 justify-end">
                    <button onClick={()=>setConfirmDelete(false)} className="bg-[#D0DDED] text-[#2E5E99] px-3 py-1 rounded-lg ">
                      cancel
                    </button>
                    <button className="bg-red-500 text-[#E9F1FA] px-3 py-1 rounded-lg ">
                      continue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationPage;
