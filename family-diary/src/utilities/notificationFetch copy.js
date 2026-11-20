// Notification API helpers. All mutations use apiFetch to preserve CSRF and refresh handling.
import baseUrl from "./BaseURL";
import { apiFetch } from "./apiRequest";
const endpoint = `${baseUrl}/notifications`;
const parse = async (response) => { const data = await response.json().catch(() => ({})); if (!response.ok || !data.success) throw new Error(data.message || "Notification request failed"); return data.data; };
export const fetchNotifications = async (page = 1, limit = 20) => parse(await apiFetch(`${endpoint}?page=${page}&limit=${limit}`));
export const fetchUnreadCount = async () => parse(await apiFetch(`${endpoint}/unread-count`));
export const markNotificationRead = async (id) => parse(await apiFetch(`${endpoint}/${id}/read`, { method: "PATCH", body: JSON.stringify({}) }));
export const markAllNotificationsRead = async () => parse(await apiFetch(`${endpoint}/read-all`, { method: "PATCH", body: JSON.stringify({}) }));
export const dismissNotification = async (id) => parse(await apiFetch(`${endpoint}/${id}`, { method: "DELETE" }));
