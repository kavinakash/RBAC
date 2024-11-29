import React from 'react';
import { Typography, Box, TextField, Button } from '@mui/material';

function PermissionManagement() {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Manage Permissions
      </Typography>

      <Box sx={{ marginBottom: 2 }}>
        <TextField label="Permission Name" sx={{ marginRight: 2 }} />
        <Button variant="contained" color="primary">
          Add Permission
        </Button>
      </Box>

      <Typography variant="body1">Here you can customize permissions for roles and users.</Typography>
    </Box>
  );
}

export default PermissionManagement;
