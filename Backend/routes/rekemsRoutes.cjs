const express = require('express');
const router = express.Router();
const authenticateMiddleware = require('../middlewares/authMiddleware.cjs');
const carData = require('../models/carData.cjs'); // Assuming you have the carData model defined in models/carData.js

// GET /api/rekems/get_of_user - Get carData based on user's gdud
router.get('/get_of_user', authenticateMiddleware, async (req, res) => {
  try {
    const queryResult = await carData.find({
      gdud: req.user.gdud,
    });

    res.json({ error: false, results: queryResult });
  } catch (error) {
    res.json({ error: true, error_msg: error.message });
  }
});

// GET /api/rekems/get_by_gdud/:gdud - Get carData based on provided gdud
router.get('/get_by_gdud/:gdud', authenticateMiddleware, async (req, res) => {
  try {
    const queryResult = await carData.find({
      gdud: req.params.gdud,
    });

    res.json({ error: false, results: queryResult });
  } catch (error) {
    res.json({ error: true, error_msg: error.message });
  }
});

// POST /api/rekems/add - Add a new rekem (carData) - Requires authentication for manager role
router.post('/add', authenticateMiddleware, async (req, res) => {
  if (!req.user.isManager) {
    res.json({ error: true, error_message: 'Unauthorized to add new rakams' });
    return;
  }

  const { carNumber, makat, kshirot } = req.body;

  if (!carNumber || !makat || kshirot === undefined) {
    res.json({ error: true, error_message: 'One or more fields are invalid' });
  } else {
    const newlyAdded = new carData({
      carNumber,
      makat,
      kshirot,
      gdud: req.user.gdud,
    });

    try {
      const savedCarData = await newlyAdded.save();
      res.json({ error: false, result: savedCarData });
    } catch (err) {
      res.json({ error: true, error_message: err.message });
    }
  }
});

module.exports = router;
