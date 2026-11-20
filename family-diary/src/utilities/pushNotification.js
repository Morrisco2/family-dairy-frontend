import baseUrl from "./BaseURL";
import { apiFetch } from "./apiRequest";
const toUint8Array = (base64) => { 
  const padding = "=".repeat((4 - base64.length % 4) % 4); 
  const raw = atob((base64 + padding).replace(/-/g, "+").replace(/_/g, "/")); 
  return Uint8Array.from([...raw].map((c) => c.charCodeAt(0))); 
};
const parse = async (response) => { 
  const data = await response.json().catch(() => ({})); 
  if (!response.ok || !data.success) throw new Error(data.message || "Push request failed"); 
  return data.data; };
  
export const enablePushNotifications = async () => {
  if (!("serviceWorker" in navigator) || !("PushManager" in window) || !("Notification" in window)) throw new Error("Push notifications are not supported by this browser.");
  const permission = await Notification.requestPermission();
  if (permission !== "granted") throw new Error("Notification permission was not granted.");
  const registration = await navigator.serviceWorker.register("/service-worker.js");
  const keyData = await parse(await apiFetch(`${baseUrl}/notifications/push/public-key`));
  let subscription = await registration.pushManager.getSubscription();
  if (!subscription) subscription = await registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: toUint8Array(keyData.publicKey) });
  await parse(await apiFetch(`${baseUrl}/notifications/push/subscribe`,
     {
       method: "POST", 
       body: JSON.stringify(subscription.toJSON())
       }));
  return subscription;
};
export const disablePushNotifications = async () => {
  const registration = await navigator.serviceWorker.getRegistration("/service-worker.js");
  const subscription = await registration?.pushManager.getSubscription();
  if (!subscription) return;
  await parse(await apiFetch(`${baseUrl}/notifications/push/unsubscribe`, { method: "DELETE", body: JSON.stringify({ endpoint: subscription.endpoint }) }));
  await subscription.unsubscribe();
};
