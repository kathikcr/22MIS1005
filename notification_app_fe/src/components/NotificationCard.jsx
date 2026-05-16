import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box
} from "@mui/material";

const TYPE_COLORS = {
  Placement: "success",
  Result: "primary",
  Event: "warning"
};

export default function NotificationCard({ notification, isNew }) {
  return (
    <Card
      sx={{
        mb: 2,
        border: isNew ? "2px solid #1976d2" : "1px solid #e0e0e0",
        borderRadius: 2,
        backgroundColor: isNew ? "#e3f2fd" : "#ffffff",
        boxShadow: isNew ? 3 : 1,
        transition: "all 0.2s ease"
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Chip
            label={notification.Type}
            color={TYPE_COLORS[notification.Type] || "default"}
            size="small"
          />
          {isNew && (
            <Chip
              label="NEW"
              color="info"
              size="small"
              sx={{ fontWeight: "bold" }}
            />
          )}
        </Box>
        <Typography variant="h6" sx={{ mb: 0.5 }}>
          {notification.Message}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {new Date(notification.Timestamp).toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
}