import { useCallback, useEffect, useState } from "react";
import Notification from "../component/Notification";
import PageTitleCard from "../component/PageTitleCard";
import { fetchNotifications, markAllNotificationsRead } from "../utilities/notificationFetch";
import { enablePushNotifications } from "../utilities/pushNotification";
import socket from "../utilities/socket";

const NotificationPage = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pushBusy, setPushBusy] = useState(false);
  const [pushMessage, setPushMessage] = useState("");
  const load = useCallback(async (requestedPage = 1) => {
    try { 
      setLoading(true); 
      setError(""); 
      const result = await fetchNotifications(requestedPage); 
      setItems(result.notifications || []); 
      setPage(result.page || requestedPage);
      setPages(result.pages || 1); }
    catch (e) { setError(e.message || "Unable to load notifications"); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { 
    socket.connect(); load(1); 
    const onNew = () => load(1); 
    socket.on("newNotification", onNew); 
    return () => { socket.off("newNotification", onNew); 
      socket.disconnect(); 
    }; }, [load]);
  const handleRead = (id) => setItems((old) => old.map((n) => n.id === id ? { ...n, status: "read" } : n));
  const handleDismiss = (id) => setItems((old) => old.filter((n) => n.id !== id));
  const readAll = async () => { 
    try { 
      await markAllNotificationsRead(); 
      setItems((old) => old.map((n) => ({ ...n, status: "read" }))); 
    } catch (e) { setError(e.message); } };
  return <div className="px-4 py-4 pb-20 min-h-screen flex flex-col gap-4">
    <div className="flex items-center justify-between">
      <PageTitleCard title="Notification" icon />
      <button type="button" onClick={readAll} className="text-sm text-[#2E5E99] font-semibold">Mark all as read</button>
      </div>
    <div className="flex flex-col gap-2"><button type="button" disabled={pushBusy} onClick={async () => { try { setPushBusy(true); await enablePushNotifications(); setPushMessage("Push notifications enabled on this device."); } catch (e) { setPushMessage(e.message); } finally { setPushBusy(false); } }} className="self-start rounded-lg bg-[#2E5E99] text-white px-3 py-2 text-sm disabled:opacity-50">{pushBusy ? "Enabling..." : "Enable push notifications"}</button>{pushMessage && <p className="text-sm text-gray-500">{pushMessage}</p>}</div>
    {error && <p role="alert" className="text-red-600 text-sm">{error}</p>}
    {loading ? <p className="text-gray-500">Loading notifications...</p> : items.length ? <div className="flex flex-col gap-3 -mt-4">{items.map((item) => <Notification key={item.id} notification={item} onRead={handleRead} onDismiss={handleDismiss} />)}</div> : <p className="text-center text-gray-500 py-12">You have no notifications yet.</p>}
    {!loading && pages > 1 && <div className="flex justify-between items-center"><button disabled={page <= 1} onClick={() => load(page - 1)} className="px-3 py-2 rounded bg-[#D0DDED] disabled:opacity-40">Previous</button><span className="text-sm text-gray-500">Page {page} of {pages}</span><button disabled={page >= pages} onClick={() => load(page + 1)} className="px-3 py-2 rounded bg-[#D0DDED] disabled:opacity-40">Next</button></div>}
  </div>;
};
export default NotificationPage;
