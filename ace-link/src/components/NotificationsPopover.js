import React, { useState } from 'react';
import { Popover, Box, Typography, IconButton, Badge, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { MdNotifications, MdMail, MdEvent, MdGroup } from 'react-icons/md';

export default function NotificationsPopover() {
  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isOpen = Boolean(anchorEl);
  const id = isOpen ? 'notification-popover' : undefined;

  // Sample notifications data
  const notifications = [
    { id: 1, icon: <MdMail />, message: 'New message from John' },
    { id: 2, icon: <MdEvent />, message: 'Upcoming event: AI Workshop' },
    { id: 3, icon: <MdGroup />, message: 'New study group invitation' },
    { id: 4, icon: <MdNotifications />, message: 'Your course is starting soon' },
  ];

  return (
    <Box>
      <IconButton
        aria-describedby={id}
        aria-label="show notifications"
        onClick={handleOpen}
        sx={{ color: '#5D7285' }}
      >
        <Badge badgeContent={notifications.length} color="error">
          <MdNotifications />
        </Badge>
      </IconButton>

      <Popover
        id={id}
        open={isOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{ mt: 1 }}
      >
        <Box sx={{ width: '300px', p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Notifications</Typography>
          <List>
            {notifications.map((notification) => (
              <ListItem key={notification.id} button>
                <ListItemIcon>{notification.icon}</ListItemIcon>
                <ListItemText primary={notification.message} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Popover>
    </Box>
  );
}
