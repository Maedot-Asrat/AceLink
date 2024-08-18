// Sidebar.js
import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import MessageIcon from '@mui/icons-material/Message';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Sidebar = () => {
  return (
    <Drawer variant="permanent" anchor="left">
      <List>
        <ListItem button>
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><SchoolIcon /></ListItemIcon>
          <ListItemText primary="My Courses" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><AccountCircleIcon /></ListItemIcon>
          <ListItemText primary="My Students" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><MessageIcon /></ListItemIcon>
          <ListItemText primary="Messages" />
        </ListItem>
        {/* Add more navigation items as needed */}
      </List>
    </Drawer>
  );
};

export default Sidebar;
