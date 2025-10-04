function SignUpWithEmail() {
  const handleSignUp = () => {
    console.log("Sign up with Email clicked");
    // later: redirect to sign up page or open modal
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
