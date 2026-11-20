self.addEventListener("push", (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch {
    data = { body: event.data?.text() || "You have a new notification." };
  }
  event.waitUntil(self.registration.showNotification(data.title || "Family Diary", {
    body: data.body || "You have a new notification.",
    icon: "/images/logo.png",
    badge: "/images/logo.png",
    data: { url: data.url || "/dashboard/notification", notificationId: data.notificationId }
  }));
});
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "/dashboard/notification";
  event.waitUntil(clients.matchAll({ type: "window", includeUncontrolled: true }).then((windows) => {
    for (const client of windows) if ("focus" in client) { client.navigate(url); return client.focus(); }
    return clients.openWindow(url);
  }));
});
