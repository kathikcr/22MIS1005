import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  ToggleButtonGroup,
  ToggleButton
} from "@mui/material";
import NotificationCard from "../components/NotificationCard";
import FilterBar from "../components/FilterBar";
import { usePriorityInbox } from "../hooks/usePriorityInbox";
import { Log } from "../utils/logger";

export default function PriorityInbox() {
  const [topN, setTopN] = useState(10);
  const [typeFilter, setTypeFilter] = useState("");
  const [viewedIds, setViewedIds] = useState(() => {
    const saved = localStorage.getItem("viewedIds");
    return saved ? JSON.parse(saved) : [];
  });

  const { notifications, loading, error } = usePriorityInbox(topN, typeFilter);

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
    Log("frontend", "info", "page", `Priority inbox opened with topN: ${topN}`);
  }, [topN]);

  function isNew(notification) {
    return !viewedIds.includes(notification.ID);
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Priority Inbox
      </Typography>

      <Box display="flex" alignItems="center" gap={2} mb={3} flexWrap="wrap">
        <Typography variant="body1" fontWeight="bold">
          Show Top:
        </Typography>
        <ToggleButtonGroup
          value={topN}
          exclusive
          onChange={(e, val) => val && setTopN(val)}
          size="small"
        >
          <ToggleButton value={10}>10</ToggleButton>
          <ToggleButton value={15}>15</ToggleButton>
          <ToggleButton value={20}>20</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <FilterBar typeFilter={typeFilter} setTypeFilter={setTypeFilter} />

      {loading && (
  <Box display="flex" flexDirection="column" alignItems="center" mt={5} gap={2}>
    <CircularProgress />
    <Typography variant="body2" color="text.secondary">
      Fetching and scoring all notifications, please wait...
    </Typography>
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
    </Container>
  );
}