import React from 'react';
import { Container, Typography } from '@mui/material';

function UsersPage() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>
      <Typography variant="body1">
        Manage your users, assign roles, and control access levels.
      </Typography>
    </Container>
  );
}

export default UsersPage;
