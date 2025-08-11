const jwt = require('jsonwebtoken');
const User=require('../models/authModel')
require('dotenv').config();



module.exports =async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log(req.headers.authorization)
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    const user = await User.findById(req.userId);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });
    req.userRole = user.role;
    next();
  } catch (e) {
    res.status(401).json({ error: 'Your Session Expried Login again' });
  }
};
