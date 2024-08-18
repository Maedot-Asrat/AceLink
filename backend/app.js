const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const dotenv = require('dotenv');
const studyGroupRoutes = require('./routes/sgRoutes')
const recommend =require('./routes/recommend');
const request= require('./routes/requests');
const session = require('./routes/session');
const cors = require('cors');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('', userRoutes);
app.use('', studyGroupRoutes);
app.use('',recommend);
app.use('',request);
app.use('',session);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));