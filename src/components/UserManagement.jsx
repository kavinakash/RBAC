import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Switch, FormControlLabel } from '@mui/material';

function UserManagement({ roles, setRoles }) {
  const [users, setUsers] = useState([
    { id: 1, name: 'Kavin Akash', email: 'kavin.akash@gmail.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Veeran', email: 'veeran@gmail.com', role: 'Editor', status: 'Inactive' },
    { id: 3, name: 'Vikram', email: 'vikram@gmail.com', role: 'Viewer', status: 'Active' },
    { id: 4, name: 'Lakshmi', email: 'lakshmi@gmail.com', role: 'Admin', status: 'Inactive' },
    { id: 5, name: 'Karthik Raj', email: 'karthik.raj@gmail.com', role: 'Editor', status: 'Active' },
    { id: 6, name: 'Anjaan', email: 'Anjaan@gmail.com', role: 'Viewer', status: 'Inactive' },
    { id: 7, name: 'Suresh Babu', email: 'suresh.babu@gmail.com', role: 'Admin', status: 'Active' },
    { id: 8, name: 'Priya Selvam', email: 'priya.selvam@gmail.com', role: 'Editor', status: 'Inactive' },
    { id: 9, name: 'Ravi Chandran', email: 'ravi.chandran@gmail.com', role: 'Viewer', status: 'Active' },
    { id: 10, name: 'Divya Lakshmi', email: 'divya.lakshmi@gmail.com', role: 'Admin', status: 'Inactive' },
  ]);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: '', status: 'Active' });
  const [error, setError] = useState('');
  const [editUser, setEditUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [filterRole, setFilterRole] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 4; // Number of users to display per page
  const [activityLogs, setActivityLogs] = useState([]); // State for activity logs

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
    return regex.test(email);
  };

  const handleAddUser = () => {
    if (!newUser.name) {
      setError('Name is required.');
      return;
    }
    if (!validateEmail(newUser.email)) {
      setError('Invalid email format.');
      return;
    }
    if (!newUser.role) {
      setError('Role is required.');
      return;
    }
    const newUserEntry = { ...newUser, id: users.length + 1 };
    setUsers([...users, newUserEntry]);
    setActivityLogs([...activityLogs, `Added user: ${newUserEntry.name}`]); // Log the action
    setNewUser({ name: '', email: '', role: '', status: 'Active' });
    setError('');
  };

  const handleDeleteUser = (id) => {
    setUserToDelete(id);
    setConfirmDeleteOpen(true);
  };

  const confirmDelete = () => {
    const userToDeleteEntry = users.find(user => user.id === userToDelete);
    setUsers(users.filter(user => user.id !== userToDelete));
    setActivityLogs([...activityLogs, `Deleted user: ${userToDeleteEntry.name}`]); // Log the action
    setConfirmDeleteOpen(false);
    setUserToDelete(null);
  };

  const handleBulkDelete = () => {
    setUsers(users.filter(user => !selectedUsers.includes(user.id)));
    setSelectedUsers([]);
  };

  const handleBulkStatusChange = (status) => {
    setUsers(users.map(user => 
      selectedUsers.includes(user.id) ? { ...user, status } : user
    ));
    setSelectedUsers([]);
  };

  const handleEditUserOpen = (user) => {
    setEditUser(user);
    setOpen(true);
  };

  const handleEditUserClose = () => {
    setOpen(false);
    setEditUser(null);
  };

  const handleEditUserSave = () => {
    if (!editUser.name) {
      setError('Name is required.');
      return;
    }
    if (!validateEmail(editUser.email)) {
      setError('Invalid email format.');
      return;
    }
    if (!editUser.role) {
      setError('Role is required.');
      return;
    }
    setUsers(users.map(user => (user.id === editUser.id ? editUser : user)));
    setActivityLogs([...activityLogs, `Edited user: ${editUser.name}`]); // Log the action
    handleEditUserClose();
  };

  const handleStatusChange = (id) => {
    setUsers(users.map(user => (user.id === id ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' } : user)));
  };

  // Filter users based on search term, role, and status
  const filteredUsers = users.filter(user => 
    (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterRole ? user.role === filterRole : true) &&
    (filterStatus ? user.status === filterStatus : true)
  );

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleSelectUser = (id) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter(userId => userId !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  const handlePageChange = (direction) => {
    if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="user-management-card">
      <div className="filter-section">
        <h2>Filters</h2>
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Search Users"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button" onClick={() => { /* Implement search functionality if needed */ }}>
            Search
          </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <select 
            value={filterRole} 
            onChange={(e) => setFilterRole(e.target.value)} 
            style={{ marginRight: '8px' }}
          >
            <option value="">All Roles</option>
            {roles.map((role, index) => (
              <option key={index} value={role}>{role}</option>
            ))}
          </select>
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)} 
            style={{ marginRight: '8px' }}
          >
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="main-section">
        <h2>Manage Users</h2>
        {error && <div style={{ color: 'red', marginBottom: '16px' }}>{error}</div>}
        
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <input 
            type="text" 
            placeholder="Name" 
            value={newUser.name} 
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} 
            style={{ marginRight: '8px' }} 
          />
          <input 
            type="email" 
            placeholder="Email" 
            value={newUser.email} 
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} 
            style={{ marginRight: '8px' }} 
          />
          <select 
            value={newUser.role} 
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} 
            style={{ marginRight: '8px' }}
          >
            <option value="" disabled>Select Role</option>
            {roles.map((role, index) => (
              <option key={index} value={role}>{role}</option>
            ))}
          </select>
          <button onClick={handleAddUser}>Add User</button>
        </div>

        {/* Bulk Actions */}
        <div style={{ marginBottom: '16px' }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => handleBulkStatusChange('Active')}
            disabled={selectedUsers.length === 0}
          >
            Activate Selected
          </Button>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={() => handleBulkStatusChange('Inactive')}
            disabled={selectedUsers.length === 0}
            style={{ marginLeft: '8px' }}
          >
            Deactivate Selected
          </Button>
          <Button 
            variant="contained" 
            color="error" 
            onClick={handleBulkDelete}
            disabled={selectedUsers.length === 0}
            style={{ marginLeft: '8px' }}
          >
            Delete Selected
          </Button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Select</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th style={{ width: '120px' }}>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <input 
                    type="checkbox" 
                    checked={selectedUsers.includes(user.id)} 
                    onChange={() => handleSelectUser(user.id)} 
                  />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={user.status === 'Active'}
                        onChange={() => handleStatusChange(user.id)}
                        color="primary"
                      />
                    }
                    label={user.status}
                    style={{
                      color: user.status === 'Active' ? 'green' : 'red',
                      fontWeight: 'bold',
                    }}
                  />
                </td>
                <td>
                  <button onClick={() => handleEditUserOpen(user)}>Edit</button>
                  <button onClick={() => handleDeleteUser(user.id)} style={{ marginLeft: '8px' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div>
          <button onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={() => handlePageChange('next')} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>

      {/* Activity Logs Section */}
      <div style={{ marginTop: '20px', width: '500px' }}>
        <h3>Activity Logs</h3>
        <ul>
          {activityLogs.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      </div>

      <Dialog open={open} onClose={handleEditUserClose} className="edit-user-dialog">
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <input
            type="text"
            placeholder="Name"
            value={editUser?.name || ''}
            onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
            className="dialog-input"
          />
          <input
            type="email"
            placeholder="Email"
            value={editUser?.email || ''}
            onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
            className="dialog-input"
          />
          <select
            value={editUser?.role || ''}
            onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
            className="dialog-select"
          >
            <option value="" disabled>Select Role</option>
            {roles.map((role, index) => (
              <option key={index} value={role}>{role}</option>
            ))}
          </select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditUserClose} color="primary">Cancel</Button>
          <Button onClick={handleEditUserSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)} color="primary">Cancel</Button>
          <Button onClick={confirmDelete} color="primary">Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UserManagement;