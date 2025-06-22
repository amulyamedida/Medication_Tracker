const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const medicationRoutes = require('./routes/medications');
const logRoutes = require('./routes/log'); 

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/medications', medicationRoutes);
app.use('/api/log', logRoutes); 

app.get('/', (req, res) => {
  res.send('Medicare Companion API is running.');
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
