require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth');
const progRoutes = require('./routes/programari');
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/programari', progRoutes);

app.get('/', (req, res) => {
  res.send('Backend funcționează!');
});

app.listen(4000, () => {
  console.log('Server running on port 4000');
});

