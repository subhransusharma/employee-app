import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Paper,
  TableContainer,
  Box,
  TextField,
  InputAdornment,
  Button,
  Typography,  
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import UserTable from "./../components/UserTable";
import UserDrawer from "./../components/UserDrawer";

const UserOverview = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });

  useEffect(() => {
    axios.get("http://localhost:5000/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleEdit = (user) => {
    setEditUser(user);
    setDrawerOpen(true);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/users/${id}`)
      .then(() => setUsers(users.filter((user) => user.id !== id)))
      .catch((error) => console.error("Error deleting user:", error));
  };

  const handleSort = (key) => {
    setSortConfig((prev) => {
      const isAsc = prev.key === key && prev.direction === "asc";
      const newDirection = isAsc ? "desc" : "asc";

      const sortedUsers = [...users].sort((a, b) => {
        const aValue = a[key] ?? "";
        const bValue = b[key] ?? "";

        return typeof aValue === "string"
          ? newDirection === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue)
          : newDirection === "asc"
          ? aValue - bValue
          : bValue - aValue;
      });

      setUsers(sortedUsers);
      return { key, direction: newDirection };
    });
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setEditUser(null);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box display="flex" flexDirection="column" alignItems="center" minHeight="80vh">
      <Container maxWidth={false} sx={{ width: "100%" }}>
        {/* Search & Filters */}
        <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom={2}>
          <Box display="flex" alignItems="center" gap={2}>
            <TextField
              variant="outlined"
              placeholder="Search..."
              sx={{ width: "250px", height: "36px" }}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                sx: { height: "36px" },
              }}
            />
            <Box display="flex" alignItems="center" gap={1}>
              <FilterListIcon />
              <Typography variant="body1">Filtered</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <ViewColumnIcon />
              <Typography variant="body1">Columns(5/5)</Typography>
            </Box>
          </Box>
          <Button variant="contained" color="primary">Create User</Button>
        </Box>

        {/* User Table */}
        <TableContainer component={Paper} sx={{ width: "100%" }}>
          <UserTable
            users={filteredUsers}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onSort={handleSort}
            sortConfig={sortConfig}
          />
        </TableContainer>
      </Container>

      {/* User Drawer */}
      <UserDrawer user={editUser} open={isDrawerOpen} onClose={handleCloseDrawer} />
    </Box>
  );
};

export default UserOverview;
