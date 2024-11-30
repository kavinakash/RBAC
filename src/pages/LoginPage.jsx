import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';

function LoginPage({ onLogin }) {
  const navigate = useNavigate();

  // Hardcoded credentials
  const adminEmail = "admin@email.com";
  const adminPassword = "1234";

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError(''); // Reset error message

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !password) {
      setError("Both fields are required");
      return;
    }

    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (email !== adminEmail || password !== adminPassword) {
      setError("Invalid email or password");
      return;
    }

    // Mark user as authenticated and redirect
    localStorage.setItem('isAuthenticated', 'true');
    onLogin(); // Call the onLogin function to update the authentication state
    navigate('/dashboard');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Admin Login
      </Typography>

      {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}

      <form onSubmit={handleLogin} style={{ width: '100%', maxWidth: 400 }}>
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          required
          error={!!error && !email} // Show error if email is invalid
          helperText={!!error && !email ? "Email is required" : ""}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          required
          error={!!error && !password} // Show error if password is invalid
          helperText={!!error && !password ? "Password is required" : ""}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          sx={{ marginTop: 2 }}
        >
          Login
        </Button>
      </form>
    </Box>
  );
}

export default LoginPage;
