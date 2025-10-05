import { useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import Slogan from "../components/Login/Slogan";
import LoginForm from "../components/Login/Login-Form";
import GoogleContinue from "../components/Login/Google-Continue";
import SignUpWithEmail from "../components/Login/SignUpWithEmail";

function Login() {
  const [userProfile, setUserProfile] = useState(null);

  // This will be called by LoginForm after successful login
  const handleLogin = (user, profile) => {
    setUserProfile(profile);
    console.log("User logged in:", user);
    console.log("Profile:", profile);
    // Here you can redirect to dashboard or store user in context
  };

  return (
    <>
      <NavBar />
      <div className="flex flex-col min-h-screen p-3">
        {/* Top section: Logo + Slogan */}
        <div className="flex flex-col items-center mb-12">
          <Slogan />
        </div>

        {/* Middle section: two columns */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left column: Google + Sign Up */}
          <div className="flex-1 flex flex-col justify-center items-center gap-4">
            <GoogleContinue />
            <p>No account? No problem!</p>
            <SignUpWithEmail />
          </div>

          {/* Right column: Login Form */}
          <div className="flex-1 flex justify-center items-center">
            <LoginForm onLogin={handleLogin} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
