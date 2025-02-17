// export default Sidebar;
import React from "react";
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Collapse } from "@mui/material";
import { Link } from "react-router-dom";
import { ExpandLess, ExpandMore, Person } from "@mui/icons-material"; // Importing the Person icon

const Sidebar = () => {
  const [openUsers, setOpenUsers] = React.useState(false);

  const handleUsersClick = () => {
    setOpenUsers(!openUsers);
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        flexShrink: 0,
        width: "inherit", // Inherit width from the parent div
        "& .MuiDrawer-paper": { width: "inherit", boxSizing: "border-box" }, // Ensure paper inside drawer follows the same width
      }}
    >
      <List>
        {/* Parent ListItem for Users with an Icon */}
        <ListItem button onClick={handleUsersClick}>
          <ListItemIcon>
            <Person /> {/* User Icon */}
          </ListItemIcon>
          <ListItemText primary="Users" />
          {openUsers ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        {/* Nested List for User Overview and Department */}
        <Collapse in={openUsers} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to="/users/overview">
              <ListItemText primary="User Overview" sx={{ pl: 4 }} />
            </ListItem>
            <ListItem button component={Link} to="/users/department">
              <ListItemText primary="Department" sx={{ pl: 4 }} />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </Drawer>
  );
};

export default Sidebar;
