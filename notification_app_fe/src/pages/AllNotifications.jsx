import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Pagination,
  CircularProgress,
  Alert
} from "@mui/material";
import NotificationCard from "../components/NotificationCard";
import FilterBar from "../components/FilterBar";
import { useNotifications } from "../hooks/useNotifications";
import { Log } from "../utils/logger";

export default function AllNotifications() {
  const [page, setPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState("");
  const [viewedIds, setViewedIds] = useState(() => {
    const saved = localStorage.getItem("viewedIds");
    return saved ? JSON.parse(saved) : [];
  });

  const { notifications, loading, error } = useNotifications(page, typeFilter);

  useEffect(() => {
    if (notifications.length > 0) {
      const newIds = notifications.map((n) => n.ID);
      setViewedIds((prev) => {
        const updated = [...new Set([...prev, ...newIds])];
        localStorage.setItem("viewedIds", JSON.stringify(updated));
        return updated;
      });
    }
  }, [notifications]);

  useEffect(() => {
    setPage(1);
    Log("frontend", "info", "page", `Filter changed to: ${typeFilter || "none"}`);
  }, [typeFilter]);

  function isNew(notification) {
    return !viewedIds.includes(notification.ID);
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" fontWeight="bold" mb={3}>
        All Notifications
      </Typography>

      <FilterBar typeFilter={typeFilter} setTypeFilter={setTypeFilter} />

      {loading && (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && notifications.length === 0 && (
        <Alert severity="info">No notifications found.</Alert>
      )}

      {!loading && !error && notifications.map((n) => (
        <NotificationCard key={n.ID} notification={n} isNew={isNew(n)} />
      ))}

      {!loading && !error && notifications.length > 0 && (
        <Box display="flex" justifyContent="center" mt={3} mb={4}>
          <Pagination
            count={10}
            page={page}
            onChange={(e, val) => {
              setPage(val);
              Log("frontend", "info", "page", `Navigated to page ${val}`);
            }}
            color="primary"
          />
        </Box>
      )}
    </Container>
  );
}