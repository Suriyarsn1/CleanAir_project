const User = require('../models/authModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const otpStore = new Map();

// User Registration 
exports.userRegistration = async (req, res) => {
  const { userName, userPassword, userEmail } = req.body;
  try {
    const existUserName = await User.findOne({ userName });
    if (existUserName)
      return res.status(400).json({ message: 'User Name Already Registered' });

    const existEmail = await User.findOne({ email: userEmail });
    if (existEmail)
      return res.status(400).json({ message: 'Email-ID Already Registered' });

    const hashpassword = await bcrypt.hash(userPassword, 10);
    const newUser = new User({
      userName,
      email: userEmail,
      password: hashpassword
    });
    await newUser.save();

    res.status(201).json({ message: 'Register Successfully' });
  } catch (err) {
    console.error('Registration Error:', err.message);
    res.status(500).json({ message: 'ServerError, Please Try after Some time!!' });
  }
};

// User Login 
exports.userLogin = async (req, res) => {
  const { loginUserName, loginPassword } = req.body;
  try {
    const findUsername = await User.findOne({ userName: loginUserName });
    if (!findUsername) {
      return res.status(400).json({ message: 'Invalid User Name' });
    }

    const checkPassword = await bcrypt.compare(loginPassword, findUsername.password);
    if (!checkPassword) {
      return res.status(400).json({ message: 'Invalid Password' });
    }

    const token = jwt.sign(
      { userId: findUsername._id, role: findUsername.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      token,
      userData: {
        userId: findUsername._id,
        userName: findUsername.userName,
        userEmail: findUsername.email,
        role: findUsername.role,
      },
    });
  } catch (err) {
    console.log('Login Error:', err.message);
    res.status(500).json({ message: 'Server Error Login Later' });
  }
};

// Send OTP to Email 
exports.sendOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(email, { otp, expires: Date.now() + 5 * 60 * 1000 }); // 5 minutes

  try {
    console.log(`OTP for ${email}: ${otp}`);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: "Your OTP",
      text: `Your OTP is: ${otp}`,
    });

    return res.json({ message: 'OTP sent successfully!' });
  } catch (error) {
    console.error('OTP Send Error:', error.message);
    return res.status(500).json({ error: 'Failed to send OTP email' });
  }
};

exports.newUserVerifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: 'Email and OTP are required' });
  }

  const record = otpStore.get(email);

  if (!record) {
    return res.status(400).json({ error: 'No OTP found for this email' });
  }

  if (Date.now() > record.expires) {
    otpStore.delete(email);
    return res.status(400).json({ error: 'OTP has expired' });
  }

  if (record.otp === otp) {
    otpStore.delete(email);

    // Successful OTP verification for new user (ready for registration)
    return res.status(200).json({
      verified: true,
      message: 'OTP verified successfully. You can now register.'
    });
  } else {
    return res.status(400).json({ error: 'Invalid OTP' });
  }
};


// Verify OTP 
exports.existUserverifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: 'Email and OTP are required' });
  }

  const record = otpStore.get(email);

  if (!record) {
    return res.status(400).json({ error: 'No OTP found for this email' });
  }

  if (Date.now() > record.expires) {
    otpStore.delete(email);
    return res.status(400).json({ error: 'OTP has expired' });
  }

  if (record.otp === otp) {
    // OTP verified successfully
    try {
      const user = await User.findOne({ email }).select('userName email');
      otpStore.delete(email);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Send back verification status 
      return res.status(200).json({
        verified: true,
        message: 'OTP verified successfully',
        userName: user.userName,
      });
    } catch (err) {
      console.error('Error fetching user after OTP verification:', err);
      return res.status(500).json({ error: 'Server error after OTP verification' });
    }
  } else {
    return res.status(400).json({ error: 'Invalid OTP' });
  }
};

// New Reset Password Controller
exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ error: 'Email and new password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Password Reset Error:', error);
    return res.status(500).json({ error: 'Failed to reset password' });
  }
};
