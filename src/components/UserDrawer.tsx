import React from "react";
import { Drawer, Box, IconButton, Chip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BusinessIcon from "@mui/icons-material/Business";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const UserDrawer = ({ user, open, onClose }) => (
  <Drawer anchor="right" open={open} onClose={onClose}>
    <Box sx={{ width: 300, padding: 2, position: "relative" }}>
      <IconButton onClick={onClose} sx={{ position: "absolute", top: 0, right: 0 }}>
        <CloseIcon />
      </IconButton>
      <Box height={24} />
      {user && (
        <>
          <Chip label="User Information" sx={{ width: "100%", borderRadius: 1 }} />
          {[
            ["Name", user.name, <AccountCircleIcon key="name" />],
            ["Department", user.department, <BusinessIcon key="department" />],
            ["Location", user.location, <LocationOnIcon key="location" />],
            ["Mobile", user.mobileNo, <PhoneIcon key="mobile" />],
          ].map(([label, value, icon], i) => (
            <Box display="flex" alignItems="center" marginTop={1} key={i}>
              {icon}
              <Box ml={1}>
                <p style={{ margin: 0 }}><strong>{label}</strong></p>
                <p style={{ margin: 0 }}>{value || "Not set up"}</p>
              </Box>
            </Box>
          ))}
        </>
      )}
    </Box>
  </Drawer>
);

export default UserDrawer;
