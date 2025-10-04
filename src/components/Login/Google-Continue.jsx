function GoogleContinue() {
  const handleGoogleLogin = () => {
    console.log("Continue with Google clicked");
    // later: connect to Supabase OAuth
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600 transition w-full max-w-sm"
    >
      Continue with Google
    </button>
  );
}

export default GoogleContinue;
