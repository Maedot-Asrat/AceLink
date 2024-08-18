// Header.js
import React from 'react';
import { AppBar, Toolbar, Typography, Avatar } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          AceLink
        </Typography>
        {/* Notifications, Profile Icon, etc */}
        <Avatar alt="Profile" src="/static/images/avatar/1.jpg" />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
