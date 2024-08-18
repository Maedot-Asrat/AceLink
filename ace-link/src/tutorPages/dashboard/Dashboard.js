// Dashboard.js
import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';

const Dashboard = () => {
  return (
    <Grid container spacing={3} style={{ padding: '20px' }}>
      {/* Earnings Widget */}
      <Grid item xs={12} md={6}>
        <Paper style={{ padding: '20px' }}>
          <Typography variant="h6">Today's Earnings</Typography>
          <Typography variant="h4">3,000,000</Typography>
        </Paper>
      </Grid>

      {/* Upcoming Sessions */}
      <Grid item xs={12} md={6}>
        <Paper style={{ padding: '20px' }}>
          <Typography variant="h6">Upcoming Sessions</Typography>
          {/* Add a table or list for sessions */}
        </Paper>
      </Grid>

      {/* Revenue Graph */}
      <Grid item xs={12} md={6}>
        <Paper style={{ padding: '20px' }}>
          <Typography variant="h6">Revenue</Typography>
          {/* Add a chart component for revenue */}
        </Paper>
      </Grid>

      {/* Review Breakdown */}
      <Grid item xs={12} md={6}>
        <Paper style={{ padding: '20px' }}>
          <Typography variant="h6">Review Breakdown</Typography>
          {/* Add a chart or rating component for reviews */}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
