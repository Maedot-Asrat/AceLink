import React, { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
  Badge,
  Menu as MuiMenu,
  MenuItem as MuiMenuItem,
} from "@mui/material";
import {
  MdSettings,
  MdNotifications,
  MdLibraryBooks,
  MdVideoLibrary,
  MdGroups,
  MdMessage,
  MdEvent,
  MdMenuBook,
} from "react-icons/md";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import logo from '../../assets/Logo.png';
// import bookImage from '../../assets/cool.png';
import bookImage from '../../assets/image1.png';
import '../navbar/Navbar.css';
// import NotificationsPopover from '../../components/NotificationsPopover';  // Commented out as per request

export default function Navbar() {
  const [collapsed, setCollapsed] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userImage, setUserImage] = useState('');
  const [userRole, setUserRole] = useState('Student');
  const location = useLocation();  // Hook to get current route location
  const theme = useTheme();
  const navigate = useNavigate();

  // State for Settings Menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.email) setUserEmail(storedUser.email);
    if (storedUser && storedUser.role) setUserRole(storedUser.role);
    if (storedUser && storedUser.profile.profile_picture) setUserImage(storedUser.profile.profile_picture);
  }, []);
console.log(userImage);
const baseURL = 'https://acelink-w1qp.onrender.com/';
const fixImagePath = (path) => {
  return path.replace(/\\/g, '/');
};
console.log(baseURL+fixImagePath(userImage));
  useEffect(() => {
    // Function to handle window resize
    const handleResize = () => {
      if (window.innerWidth <= 780) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  // Function to get the title based on the current route
  const getTitle = () => {
    switch (location.pathname) {
      case '/tutors':
        return 'Tutor Recommendations For You';
      case '/mycourses':
        return 'My Courses';
      case '/study-groups':
        return 'Study Groups';
      case '/community':
        return 'Community';
      case '/library':
        return 'Library';
      case '/myschedules':
        return 'My Schedules';
      case '/messages':
        return 'Messages';
      case '/profile':
        return 'Profile';
      case '/recordings':
        return 'Session Tools';
      default:
        return 'Dashboard';
    }
  };

  const sidebarWidth = collapsed ? '80px' : '280px'; // Sidebar width dynamically adjusted

  // Handlers for Settings Menu
  const handleSettingsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSettingsClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Implement your logout logic here
    localStorage.removeItem('user');
    navigate('/loginStudent'); // Redirect to login page after logout
  };

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
              cursor: 'pointer',
            }}
          >
            {!collapsed && <Typography variant="h6" style={{ color: "#5D7285", fontWeight: 700 , fontSize:'25px'}}>ACELINK</Typography>}
          </MenuItem>

          {/* Menu Items */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.8, mt: 3 }}>
            <MenuItem
              icon={<MdLibraryBooks style={{ color: '#5D7285' }} />}
              component={<Link to="/tutors" />}
              className="menu-item"
              sx={{
                color: '#5D7285',
                '&:hover': { color: '#0C7FDA', backgroundColor: '#E9F5FE' },
              }}
            >
              {!collapsed && "Tutors"}
            </MenuItem>
            {/* <MenuItem
              icon={<MdMenuBook style={{ color: '#5D7285' }} />}
              component={<Link to="/mycourses" />}
              className="menu-item"
              sx={{
                color: '#5D7285',
                '&:hover': { color: '#0C7FDA', backgroundColor: '#E9F5FE' },
              }}
            >
              {!collapsed && "My Courses"}
            </MenuItem> */}
            <MenuItem
              icon={<MdVideoLibrary style={{ color: '#5D7285' }} />}
              component={<Link to="/recordings" />}
              className="menu-item"
              sx={{
                color: '#5D7285',
                '&:hover': { color: '#0C7FDA', backgroundColor: '#E9F5FE' },
              }}
            >
              {!collapsed && "Session Tools"}
            </MenuItem>
            <MenuItem
              icon={<MdGroups style={{ color: '#5D7285' }} />}
              component={<Link to="/community" />}
              className="menu-item"
              sx={{
                color: '#5D7285',
                '&:hover': { color: '#0C7FDA', backgroundColor: '#E9F5FE' },
              }}
            >
              {!collapsed && "Community"}
            </MenuItem>
            <MenuItem
              icon={<MdVideoLibrary style={{ color: '#5D7285' }} />}
              component={<Link to="/studygroups" />}
              className="menu-item"
              sx={{
                color: '#5D7285',
                '&:hover': { color: '#0C7FDA', backgroundColor: '#E9F5FE' },
              }}
            >
              {!collapsed && "Study Groups"}
            </MenuItem>
            <MenuItem
              icon={<MdEvent style={{ color: '#5D7285' }} />}
              component={<Link to="/myschedules" />}
              className="menu-item"
              sx={{
                color: '#5D7285',
                '&:hover': { color: '#0C7FDA', backgroundColor: '#E9F5FE' },
              }}
            >
              {!collapsed && "My Schedules"}
            </MenuItem>
            <MenuItem
              icon={<MdEvent style={{ color: '#5D7285' }} />}
              component={<Link to="/library" />}
              className="menu-item"
              sx={{
                color: '#5D7285',
                '&:hover': { color: '#0C7FDA', backgroundColor: '#E9F5FE' },
              }}
            >
              {!collapsed && "Library"}
            </MenuItem>
            {/* <MenuItem
              icon={<MdMessage style={{ color: '#5D7285' }} />}
              component={<Link to="/messages" />}
              className="menu-item"
              sx={{
                color: '#5D7285',
                '&:hover': { color: '#0C7FDA', backgroundColor: '#E9F5FE' },
              }}
            >
              {!collapsed && "Messages"}
            </MenuItem> */}
          </Box>

          {!collapsed && (
            <Box sx={{ position: 'absolute', bottom: 100, left: 0, right: 0, textAlign: 'center' }}>
              <img src={bookImage} alt="Book and Graduation Image" width="80%" />
            </Box>
          )}

          {/* Profile and Settings Section */}
          <Box sx={{ position: 'absolute', bottom: 20, left: 0, right: 0 }}>
            <MenuItem
              // Removed Link to profile as settings will handle profile navigation
              // component={<Link to="/profile" />}
              onClick={handleSettingsClick} // Open settings menu on click
              sx={{
                color: "#5D7285",
                '&:hover': { color: '#0C7FDA', backgroundColor: '#E9F5FE' },
                cursor: 'pointer',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {!collapsed && (
                  <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 'auto' }}>
                    <Avatar alt="User Profile" src={baseURL+ fixImagePath(userImage)} sx={{ marginRight: '8px' }} />
                    <Box>
                      <Typography variant="body2" sx={{ color: "#5D7285" }}>{`Mr ${userEmail.split('@')[0]}`}</Typography>
                      <Typography variant="caption" sx={{ color: "#5D7285" }}>{userRole}</Typography>
                    </Box>
                  </Box>
                )}
                <MdSettings style={{ color: '#5D7285', fontSize: '30px', marginLeft: !collapsed ? '16px' : '0' }} />
              </Box>
            </MenuItem>

            {/* Settings Menu */}
            <MuiMenu
              anchorEl={anchorEl}
              open={open}
              onClose={handleSettingsClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              PaperProps={{
                elevation: 3,
                sx: {
                  mt: 1.5,
                  minWidth: 150,
                  '& .MuiMenuItem-root': {
                    padding: '8px 16px',
                  },
                },
              }}
            >
              <MuiMenuItem onClick={() => { handleSettingsClose(); navigate('/profile'); }}>
                Profile
              </MuiMenuItem>
              <MuiMenuItem onClick={() => { handleSettingsClose(); handleLogout(); }}>
                Logout
              </MuiMenuItem>
            </MuiMenu>
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
          minWidth: `calc(100vw - ${sidebarWidth})`,  // Adjust main content area width dynamically
        }}
      >
        {/* App Bar */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            backgroundColor: "#ffffff",
            width: `calc(100% - 26px)`,  // Dynamic width based on sidebar state
            transition: 'width 0.3s ease, margin-left 0.3s ease',
            boxShadow: 'none',
            marginTop: '18px',
             // Adjust margin based on collapsed state
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, color: '#5D7285', fontWeight: 700, fontSize: '25px', minHeight: '0' }}
            >
              {getTitle()}  {/* Title dynamically changes based on route */}
            </Typography>
            {/* <NotificationsPopover /> */} {/* NotificationsPopover commented out as per request */}

            {/* Profile Icon */}
            <IconButton
              aria-label="user profile"
              edge="end"
              component={Link}
              to="/profile"
              sx={{ ml: 2 }}
            >
              <Avatar alt="User Profile" src={baseURL+ fixImagePath(userImage)} />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* White Content Area */}
        <Box sx={{ p: 3, backgroundColor: '#ffffff', borderRadius: 2 }}>
          <Outlet /> {/* Render child components here */}
        </Box>
      </Box>
    </Box>
  );
}
