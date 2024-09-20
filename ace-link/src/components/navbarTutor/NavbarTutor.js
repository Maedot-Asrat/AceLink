import React, { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { AppBar, Toolbar, Typography, IconButton, Avatar, Box, Badge } from "@mui/material";
import { MdSettings, MdNotifications, MdLibraryBooks, MdVideoLibrary, MdGroups, MdMessage, MdEvent, MdMenuBook } from "react-icons/md";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import logo from '../../assets/Logo.png';
import bookImage from '../../assets/image1.png';
import NotificationsPopover from '../../components/NotificationsPopover';  

export default function Navbar() {
  const [collapsed, setCollapsed] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState('Tutor');
  const location = useLocation();  // Hook to get current route location
  const theme = useTheme();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.email) setUserEmail(storedUser.email);
    if (storedUser && storedUser.role) setUserRole(storedUser.role);
  }, []);

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  // Mapping paths to title bar text
  const getTitle = () => {
    switch (location.pathname) {
    case '/requests':
        return 'Session Requests'
    case '/libraryTutor':
        return 'Library'
        case '/tutor/schedules':
        return 'My Schedules'
      default:
        return 'Dashboard';
    }
  };

  const sidebarWidth = collapsed ? '80px' : '280px'; // Sidebar width dynamically adjusted

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        width={sidebarWidth}
        backgroundColor="#fff"
        style={{ 
          position: "fixed", 
          top: 0, 
          left: 0, 
          height: "100vh", 
          color: '#5D7285', 
          boxShadow: '0px 3.13px 35.16px rgba(0, 0, 0, 0.08)' 
        }}
      >
        <Menu
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            height: '100%',
            padding: '20px 0',
          }}
        >
          {/* Logo */}
          <MenuItem
            icon={<img src={logo} alt="logo" width="100rem" />}
            onClick={handleCollapse}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {!collapsed && <Typography variant="h6" style={{ color: "#5D7285", fontWeight: 700 , fontSize:'25px'}}>ACELINK</Typography>}
          </MenuItem>

          {/* Menu Items */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.8, mt: 3 }}>
        
            <MenuItem
                icon={<MdLibraryBooks style={{ color: '#5D7285' }} />}
                component={<Link to="/requests" />}  // Updated the route
                className="menu-item"
                sx={{
                    color: '#5D7285',
                    '&:hover': { color: '#0C7FDA', backgroundColor: '#E9F5FE' },  // Styling on hover
                }}
                >
                {!collapsed && "Requests"} 
            </MenuItem>

            <MenuItem
                icon={<MdLibraryBooks style={{ color: '#5D7285' }} />}
                component={<Link to="/libraryTutor" />}  // Updated the route
                className="menu-item"
                sx={{
                    color: '#5D7285',
                    '&:hover': { color: '#0C7FDA', backgroundColor: '#E9F5FE' },  // Styling on hover
                }}
                >
                {!collapsed && "Library"} 
            </MenuItem>
            <MenuItem
                icon={<MdLibraryBooks style={{ color: '#5D7285' }} />}
                component={<Link to="/tutor/schedules" />}  // Updated the route
                className="menu-item"
                sx={{
                    color: '#5D7285',
                    '&:hover': { color: '#0C7FDA', backgroundColor: '#E9F5FE' },  // Styling on hover
                }}
                >
                {!collapsed && "My Schedules"} 
            </MenuItem>
          

      
          </Box>

          {!collapsed && (
            <Box sx={{ position: 'absolute', bottom: 100, left: 0, right: 0, textAlign: 'center' }}>
              <img src={bookImage} alt="Book and Graduation Image" width="80%"  />
            </Box>
          )}

     {/* Profile Section */}
<Box sx={{ position: 'absolute', bottom: 20, left: 0, right: 0 }}>
  <MenuItem
    component={<Link to="/profile" />}
    sx={{
      color: "#5D7285",
      '&:hover': { color: '#0C7FDA', backgroundColor: '#E9F5FE' },
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      {!collapsed && (
        <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 'auto' }}>
          {/* Avatar and user information closer */}
          <Avatar alt="User Profile" src="profile.png" sx={{ marginRight: '8px' }} />
          <Box>
            {/* User information */}
            <Typography variant="body2" sx={{ color: "#5D7285" }}>{`Mr ${userEmail.split('@')[0]}`}</Typography>
            <Typography variant="caption" sx={{ color: "#5D7285" }}>{userRole}</Typography>
          </Box>
        </Box>
      )}
      {/* Icon on the right, always visible */}
      <MdSettings style={{ color: '#5D7285', fontSize: '24px', marginLeft: !collapsed ? '16px' : '0' }} />
    </Box>
  </MenuItem>
</Box>



        </Menu>
      </Sidebar>

      {/* Content Area */}
      <Box
  component="main"
  sx={{
    flexGrow: 1,
    p: 0,
    backgroundColor: "#ffffff",
    minHeight: "100vh",
    marginLeft: sidebarWidth, // Adjust margin based on sidebar state
    transition: 'margin-left 0.3s ease',
    minWidth: `calc(99vw - ${sidebarWidth})`,  // Adjust main content area width dynamically
  }}
>
 
  <AppBar

    position="static"
    elevation={0}
    sx={{
      backgroundColor: "#ffffff",
      width: `calc(94% -80px)`,  
     
      transition: 'width 0.3s ease, margin-left 0.3s ease',
      boxShadow: 'none',
      marginTop:'18px'
    }}
  >
    <Toolbar>
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ flexGrow: 1, color: '#5D7285', fontWeight: 700, fontSize: '25px',minHeight:'0' }}
      >
        {getTitle()}  
      </Typography>
   
      <IconButton
        aria-label="user profile"
        edge="end"
        component={Link}
        to="/profile"
        sx={{ ml: 2 }}
      >
        <Avatar alt="User Profile" src="profile.png" />
      </IconButton>
    </Toolbar>
  </AppBar>



  <Box sx={{ p: 3, backgroundColor: '#ffffff', borderRadius: 2 }}>
    <Outlet /> 
  </Box>
</Box>

    </Box>
  );
}

