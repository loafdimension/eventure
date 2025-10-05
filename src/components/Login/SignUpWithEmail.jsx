import { useNavigate } from "react-router-dom";

function SignUpWithEmail() {
  const navigate = useNavigate();

  const handleSignUp = () => {
    console.log("Sign up with Email clicked");
    navigate("/signup");
  };

  return (
    <button
      onClick={handleSignUp}
      className="text-indigo-600 underline hover:text-indigo-800 w-full max-w-sm"
    >
      Sign up with Email
    </button>
  );
}

export default SignUpWithEmail;
