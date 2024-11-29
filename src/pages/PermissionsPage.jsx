import React from 'react';
import { Container, Typography } from '@mui/material';

function PermissionsPage() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Permissions Management
      </Typography>
      <Typography variant="body1">
        Customize permissions for roles and users.
      </Typography>
    </Container>
  );
}

export default PermissionsPage;
