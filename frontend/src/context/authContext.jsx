import { useContext, createContext, useState } from "react";
import { API_ENDPOINTS } from '../constants/api';
import axios from "../config/apiInstance";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [loginUserName, setLoginUserName] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // true when user is logged in

  const navigate = useNavigate();

  // User Registration
  const handleRegister = async () => {
    try {
      await axios.post(API_ENDPOINTS.REGISTER, { userName, userPassword, userEmail });
      navigate('/login');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Server Error');
      console.error(err);
    }
  };

  // User Login
  const handleLogin = async () => {
    try {
      const res = await axios.post(API_ENDPOINTS.LOGIN, { loginPassword, loginUserName });

      // Save Data in Local Storage
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userName', res.data.userData.userName);
      localStorage.setItem('userRole', res.data.userData.role)

      setIsLoggedIn(true);

      // Navigate based on role
      if (res.data.userData.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      setMsg(err.response?.data?.message || 'Server Error. Please try again later.');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    navigate('/');
    
  };

  return (
    <AuthContext.Provider
      value={{
        handleRegister,
        setUserName,
        setUserPassword,
        setUserEmail,
        msg,
        handleLogin,
        setLoginPassword,
        setLoginUserName,
        handleLogout,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
