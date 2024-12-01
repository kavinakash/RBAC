import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Checkbox, IconButton, List, ListItem, ListItemText, TextField } from '@mui/material';
import React, { useState } from 'react';

function RoleManagement({ roles, setRoles, rolePermissions, setRolePermissions }) {
  const [newRole, setNewRole] = useState('');

  const handleAddRole = () => {
    if (newRole && !roles.includes(newRole)) {
      setRoles([...roles, newRole]);
      setRolePermissions({ ...rolePermissions, [newRole]: [] });
      setNewRole('');
    }
  };

  const handleRemoveRole = (roleToRemove) => {
    setRoles(roles.filter(role => role !== roleToRemove));
    const updatedPermissions = { ...rolePermissions };
    delete updatedPermissions[roleToRemove];
    setRolePermissions(updatedPermissions);
  };

  const handleTogglePermission = (role, permission) => {
    const updatedPermissions = { ...rolePermissions };
    if (!updatedPermissions[role]) {
      updatedPermissions[role] = [];
    }
    if (updatedPermissions[role].includes(permission)) {
      updatedPermissions[role] = updatedPermissions[role].filter(p => p !== permission);
    } else {
      updatedPermissions[role].push(permission);
    }
    setRolePermissions(updatedPermissions);
  };

  return (
    <div className="role-management-card">
      <h2>Manage Roles</h2>
      <div className="role-input-container">
        <TextField 
          label="Role Name" 
          value={newRole} 
          onChange={(e) => setNewRole(e.target.value)} 
          className="role-input"
        />
        <Button variant="contained" onClick={handleAddRole}>Add Role</Button>
      </div>
      <List dense>
        {roles.map((role, index) => (
          <div key={index}>
            <ListItem className="role-list-item">
              <ListItemText primary={role} />
              <IconButton edge="end" onClick={() => handleRemoveRole(role)}>
                <DeleteIcon />
              </IconButton>
              <div className="role-permissions">
                {['Create', 'Read', 'Update', 'Delete'].map((permission) => (
                  <span key={permission} style={{ marginRight: '8px' }}>
                    <Checkbox
                      checked={rolePermissions[role]?.includes(permission) || false}
                      onChange={() => handleTogglePermission(role, permission)}
                    />
                    {permission}
                  </span>
                ))}
              </div>
            </ListItem>
            
          </div>
        ))}
      </List>
    </div>
  );
}

export default RoleManagement;