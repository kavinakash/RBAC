import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

function Navbar({ isAuthenticated, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>RBAC Dashboard</Typography>
        <Box>
          {isAuthenticated ? (
            <Button className="Log" color="inherit" onClick={handleLogout}>Logout</Button>
          ) : (
            <Button className="Log" color="inherit" onClick={() => navigate('/')}>Login</Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
