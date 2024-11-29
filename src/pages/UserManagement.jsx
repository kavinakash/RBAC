import React from 'react';
import { Typography, Box, Button, TextField, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

function UserManagement() {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor' },
  ];

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Manage Users
      </Typography>

      <Box sx={{ marginBottom: 2 }}>
        <TextField label="Name" sx={{ marginRight: 2 }} />
        <TextField label="Email" sx={{ marginRight: 2 }} />
        <TextField label="Role" sx={{ marginRight: 2 }} />
        <Button variant="contained" color="primary">
          Add User
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Button variant="contained" color="secondary" size="small" sx={{ marginRight: 1 }}>
                  Edit
                </Button>
                <Button variant="contained" color="error" size="small">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

export default UserManagement;
