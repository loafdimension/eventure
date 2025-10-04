import { redirect } from "react-router";
import { supabase } from "../../../supabaseClient";

function GoogleContinue() {
  const handleGoogleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:5173/auth/v1/callback",
      },
    });

    if (error) {
      console.error("Google login error:", error.message);
    } else {
      console.log("Redirecting to Google OAuth...");
    }
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
