import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from "@mui/material";

export default function FilterBar({ typeFilter, setTypeFilter }) {
  return (
    <Box display="flex" alignItems="center" gap={2} mb={3} flexWrap="wrap">
      <Typography variant="body1" fontWeight="bold">
        Filter by Type:
      </Typography>
      <ToggleButtonGroup
        value={typeFilter}
        exclusive
        onChange={(e, val) => setTypeFilter(val)}
        size="small"
      >
        <ToggleButton value="">All</ToggleButton>
        <ToggleButton value="Placement">Placement</ToggleButton>
        <ToggleButton value="Result">Result</ToggleButton>
        <ToggleButton value="Event">Event</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}