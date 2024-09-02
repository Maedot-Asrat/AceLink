import React from 'react';
import { AppBar, Toolbar, Typography, Box, Grid, Card, CardContent, CardActions, Button, Avatar, List, ListItem, ListItemAvatar, ListItemText, Container, Divider } from '@mui/material';
import { Schedule, PersonSearch} from '@mui/icons-material';

const Dashboard = () => {
  const recommendedTutors = [
    { name: 'John Doe', subject: 'Mathematics' },
    { name: 'Jane Smith', subject: 'Physics' },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Top bar */}
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AceLink - Welcome, Student!
          </Typography>
          <Avatar sx={{ bgcolor: '#fff', color: '#1976d2' }}>S</Avatar> {/* Student avatar */}
        </Toolbar>
      </AppBar>

      {/* Main content */}
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          {/* Welcome Section */}
          <Grid item xs={12}>
            <Card raised sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  Welcome to AceLink!
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Access your upcoming sessions, find recommended tutors, and stay on top of your learning progress.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Upcoming Sessions */}
          <Grid item xs={12} md={6}>
            <Card raised sx={{ borderRadius: 3, height: '100%' }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Upcoming Sessions
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="body1" color="textSecondary">
                  No upcoming sessions scheduled. Let’s get learning!
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Schedule />}
                  sx={{ borderRadius: 2, px: 4 }}
                >
                  Schedule a Session
                </Button>
              </CardActions>
            </Card>
          </Grid>

          {/* Recommended Tutors */}
          <Grid item xs={12} md={6}>
            <Card raised sx={{ borderRadius: 3, height: '100%' }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Recommended Tutors
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <List>
                  {recommendedTutors.map((tutor, index) => (
                    <ListItem key={index}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>{tutor.name[0]}</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={tutor.name}
                        secondary={tutor.subject}
                        primaryTypographyProps={{ fontWeight: 'bold' }}
                        secondaryTypographyProps={{ color: 'textSecondary' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center' }}>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<PersonSearch />}
                  sx={{ borderRadius: 2, px: 4 }}
                >
                  Find More Tutors
                </Button>
              </CardActions>
            </Card>
          </Grid>

          {/* Call to Action Section */}
          <Grid item xs={12}>
            <Card raised sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Ready to dive in?
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Begin your learning journey now. Explore tutors, schedule sessions, or review your progress.
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center' }}>
                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  sx={{ borderRadius: 2, px: 4 }}
                >
                  Start Learning
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
