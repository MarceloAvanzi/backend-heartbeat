const express = require('express');
const cron = require('node-cron');
const axios = require('axios');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Define the URL to ping
const pingUrl = process.env.BACKEND_URL;

// Status tracker
let lastPingStatus = 'No ping yet';
let lastPingTime = null;

// Setup cron job to run every 25 seconds
cron.schedule('*/25 * * * * *', async () => {
  console.log(`Pinging ${pingUrl} at ${new Date().toISOString()}`);

  try {
    const response = await axios.post(pingUrl, {
      email: 'admin@jsonapi.com',
      password: 'secret'
    });
    lastPingStatus = `Success: Status ${response.status}`;
    console.log(`Ping successful: ${response.status}`);
  } catch (error) {
    lastPingStatus = `Error: ${error.message}`;
    console.error(`Ping failed: ${error.message}`);
  }

  lastPingTime = new Date().toISOString();
});

// Simple endpoint to check the heartbeat service status
app.get('/', (req, res) => {
  res.json({
    service: 'Heartbeat Service',
    status: 'running',
    lastPing: {
      time: lastPingTime,
      status: lastPingStatus
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Heartbeat service running on port ${PORT}`);
  console.log(`Pinging ${pingUrl} every 25 seconds`);
});
