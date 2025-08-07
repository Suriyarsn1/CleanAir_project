import { useState } from "react";
import axios from '../config/apiInstance'
import { API_ENDPOINTS } from '../constants/api';

export default function LoginForm({
  handleLogin,
  loginUserName,
  loginPassword,
  setLoginUserName,
  setLoginPassword,
  msg,
}) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [forgotMsg, setForgotMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [userName, setUserName] = useState('');

  // For password reset
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);

  // sending OTP
  const handleForgot = async (e) => {
    e.preventDefault();
    setForgotMsg("");
    setLoading(true);
    setOtpSent(false);
    setOtpVerified(false);
    try {
      await axios.post(API_ENDPOINTS.AUTH_SEND_OTP, { email });
      setForgotMsg("OTP sent to your email. Please enter it below to verify.");
      setOtpSent(true);
    } catch (err) {
      setForgotMsg(err?.response?.data?.error || "No user found with that email.");
    }
    setLoading(false);
  };

  // verifying OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setForgotMsg("");
    setLoading(true);

    try {
      const res = await axios.post(API_ENDPOINTS.AUTH_VERIFY_OTP, { email, otp });

      if (res.data.verified) {
        setUserName(res.data.userName || "");
        setOtpVerified(true);
        setMode("reset");
        setForgotMsg("");
      } else {
        //  respond with verified false
        setOtpVerified(false);
        setForgotMsg(res.data.message || "OTP verification failed.");
      }
    } catch (err) {
      setOtpVerified(false);
      setForgotMsg(err?.response?.data?.error || "OTP verification failed.");
    } finally {
      setLoading(false);
    }
  };


  //  setting a new password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setForgotMsg("");
    setLoading(true);
    if (newPassword !== confirmPassword)
      return setForgotMsg("Passwords do not match.");
    if (!newPassword || newPassword.length < 6)
      return setForgotMsg("Password must be at least 6 characters.");
    try {
      await axios.post(API_ENDPOINTS.AUTH_RESET_OTP, { email, newPassword });
      setResetSuccess(true);
      setForgotMsg("Password reset successful! Please log in.");
    } catch (err) {
      setForgotMsg(err?.response?.data?.error || "Failed to reset password.");
    }
    setLoading(false);
  };

  const resetToLogin = () => {
    setMode("login");
    setForgotMsg("");
    setOtp("");
    setEmail("");
    setOtpSent(false);
    setOtpVerified(false);
    setNewPassword("");
    setConfirmPassword("");
    setResetSuccess(false);
  };



  return (
    <div className="relative z-10 w-full max-w-md p-8 rounded-3xl bg-white/40 backdrop-blur-lg border border-white/40 shadow-xl flex flex-col gap-6 fade-in">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-center mb-2 text-sky-800 tracking-wide drop-shadow-md">
        Welcome Back
      </h1>
      {/* Login Form  */}
      {mode === "login" && (<>
        <form
          className="flex flex-col gap-5"
          onSubmit={e => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="username" className="text-base font-semibold text-sky-900">
              User Name
            </label>
            <input
              id="username"
              className="w-full px-3 py-2 rounded-lg border border-sky-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 bg-white/80 text-base sm:text-lg transition-all"
              type="text"
              placeholder="Enter your user name"
              value={loginUserName}
              onChange={e => setLoginUserName(e.target.value)}
              autoComplete="username"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-base font-semibold text-sky-900">
              Password
            </label>
            <input
              id="password"
              className="w-full px-3 py-2 rounded-lg border border-sky-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 bg-white/80 text-base sm:text-lg transition-all"
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={e => setLoginPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>
          <button
            className="w-full bg-sky-400 hover:bg-sky-500 active:bg-sky-600 text-white py-2 sm:py-3 rounded-2xl font-semibold tracking-wide shadow transition-all mt-3 text-base sm:text-lg"
            type="submit" >
            Login
          </button>
        </form>
        <div className="flex flex-col gap-1 text-sm text-center mt-2">
          <a href="/user/register" className="underline text-sky-800 hover:text-sky-950 transition">
            Don't have User Id?
          </a>
          <button
            type="button"
            className="underline text-sky-800 hover:text-sky-950 transition bg-none border-none p-0"
            onClick={() => setMode("forgot")}
          >
            Forgot User Id/Password?
          </button>
        </div>
      </>
      )}
      {/* Forgot Password Form */}
      {mode === "forgot" && !otpVerified && (
        <form className="flex flex-col gap-5" onSubmit={otpSent ? handleVerifyOtp : handleForgot}>
          <div className="flex flex-col gap-1">
            <label htmlFor="forgot-email" className="text-base font-semibold text-sky-900">
              Enter your registered Email
            </label>
            <input
              id="forgot-email"
              type="email"
              className="w-full px-3 py-2 rounded-lg border border-sky-200 focus:ring-2"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              disabled={otpSent}
            />
          </div>
          {/* OTP Send Form */}
          {otpSent && (
            <div className="flex flex-col gap-1">
              <label htmlFor="otp" className="text-base font-semibold text-sky-900">
                Enter OTP sent to your email
              </label>
              <input
                id="otp"
                type="text"
                className="w-full px-3 py-2 rounded-lg border border-sky-200 focus:ring-2"
                placeholder="Enter OTP"
                value={otp}
                onChange={e => setOtp(e.target.value)}
                required
              />
            </div>
          )}
          <button
            className="w-full bg-sky-400 hover:bg-sky-500 text-white py-2 rounded-2xl font-semibold tracking-wide shadow transition-all"
            type="submit"
            disabled={loading}
          >
            {otpSent ? (loading ? "Verifying..." : "Verify OTP") : (loading ? "Sending..." : "Send OTP")}
          </button>
          <button type="button" onClick={resetToLogin} className="text-sky-700 underline font-semibold">
            Back to Login
          </button>
          {forgotMsg && <div className="text-center mt-1 text-sky-800 font-medium">{forgotMsg}</div>}
        </form>
      )}
      {/* Password Reset Form */}
      {mode === "reset" && (
        <form className="flex flex-col gap-5" onSubmit={handleResetPassword}>
          {resetSuccess ? (
            <>
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 shadow text-center">
                <div className="text-green-700 font-semibold mb-2">Your password has been reset.</div>
                <div>Please <button type="button" onClick={resetToLogin} className="underline text-sky-700">login</button> with your new password.</div>
              </div>
            </>
          ) : (
            <>
              <div className="text-sm text-center text-sky-800 font-semibold">
                <p>Set a new password for your account</p> <br />
                <p className="font-bold text-xl"> User Name: {userName}</p>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="new-password" className="text-base font-semibold text-sky-900">
                  New Password
                </label>
                <input
                  id="new-password"
                  type="password"
                  className="w-full px-3 py-2 rounded-lg border border-sky-200 focus:ring-2"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="confirm-password" className="text-base font-semibold text-sky-900">
                  Confirm New Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  className="w-full px-3 py-2 rounded-lg border border-sky-200 focus:ring-2"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
              <button
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-2xl font-semibold tracking-wide shadow transition-all"
                type="submit"
                disabled={loading}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
              <button type="button" onClick={resetToLogin} className="text-sky-700 underline font-semibold">
                Back to Login
              </button>
              {forgotMsg && <div className="text-center mt-1 text-red-600 font-medium">{forgotMsg}</div>}
            </>
          )}
        </form>
      )}

      {msg && <div className="mt-2 text-center text-red-600 font-medium">{msg}</div>}
    </div>
  );
}
