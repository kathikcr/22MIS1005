import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import StarIcon from "@mui/icons-material/Star";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar position="static" sx={{ mb: 3 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
          Notification Center
        </Typography>
        <Box display="flex" gap={1}>
          <Button
            color="inherit"
            startIcon={<NotificationsIcon />}
            onClick={() => navigate("/")}
            sx={{
              fontWeight: location.pathname === "/" ? "bold" : "normal",
              borderBottom: location.pathname === "/" ? "2px solid white" : "none"
            }}
          >
            All Notifications
          </Button>
          <Button
            color="inherit"
            startIcon={<StarIcon />}
            onClick={() => navigate("/priority")}
            sx={{
              fontWeight: location.pathname === "/priority" ? "bold" : "normal",
              borderBottom: location.pathname === "/priority" ? "2px solid white" : "none"
            }}
          >
            Priority Inbox
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}