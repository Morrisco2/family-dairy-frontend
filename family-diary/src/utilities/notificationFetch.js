

// Notification API helpers. All mutations use apiFetch to preserve CSRF and refresh handling.
import baseUrl from "./BaseURL";
import { apiFetch } from "./apiRequest";
const endpoint = `${baseUrl}/notifications`;
const parse = async (response) => { 
  const data = await response.json().catch(() => ({})); 
  if (!response.ok || !data.success) throw new Error(data.message || "Notification request failed"); 
  return data.data; };
export const fetchNotifications = async (page = 1, limit = 20) => parse(await apiFetch(`${endpoint}?page=${page}&limit=${limit}`));
export const fetchUnreadCount = async () => parse(await apiFetch(`${endpoint}/unread-count`));
export const markNotificationRead = async (id) => parse(await apiFetch(`${endpoint}/${id}/read`, { method: "PATCH", body: JSON.stringify({}) }));
export const markAllNotificationsRead = async () => parse(await apiFetch(`${endpoint}/read-all`, { method: "PATCH", body: JSON.stringify({}) }));
export const dismissNotification = async (id) => parse(await apiFetch(`${endpoint}/${id}`, { method: "DELETE" }));












// const notification = [
//   {
//     id: "notification_id",
//     title: "Birthday Reminder",
//     text: "Morrison Samuel's birthday is in two days!",
//     time: "2 hrs ago",
//     status: "unread",
//     confirmMember: false,
//     type: "BIRTHDAY_REMINDER",
//     recipientType: "family",
//   },
//   {
//     id: "notification_id",
//     title: "Happy Birthday!",
//     text: "Happy Birthday, Morrison! We wish you a wonderful year ahead.",
//     time: "Just now",
//     status: "unread",
//     confirmMember: false,
//     type: "BIRTHDAY_MESSAGE",
//     recipientType: "individual",
//   },
//   {
//     id: "notification_id",
//     title: "Family Diary Update",
//     text: "We have introduced new features!",
//     time: "Yesterday",
//     status: "read",
//     confirmMember: false,
//     type: "APP_ANNOUNCEMENT",
//     recipientType: "general",
//   },
// ];

// export default notification;