import { useState, useEffect } from "react";
import { fetchNotificationsPage } from "../api/notifications";
import { Log } from "../utils/logger";

export function useNotifications(page, typeFilter) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchNotificationsPage(page, typeFilter);
        setNotifications(data);
        await Log("frontend", "info", "hook", `Fetched page ${page} with filter: ${typeFilter || "none"}`);
      } catch (err) {
        setError("Failed to fetch notifications");
        await Log("frontend", "error", "hook", `Failed to fetch notifications: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [page, typeFilter]);

  return { notifications, loading, error };
}