import { useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import Cloud from "../components/cloud";
import LoginForm from "../components/loginForm";

export default function Login() {
  const {
    handleLogin,
    setLoginUserName,
    setLoginPassword,
    msg,
    loginUserName,
    loginPassword,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    if (userToken) navigate("/");
  }, [navigate]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-sky-300 to-sky-100 flex items-center justify-center px-3 sm:px-6">
      {/* Responsive Animated Clouds */}
      <Cloud className="absolute top-6 left-[-30vw] xs:left-[-20vw] sm:left-[-100px] opacity-70 animate-cloud-move" />
      <Cloud className="absolute top-32 left-[25vw] xs:left-[30vw] opacity-60 animate-cloud-move2" />
      <Cloud className="hidden sm:block absolute top-60 left-[70vw] opacity-60 animate-cloud-move" />
      <Cloud className="absolute bottom-[10vh] left-[-22vw] xs:left-[-10vw] opacity-80 animate-cloud-move2" />

      {/* Login Card */}
      <LoginForm
        handleLogin={handleLogin}
        setLoginUserName={setLoginUserName}
        setLoginPassword={setLoginPassword}
        loginUserName={loginUserName}
        loginPassword={loginPassword}
        msg={msg}
      />

      {/* Custom keyframes for cloud and fade-in animation */}
      <style>
        {`
          @keyframes cloud-move {
            0% { transform: translateX(0);}
            100% { transform: translateX(110vw);}
          }
          @keyframes cloud-move2 {
            0% { transform: translateX(-30vw);}
            100% { transform: translateX(80vw);}
          }
          @keyframes fade-in {
            0% { opacity: 0; transform: translateY(30px) scale(0.98);}
            100% { opacity: 1; transform: translateY(0) scale(1);}
          }
          .fade-in {
            animation: fade-in 0.7s cubic-bezier(0.22,1,0.36,1) both;
          }
          .animate-cloud-move {
            animation: cloud-move 32s linear infinite;
          }
          .animate-cloud-move2 {
            animation: cloud-move2 40s linear infinite;
          }
        `}
      </style>
    </div>
  );
}
