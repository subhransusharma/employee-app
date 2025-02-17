import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
  IconButton,  
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const UserTable = ({ users, onEdit, onDelete, onSort, sortConfig }) => (
  <Table>
    <TableHead>
      <TableRow>
        {["name", "department", "location"].map((key) => (
          <TableCell key={key} sx={{ fontWeight: "bold" }}>
            <TableSortLabel
              active={sortConfig.key === key}
              direction={sortConfig.key === key ? sortConfig.direction : "asc"}
              onClick={() => onSort(key)}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell sx={{ fontWeight: "bold" }}>Landline no.</TableCell>
        <TableCell sx={{ fontWeight: "bold" }}>Mobiles</TableCell>
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {users.map((user) => (
        <TableRow key={user.id}>
          <TableCell>{user.name}</TableCell>
          <TableCell>{user.department}</TableCell>
          <TableCell>{user.location}</TableCell>
          <TableCell>{user.landLineNo}</TableCell>
          <TableCell>{user.mobileNo}</TableCell>
          <TableCell>
            <IconButton onClick={() => onEdit(user)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => onDelete(user.id)}>
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default UserTable;
