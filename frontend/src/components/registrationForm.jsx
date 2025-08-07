import React, { useState, useEffect } from "react";
import axios from "axios";

export default function RegistrationForm({
  setUserName,
  setUserEmail,
  setUserPassword,
  handleRegister,
  msg,
}) {
  // Local states
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Resend OTP countdown management
  useEffect(() => {
    let timerId;
    if (resendTimer > 0) {
      timerId = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timerId);
  }, [resendTimer]);

  // Send OTP (to backend)
  const handleSendOtp = async () => {
    if (!emailValue) return alert("Please enter your email first");
    try {
      setSendingOtp(true);
      const resp = await axios.post(
        "http://localhost:5000/api/auth/send-otp",
        { email: emailValue }
      );
      setOtpSent(true);
      setOtpVerified(false);
      setResendTimer(15); // 15 second countdown before enabling resend
      alert(resp.data?.message || `OTP sent to ${emailValue}!`);
      return resp.data;
    } catch (error) {
      alert(error?.response?.data?.error || "Failed to send OTP");
      throw new Error(error?.response?.data?.error || "Failed to send OTP");
    } finally {
      setSendingOtp(false);
    }
  };

  // Verify OTP (with backend)
  const handleVerifyOtp = async () => {
    if (!otp) return alert("Please enter the OTP");
    try {
      setVerifyingOtp(true);
      const resp = await axios.post("http://localhost:5000/api/auth/verify-otp", {
        email: emailValue,
        otp,
      });
      if (resp.data.verified) {
        setOtpVerified(true);
        alert("OTP verified successfully!");
      } else {
        setOtpVerified(false);
        alert(resp.data.error || "OTP verification failed");
      }
      return resp.data;
    } catch (error) {
      setOtpVerified(false);
      alert(error?.response?.data?.error || "OTP verification failed");
      throw new Error(error?.response?.data?.error || "OTP verification failed");
    } finally {
      setVerifyingOtp(false);
    }
  };

  // Resend (only if allowed)
  const handleResendOtp = () => {
    if (resendTimer === 0) handleSendOtp();
  };

  // Track email change and reset OTP flow
  const onEmailChange = (e) => {
    const val = e.target.value;
    setEmailValue(val);
    setUserEmail(val);
    if (otpSent) {
      msg('')
      setOtpSent(false);
      setOtp("");
      setOtpVerified(false);
      setResendTimer(0);
    }
  };

  // Password value handler (for possible confirm password validation)
  const onPasswordChange = (e) => {
    setPasswordValue(e.target.value);
    setUserPassword(e.target.value);
    msg('')
  };

  // Submit handler - basic confirm password check
  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!otpVerified) {
      alert("Please verify your OTP before registering.");
      return;
    }
    if (passwordValue !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    handleRegister();
  };

  return (
    <div className="relative z-10 w-full max-w-md p-8 rounded-3xl bg-white/40 backdrop-blur-lg border border-white/40 shadow-xl flex flex-col gap-7 fade-in mx-auto">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-sky-800 tracking-wide drop-shadow-md mb-6">
        Registration
      </h1>
      <form className="flex flex-col gap-5 fade-in" onSubmit={onFormSubmit}>
        {/* User Name */}
        <div className="flex flex-col gap-1">
          <label htmlFor="username" className="text-base sm:text-lg font-semibold text-sky-900">
            User Name
          </label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Enter Your Name"
            className="pl-3 py-2 text-base sm:text-lg rounded-lg border border-sky-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 bg-white/80 transition-all"
            onChange={(e) => setUserName(e.target.value)}
            autoComplete="username"
            required
          />
        </div>

        {/* Email + Send/Resend OTP */}
        <div className="flex flex-col gap-1 relative">
          <label htmlFor="email" className="text-base sm:text-lg font-semibold text-sky-900">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your Email"
            className="pl-3 py-2 pr-32 text-base sm:text-lg rounded-lg border border-sky-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 bg-white/80 transition-all"
            value={emailValue}
            onChange={onEmailChange}
            autoComplete="email"
            required
            disabled={otpSent && !otpVerified}
          />

          {/* OTP Button logic */}
          {!otpSent && (
            <button
              type="button"
              onClick={handleSendOtp}
              disabled={sendingOtp || !emailValue}
              className="absolute top-0 right-0 mt-2 mr-2 px-3 py-1 bg-sky-500 text-white text-sm rounded-lg hover:bg-sky-600 transition disabled:bg-sky-300"
            >
              {sendingOtp ? "Sending..." : "Send OTP"}
            </button>
          )}

          {otpSent && !otpVerified && (
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={resendTimer > 0}
              className="absolute top-0 right-0 mt-2 mr-2 px-3 py-1 bg-sky-500 text-white text-sm rounded-lg hover:bg-sky-600 transition disabled:bg-sky-300"
            >
              {resendTimer > 0
                ? `Resend OTP in ${resendTimer}s`
                : "Resend OTP"}
            </button>
          )}

          {otpVerified && (
            <span className="absolute top-2 right-3 text-green-600 font-semibold text-sm select-none">
              Verified ✓
            </span>
          )}
        </div>

        {/* OTP input & verify button */}
        {otpSent && !otpVerified && (
          <div className="flex flex-col gap-1">
            <label htmlFor="otp" className="text-base sm:text-lg font-semibold text-sky-900">
              Enter OTP
            </label>
            <div className="flex gap-2">
              <input
                id="otp"
                name="otp"
                type="text"
                placeholder="Enter OTP"
                className="flex-grow pl-3 py-2 text-base sm:text-lg rounded-lg border border-sky-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 bg-white/80 transition-all"
                value={otp}
                maxLength={6}
                onChange={(e) => setOtp(e.target.value.replace(/\D/, ""))}
              />
              <button
                type="button"
                onClick={handleVerifyOtp}
                disabled={verifyingOtp || !otp}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:bg-green-300"
              >
                {verifyingOtp ? "Verifying..." : "Verify OTP"}
              </button>
            </div>
          </div>
        )}

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-base sm:text-lg font-semibold text-sky-900">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            className="pl-3 py-2 text-base sm:text-lg rounded-lg border border-sky-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 bg-white/80 transition-all"
            value={passwordValue}
            onChange={onPasswordChange}
            autoComplete="new-password"
            required
            disabled={!otpVerified}
          />
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-1">
          <label htmlFor="confirmPassword" className="text-base sm:text-lg font-semibold text-sky-900">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            className="pl-3 py-2 text-base sm:text-lg rounded-lg border border-sky-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 bg-white/80 transition-all"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
            required
            disabled={!otpVerified}
          />
        </div>

        <button
          type="submit"
          disabled={!otpVerified}
          className={`w-full bg-sky-400 hover:bg-sky-500 active:bg-sky-600 text-white py-3 rounded-2xl font-semibold tracking-wide shadow transition-all mt-4 text-lg ${
            !otpVerified ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Register
        </button>
      </form>

      {/* Validation/Error Message */}
      {msg && (
        <div className="text-center mt-3 text-red-600 font-medium select-none">
          {msg}
        </div>
      )}
    </div>
  );
}
