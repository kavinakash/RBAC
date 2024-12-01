import React, { useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import UserManagement from '../components/UserManagement';
import RoleManagement from '../components/RoleManagement';

function DashboardPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [roles, setRoles] = useState(['Admin', 'Editor', 'Viewer']);
  const [rolePermissions, setRolePermissions] = useState({});

  const handleTabChange = (event, newValue) => setActiveTab(newValue);

  return (
    <div style={{ padding: '24px' }}>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        aria-label="Dashboard Tabs"
        textColor="primary"
        indicatorColor="primary"
        style={{ marginBottom: '14px' }}
      >
        <Tab label="User Management" />
        <Tab label="Role Management" />
      </Tabs>
      <div>
        {activeTab === 0 && <UserManagement roles={roles} setRoles={setRoles} />}
        {activeTab === 1 && (
          <RoleManagement 
            roles={roles} 
            setRoles={setRoles} 
            rolePermissions={rolePermissions} 
            setRolePermissions={setRolePermissions}
          />
        )}
      </div>
    </div>
  );
}

export default DashboardPage;