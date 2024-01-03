const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');// Import CORS
const http = require('http');
const socketIo = require('socket.io');

const authRoutes = require('./routes/authRoutes');
const alertRoutes = require('./routes/alerts');
const Data = require('./models/data');
const verifyToken = require('./verifyToken');// Import the JWT verification middleware
const Alert = require('./models/Alert');

require('dotenv').config();

const app = express();

// Enable CORS for all routes
app.use(cors());
app.use(express.json());// Parses incoming requests with JSON payloads

// Routes
app.use('/api', authRoutes);// Authentication routes
app.use('/api/alerts', alertRoutes);// Alerts routes

// Creating an HTTP server and wrapping the Express app
const server = http.createServer(app);

// Attach socket.io to the server
const io = socketIo(server, {
  cors: {
    origin: "*", // Adjust according to your frontend URL
    methods: ["GET", "POST"]
  }
});

// Real-time alerting logic
const checkDataAndEmitAlert = async (data) => {
  // Example condition: trigger alert if temperature exceeds 50
  const alerts = await Alert.find({ companyId: data.companyId, deviceId: data.deviceId });
  console.log(alerts, data);
  for (const alert of alerts) {
    if (data.temperature > alert.threshold) {
      console.log('Alert triggered');
      io.emit('alert', { message: `Temperature exceeded for device ${data.deviceId}, Threshold - ${alert.threshold}`, data, alert });
    }
  }
};

app.post('/data', async (req, res) => {
  const newData = req.body;
  await Data.insertMany(newData);
  checkDataAndEmitAlert(newData); // Check data and possibly emit an alert
  res.send('Data inserted and processed for alerts');
});

app.get('/data', verifyToken, async (req, res) => {
  // Extract companyId from the authenticated user's token
  const companyId = req.user.companyId;
  // Fetch data specific to the user's company
  const companyData = await Data.find({ companyId: companyId });
  res.json(companyData);
});


app.get('/', (req, res) => res.send('Hello World!'));

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Server Initialization
const PORT = process.env.PORT || 5000;
// Database Connection
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB successfully connected");
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error("MongoDB connection error: ", err);
    process.exit(1);
  });
