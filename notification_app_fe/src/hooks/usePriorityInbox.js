import { useState, useEffect } from "react";
import { fetchAllNotifications } from "../api/notifications";
import { getPriorityInbox } from "../utils/priorityInbox";
import { Log } from "../utils/logger";

export function usePriorityInbox(topN, typeFilter) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const all = await fetchAllNotifications(typeFilter);
        const priority = getPriorityInbox(all, topN);
        setNotifications(priority);
        await Log("frontend", "info", "hook", `Priority inbox loaded with topN: ${topN}, filter: ${typeFilter || "none"}`);
      } catch (err) {
        setError("Failed to fetch priority inbox");
        await Log("frontend", "error", "hook", `Priority inbox failed: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [topN, typeFilter]);

  return { notifications, loading, error };
}