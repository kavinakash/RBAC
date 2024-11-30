import React, { useState } from 'react';
import { Typography, Box, TextField, Button, Card, CardContent, List, ListItem, ListItemText, Checkbox } from '@mui/material';

function PermissionManagement({ roles, rolePermissions, setRolePermissions }) {
  const [newPermission, setNewPermission] = useState('');
  const [selectedRole, setSelectedRole] = useState(roles[0] || '');
  
  const handleAddPermission = () => {
    if (newPermission) {
      const updatedRolePermissions = { ...rolePermissions };
      for (const role of roles) {
        if (!updatedRolePermissions[role]) {
          updatedRolePermissions[role] = [];
        }
        if (!updatedRolePermissions[role].includes(newPermission)) {
          updatedRolePermissions[role].push(newPermission);
        }
      }
      setRolePermissions(updatedRolePermissions);
      setNewPermission('');
    }
  };

  const handleTogglePermission = (permission) => {
    const updatedRolePermissions = { ...rolePermissions };
    if (updatedRolePermissions[selectedRole]) {
      if (updatedRolePermissions[selectedRole].includes(permission)) {
        updatedRolePermissions[selectedRole] = updatedRolePermissions[selectedRole].filter(p => p !== permission);
      } else {
        updatedRolePermissions[selectedRole].push(permission);
      }
    }
    setRolePermissions(updatedRolePermissions);
  };

  return (
    <Card className="permission-management-card">
      <CardContent>
        <Typography variant="h5" gutterBottom>Manage Permissions</Typography>
        <Box sx={{ marginBottom: 2, display: 'flex', alignItems: 'center' }}>
          <TextField 
            label="Permission Name" 
            value={newPermission} 
            onChange={(e) => setNewPermission(e.target.value)} 
          />
          <Button variant="contained" color="primary" onClick={handleAddPermission}>Add Permission</Button>
        </Box>
        <Typography variant="body1">Current Permissions:</Typography>
        <List dense>
          {Object.keys(rolePermissions).map((role) => (
            <ListItem key={role}>
              <ListItemText primary={role} />
              <Box>
                {rolePermissions[role].map((permission) => (
                  <ListItem key={permission}>
                    <Checkbox
                      checked={rolePermissions[role].includes(permission)}
                      onChange={() => handleTogglePermission(permission)}
                    />
                    <ListItemText primary={permission} />
                  </ListItem>
                ))}
              </Box>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default PermissionManagement;
