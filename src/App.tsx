import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import UserOverview from "./pages/UserOverview";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
            <div style={{ width: "250px", flexShrink: 0 }}>
              <Sidebar />
            </div>
            <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", width: "calc(100% - 250px)", overflow: "hidden" }}>
              <Topbar toggleDarkMode={() => setDarkMode(!darkMode)} label="Multi Changes" />
              <div style={{ flexGrow: 1, padding: "20px", overflow: "auto", display: "flex", flexDirection: "column" }}>
                <Routes>
                  <Route path="/users/overview" element={<UserOverview />} />
                  <Route path="/" element={<UserOverview />} />
                </Routes>
              </div>
            </div>
          </div>
        </Router>
      </ThemeProvider>
    </I18nextProvider>
  );
};

export default App;
