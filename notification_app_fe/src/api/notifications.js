import { getValidToken } from "./auth";

const BASE_URL = "/api";

export async function fetchNotificationsPage(page = 1, type = null) {
  const token = await getValidToken();

  let url = `${BASE_URL}/notifications?limit=10&page=${page}`;
  if (type) url += `&notification_type=${type}`;

  const response = await fetch(url, {
    headers: { "Authorization": `Bearer ${token}` }
  });

  const data = await response.json();
  return data.notifications || [];
}

export async function fetchAllNotifications(type = null) {
  let page = 1;
  let all = [];
  const MAX_PAGES = 20;

  while (page <= MAX_PAGES) {
    const notifications = await fetchNotificationsPage(page, type);
    if (!notifications || notifications.length === 0) break;
    all = [...all, ...notifications];
    if (notifications.length < 10) break;
    page++;
  }

  return all;
}