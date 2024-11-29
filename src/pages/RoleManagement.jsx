import React from 'react';
import { Typography, Box, Button, TextField, List, ListItem, ListItemText } from '@mui/material';

function RoleManagement() {
  const roles = ['Admin', 'Editor', 'Viewer'];

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Manage Roles
      </Typography>

      <Box sx={{ marginBottom: 2 }}>
        <TextField label="Role Name" sx={{ marginRight: 2 }} />
        <Button variant="contained" color="primary">
          Add Role
        </Button>
      </Box>

      <List>
        {roles.map((role, index) => (
          <ListItem key={index}>
            <ListItemText primary={role} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default RoleManagement;
