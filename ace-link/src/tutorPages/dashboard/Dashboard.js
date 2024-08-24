
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { FaStar } from 'react-icons/fa';
import { Box, Typography, Avatar } from '@mui/material';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const App = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [10, 18, 15, 25, 20, 30],
        borderColor: '#00BFA6',
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const reviews = [
    {
      name: 'Abebe Balcha',
      rating: 4.5,
      comment: 'The comment from this user goes here the comment from this user goes here',
    },
    // Add more reviews as needed
  ];

  return (
    <Box sx={{ padding: '2rem', fontFamily: 'Arial, sans-serif', backgroundColor: '#F7F8FA', minHeight: '100vh' }}>
      <div className="welcome-section">
          <h1>Welcome back, Tutor!</h1>
          <p>you have an upcoming chemistry lesson with your student in 2 hours.</p>
          <a href='/meetings'>
          <button className="join-button">Join session</button>
          </a>
        </div>
      {/* Stats Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '2rem' }}>
        <Box sx={{ backgroundColor: '#fff', borderRadius: '12px', padding: '1rem', textAlign: 'center', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
          <Typography variant="subtitle1">Today's Earnings</Typography>
          <Typography variant="h6">3,000,000</Typography>
          <Typography sx={{ color: 'green', fontWeight: 'bold' }}>+55%</Typography>
        </Box>
        <Box sx={{ backgroundColor: '#fff', borderRadius: '12px', padding: '1rem', textAlign: 'center', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
          <Typography variant="subtitle1">New Requests</Typography>
          <Typography variant="h6">3,345</Typography>
          <Typography sx={{ color: 'green', fontWeight: 'bold' }}>+55%</Typography>
        </Box>
        <Box sx={{ backgroundColor: '#fff', borderRadius: '12px', padding: '1rem', textAlign: 'center', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
          <Typography variant="subtitle1">New Students</Typography>
          <Typography variant="h6">200,000</Typography>
          <Typography sx={{ color: 'red', fontWeight: 'bold' }}>-30%</Typography>
        </Box>
        <Box sx={{ backgroundColor: '#fff', borderRadius: '12px', padding: '1rem', textAlign: 'center', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
          <Typography variant="subtitle1">Ratings</Typography>
          <Typography variant="h6">3,000,000</Typography>
          <Typography sx={{ color: 'green', fontWeight: 'bold' }}>+55%</Typography>
        </Box>
      </Box>

{/* Review Breakdown and Revenue */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Review Breakdown */}
        <Box sx={{ width: '45%', backgroundColor: '#fff', borderRadius: '12px', padding: '2rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
          <Typography variant="h5">Review Breakdown</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', margin: '1rem 0' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', marginRight: '1rem' }}>4.5</Typography>
            <Box sx={{ display: 'flex' }}>
              {Array(5)
                .fill()
                .map((_, i) => (
                  <FaStar key={i} color={i < 4.5 ? '#FFD700' : '#ddd'} />
                ))}
            </Box>
          </Box>
          <Typography sx={{ color: '#999' }}>32,256 Reviews</Typography>
          <Box sx={{ marginTop: '2rem' }}>
            {reviews.map((review, index) => (
              <Box key={index} sx={{ padding: '1rem', borderBottom: '1px solid #eee' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{review.name}</Typography>
                <Typography variant="body2">{review.comment}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FaStar color="#FFD700" /> <Typography sx={{ marginLeft: '0.5rem' }}>{review.rating}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Revenue Chart */}
        <Box sx={{ width: '45%', backgroundColor: '#fff', borderRadius: '12px', padding: '2rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
          <Typography variant="h5">Revenue</Typography>
          <Typography variant="h4" sx={{ margin: '1rem 0' }}>$4,645</Typography>
          <Box>
            <Line data={data} options={options} />
          </Box>
        </Box>
      </Box>

      {/* Class Registrations Table */}
      <Box sx={{ marginTop: '2rem', backgroundColor: '#fff', borderRadius: '12px', padding: '2rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
        <Typography variant="h6" sx={{ marginBottom: '1rem' }}>Class Registrations</Typography>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>Class</th>
              <th style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>Student Name</th>
              <th style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>Date</th>
              <th style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {Array(4).fill().map((_, index) => (
              <tr key={index}>
                <td style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>Python 101</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>Abebe Balcha</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>8/22/2024</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>Pending</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Box>
  );
};

export default App;