import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import UserManagement from './UserManagement';
import RoleManagement from './RoleManagement';
import PermissionManagement from './PermissionManagement';

function DashboardPage() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        aria-label="Dashboard Tabs"
        textColor="primary"
        indicatorColor="primary"
        sx={{ marginBottom: 3 }}
      >
        <Tab label="User Management" />
        <Tab label="Role Management" />
        <Tab label="Permission Management" />
      </Tabs>

      <Box>
        {activeTab === 0 && <UserManagement />}
        {activeTab === 1 && <RoleManagement />}
        {activeTab === 2 && <PermissionManagement />}
      </Box>
    </Box>
  );
}

export default DashboardPage;
