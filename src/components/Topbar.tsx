import React from "react";
import { AppBar, Toolbar, Typography, Switch, FormControlLabel } from "@mui/material";

const Topbar = ({ toggleDarkMode }) => {
  return (    
      <Toolbar style={{ justifyContent: "flex-start" }}>
        <FormControlLabel
          control={<Switch onChange={toggleDarkMode} />}
          label="Multi Changes"
        />
      </Toolbar>    
  );
};

export default Topbar;