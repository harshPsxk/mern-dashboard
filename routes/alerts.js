// routes/alerts.js
const express = require('express');
const router = express.Router();
const Alert = require('../models/Alert'); // Import the Alert model
const verifyToken = require('../verifyToken'); // If you need to verify the user token

router.post('/', verifyToken, async (req, res) => {
  try {
    console.log("Received data:", req.body);
    const { condition, threshold } = req.body;
    const companyId = req.user.companyId; // Extract companyId from the token

    const newAlert = new Alert({ condition, threshold, companyId, deviceId: req.body.deviceId });
    await newAlert.save();

    res.status(200).json({ message: 'Alert rule created', newAlert });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating alert: " + err.message);
  }
});

router.get('/', verifyToken, async (req, res) => {
  try {
    const companyId = req.user.companyId; // Assuming alerts are specific to a company
    const alerts = await Alert.find({ companyId });
    res.json(alerts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching alerts: " + err.message);
  }
});

module.exports = router;


