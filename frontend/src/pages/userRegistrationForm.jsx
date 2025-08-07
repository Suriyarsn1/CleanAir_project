import { useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import Cloud from "../components/cloud";
import RegistrationForm from "../components/registrationForm";

export default function UserRegistration() {
  const { handleRegister, setUserName, setUserPassword, setUserEmail, msg } =
    useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    if (userToken) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-sky-300 to-sky-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Animated Clouds */}
      <Cloud
        className="absolute top-8 left-[-30%] opacity-70 animate-cloud-move sm:left-[-15%]"
        aria-hidden="true"
      />
      <Cloud
        className="absolute top-32 left-[30vw] opacity-60 animate-cloud-move2 sm:left-[25vw]"
        aria-hidden="true"
      />
      <Cloud
        className="absolute top-60 left-[70vw] opacity-60 animate-cloud-move sm:left-[65vw]"
        aria-hidden="true"
      />
      <Cloud
        className="absolute bottom-[25vh] left-[-25%] opacity-80 animate-cloud-move2 sm:left-[-12%]"
        aria-hidden="true"
      />

      {/* Registration Form */}
      <RegistrationForm
        setUserName={setUserName}
        setUserEmail={setUserEmail}
        setUserPassword={setUserPassword}
        handleRegister={handleRegister}
        msg={msg}
      />
    </div>
  );
}
