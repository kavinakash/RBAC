import React from 'react';
import { Container, Typography } from '@mui/material';

function RolesPage() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Role Management
      </Typography>
      <Typography variant="body1">
        Define and assign roles with specific permissions.
      </Typography>
    </Container>
  );
}

export default RolesPage;
