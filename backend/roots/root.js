const express = require('express');
const router = express.Router();

const auth = require('../middlewares/jwtToken');
const adminOnly = require('../middlewares/adminOnly'); 

const { userRegistration, userLogin,sendOtp,newUserVerifyOtp ,existUserverifyOtp,resetPassword } = require('../controller/authController');
const {
  predict,
  history,
} = require('../controller/predictionController');
const {  getAllUsersWithPredictions}=require('../controller/adminController')

// Public routes
router.post('/register', userRegistration);
router.post('/login', userLogin);

// Protected user routes
router.post('/predict', auth, predict);
router.get('/predict/history', auth, history);

// Admin protected route
router.get('/admin/users', auth, adminOnly, getAllUsersWithPredictions);

//Email verifiction
router.post("/auth/send-otp", sendOtp);
router.post("/auth/new/user/verify-otp", newUserVerifyOtp );
router.post('/auth/exist/user/verify-otp',existUserverifyOtp);
router.post("/auth/reset-password", resetPassword);

//Token Verification
router.post('/token/status',auth);





module.exports = router;
