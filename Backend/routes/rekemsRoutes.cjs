const express = require('express');
const router = express.Router();
const {authenticateMiddleware, managerMiddleware} = require('../middlewares/authMiddleware.cjs');
const carData = require('../models/carData.cjs'); // Assuming you have the carData model defined in models/carData.js
const mappings = require('../mappings.cjs');
// GET /api/rekems/get_of_user - Get carData based on user's gdud
router.get('/get_of_user', authenticateMiddleware, async (req, res) => {
  try {
    const queryResult = await carData.find({
      gdud: req.user.gdud,
    });

    res.json({
      error: false,
      results: queryResult.map((item) => ({
        kshirot: item.kshirot,
        makat: item.makat,
        carNumber: item.carNumber,
      })),
    });
  
  } catch (error) {
    res.json({ error: true, error_message: error.message });
  }
});

// returns a summarized list of items: makat, kashir amount (valid) and not kashir amount (invalid)
router.get('/get_summarized_of_user',authenticateMiddleware, async(req, res) => {
  try {
    const queryResult = await carData.aggregate([
      // matching by gdud
      {
        $match: {gdud: req.user.gdud},
      },
      
        // grouping by makat and summing according to 'kshirot'
      {
        $group: {
          _id: "$makat",
          valid: {
            $sum: {$cond: ['$kshirot', 1, 0]}
          },
          invalid: {
            $sum: {$cond: ['$kshirot', 0, 1]}
          },
        }
      },
  
      // remove the _id field and change it with makat
      {
        $project: {
          _id: 0, // Exclude the default _id field from the output
          makat: "$_id", // Assign the value of the "makat" field to the "makat" field
          valid: 1,
          invalid: 1,
        }
      }
    ]);
  
    res.json({error: false, results: queryResult});
  }

  catch (error) {
    res.json({ error: true, error_message: error.message });

  }

});



// GET /api/rekems/get_by_gdud/:gdud - Get carData based on provided gdud
router.get('/get_by_gdud/:gdud', authenticateMiddleware, managerMiddleware, async (req, res) => {
  try {
    const queryResult = await carData.find({
      gdud: req.params.gdud,
    });

    res.json({
      error: false,
      results: queryResult.map((item) => ({
        kshirot: item.kshirot,
        makat: item.makat,
        carNumber: item.carNumber,
      })),
    });
  
  } catch (error) {
    res.json({ error: true, error_message: error.message });
  }
});

// POST /api/rekems/add - Add a new rekem (carData) - Requires authentication for manager role
router.post('/add', authenticateMiddleware, managerMiddleware, async (req, res) => {
  const { carNumber, makat, kshirot } = req.body;

  if (!carNumber || !makat || kshirot === undefined) {
    res.json({ error: true, error_message: mappings.INVALID_FIELDS });
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
