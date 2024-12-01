import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Switch } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { addUser, deleteUser, fetchUsers, updateUser } from '../api';

function UserManagement({ roles, setRoles }) {
  const [users, setUsers] = useState([]);
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
  const usersPerPage = 4;
  const [activityLogs, setActivityLogs] = useState([]);
  const [loadingTable, setLoadingTable] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      const usersData = await fetchUsers();
      setUsers(usersData);
      setLoadingTable(false);
    };
    loadUsers();
  }, []);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const sanitizeInput = (input) => {
    return input.replace(/<[^>]*>/g, ''); 
  };

  const handleAddUser = async () => {
    const sanitizedName = sanitizeInput(newUser.name);
    const sanitizedEmail = sanitizeInput(newUser.email);
    const sanitizedRole = sanitizeInput(newUser.role);

    if (!sanitizedName) {
      setError('Name is required.');
      return;
    }
    if (!validateEmail(sanitizedEmail)) {
      setError('Invalid email format.');
      return;
    }
    if (!sanitizedRole) {
      setError('Role is required.');
      return;
    }

    const newUserEntry = await addUser({ name: sanitizedName, email: sanitizedEmail, role: sanitizedRole, status: newUser.status });
    
    setUsers([newUserEntry, ...users]);
    setActivityLogs([...activityLogs, `Added user: ${newUserEntry.name}`]);
    setNewUser({ name: '', email: '', role: '', status: 'Active' });
    setError('');
  };

  const handleDeleteUser = async (id) => {
    setUserToDelete(id);
    setConfirmDeleteOpen(true);
  };

  const confirmDelete = async () => {
    const userToDeleteEntry = users.find(user => user.id === userToDelete);
    await deleteUser(userToDelete);
    setUsers(users.filter(user => user.id !== userToDelete));
    setActivityLogs([...activityLogs, `Deleted user: ${userToDeleteEntry.name}`]);
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
    setEditUser({ ...user });
    setOpen(true);
  };

  const handleEditUserClose = () => {
    setOpen(false);
    setEditUser(null);
  };

  const handleEditUserSave = async () => {
    if (!editUser) {
      setError('No user selected for editing.');
      return;
    }
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

    try {
        const updatedUser = await updateUser(editUser);
        if (updatedUser) {
            setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
            setActivityLogs([...activityLogs, `Edited user: ${updatedUser.name}`]);
        } else {
            setError('Failed to update user.');
        }
    } catch (error) {
        setError('An error occurred while updating the user.');
        console.error(error);
    }

    handleEditUserClose();
  };

  const handleStatusChange = async (id) => {
    const updatedUsers = users.map(user => {
      if (user.id === id) {
        const updatedUser = { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' };
        updateUser(updatedUser);
        return updatedUser;
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  const filteredUsers = users.filter(user => 
    (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterRole ? user.role === filterRole : true) &&
    (filterStatus ? user.status === filterStatus : true)
  );

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

        <div>
          <Button 
            variant="contained" 
            onClick={() => handleBulkStatusChange('Active')}
            disabled={selectedUsers.length === 0}
            style={{ marginLeft: '8px', marginBottom: '5px'  }}  
          >
            Activate Selected
          </Button>
          <Button 
            variant="contained" 
            onClick={() => handleBulkStatusChange('Inactive')}
            disabled={selectedUsers.length === 0}
            style={{ marginLeft: '8px', marginBottom: '5px'  }}
          >
            Deactivate Selected
          </Button>
          <Button 
            variant="contained" 
            className="delete" 
            onClick={handleBulkDelete}
            disabled={selectedUsers.length === 0}
            style={{ marginLeft: '8px', marginBottom: '5px'  }}
          >
            Delete Selected
          </Button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Select</th>
              <th>Name</th>
              <th className="email">Email</th>
              <th>Role</th>
              <th style={{ width: '120px' }}>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loadingTable ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center' }}>
                  <CircularProgress />
                </td>
              </tr>
            ) : (
              currentUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <input 
                      type="checkbox" 
                      checked={selectedUsers.includes(user.id)} 
                      onChange={() => handleSelectUser(user.id)} 
                    />
                  </td>
                  <td>{user.name}</td>
                  <td className="email">{user.email}</td>
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
                    <button onClick={() => handleEditUserOpen(user)}>EDIT</button>
                    <Button 
                      variant="contained" 
                      className="delete" 
                      onClick={() => handleDeleteUser(user.id)} 
                      style={{ marginLeft: '8px' }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="pagination">
          <button 
            onClick={() => handlePageChange('prev')} 
            disabled={currentPage === 1} 
            style={{ opacity: currentPage === 1 ? 0.5 : 1 }}
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button 
            onClick={() => handlePageChange('next')} 
            disabled={currentPage === totalPages} 
            style={{ opacity: currentPage === totalPages ? 0.5 : 1 }}
          >
            Next
          </button>
        </div>
      </div>

      <div className="activity-log">
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