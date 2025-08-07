const Prediction = require('../models/mlmodel');
const User =require('../models/authModel');

exports.getAllUsersWithPredictions = async (req, res) => {
  try {
    //  restrict access to admins only
    if (!req.userRole || req.userRole !== 'admin') {
      return res.status(403).json({ error: 'Forbidden: Admins only' });
    }

    // Parse filter date
    const filterDate = req.query.predictionDate;
    let dateQuery = {};
    if (filterDate) {
      // Filter predictions on the specific day 
      const d = new Date(filterDate);
      const start = new Date(d.setHours(0, 0, 0, 0));
      const end = new Date(d.setHours(23, 59, 59, 999));
      dateQuery.date = { $gte: start, $lte: end };
    }

    // Find all users
    const users = await User.find({});

    // For each user, find their predictions 
    const usersWithPredictions = await Promise.all(
      users.map(async (user) => {
        const predictions = await Prediction.find({
          user: user._id,
          ...dateQuery,
        }).sort({ date: -1 }); // latest first

        return {
          _id: user._id,
          name: user.userName,
          email: user.email,
          createdAt: user.createdAt,
          predictions,
        };
      })
    );

    return res.json({ users: usersWithPredictions });
  } catch (err) {
    console.error('Admin getAllUsersWithPredictions error:', err);
    res.status(500).json({ error: 'Server error fetching users.' });
  }
};


