import React, { useState } from "react";
import { FaEllipsisH, FaTimes } from "react-icons/fa";
import { dismissNotification, markNotificationRead } from "../utilities/notificationFetch";

const Notification = ({ notification, onRead, onDismiss }) => {
  const [open, setOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [busy, setBusy] = useState(false);
  const created = notification.createdAt ? new Date(notification.createdAt).toLocaleString() : "";
  const openDetails = async () => {
    setOpen(true);
    if (notification.status !== "read") {
      try {
        await markNotificationRead(notification.id);
        onRead?.(notification.id);
      } catch (e) { console.error(e); }
    }
  };
  const remove = async () => {
    try {
      setBusy(true);
      await dismissNotification(notification.id);
      onDismiss?.(notification.id);
      setConfirmDelete(false);
      setOpen(false);
    } catch (e) { console.error(e); } finally { setBusy(false); }
  };
  return <div>
    <div className={`px-3 py-4 flex flex-col gap-2 rounded-2xl 
      ${notification.status === "read" ? "bg-transparent" : "bg-[#D0DDED]"}`}
    >
      <div className="flex justify-between items-start gap-3">
        <button type="button" className="text-left flex-1" onClick={openDetails}><b>{notification.title}</b>
          <p className="text-gray-500 mt-1">
            {notification.text.length > 85 ? `${notification.text.slice(0, 85)}...` : notification.text}
          </p>
          <p className="text-gray-400 text-sm mt-1">{created}</p>
        </button>
        <button type="button" aria-label="Open notification" className="text-xl" onClick={openDetails}>
          <FaEllipsisH />
        </button>
      </div>
    </div>
    {open && <div className="fixed inset-0 bg-black/50 z-[999] flex justify-center items-center px-4" role="dialog" aria-modal="true">
      <div className="bg-[#E9F1FA] py-4 px-4 w-full max-w-sm rounded-2xl flex flex-col gap-4">
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold text-[#2E5E99]">{notification.title}</h2>
          <button type="button" aria-label="Close" onClick={() => setOpen(false)}><FaTimes /></button>
        </div>
        <p className="text-gray-600 whitespace-pre-wrap">{notification.text}</p>
        <div className="flex justify-between items-center">
          <small className="text-gray-500">{created}</small>
          <button type="button" onClick={() => setConfirmDelete(true)} className="bg-red-500 text-white px-3 py-1 rounded-lg">Delete</button>
        </div>
      </div>
    </div>}
    {confirmDelete && <div className="fixed inset-0 bg-black/60 z-[1000] flex justify-center items-center px-5">
      <div className="bg-[#E9F1FA] p-4 rounded-2xl w-full max-w-sm flex flex-col gap-4">
        <p className="text-gray-600">Are you sure you want to delete this notification?</p>
        <div className="flex gap-3 justify-end">
          <button type="button" onClick={() => setConfirmDelete(false)} className="bg-[#D0DDED] text-[#2E5E99] px-3 py-1 rounded-lg">Cancel</button>
          <button type="button" disabled={busy} onClick={remove} className="bg-red-500 text-white px-3 py-1 rounded-lg disabled:opacity-50">{busy ? "Deleting..." : "Continue"}</button>
        </div>
      </div>
    </div>}
  </div>;
};
export default Notification;
