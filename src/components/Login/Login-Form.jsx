import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../supabaseClient";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Sign in the user with Supabase Auth
    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (signInError) {
      setError(signInError.message);
      return;
    }

    const user = signInData.user;
    if (!user) {
      setError("User not found");
      return;
    }

    // Check if a profile already exists
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError && profileError.code !== "PGRST116") {
      // PGRST116 = no rows found
      setError(profileError.message);
      return;
    }

    // If no profile exists, create one
    if (!profile) {
      const { data: newProfile, error: newProfileError } = await supabase
        .from("profiles")
        .insert([{ id: user.id, username: user.email }])
        .select()
        .single();

      if (newProfileError) {
        setError(newProfileError.message);
        return;
      }

      console.log("Created new profile:", newProfile);
    } else {
      console.log("Found profile:", profile);
    }

    // Redirect to home page
    navigate("/"); // <-- redirect after login
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-sm p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold text-center mb-4">Log In</h2>

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="flex gap-4 items-center mt-2">
        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
        >
          Log In
        </button>
        <button
          type="button"
          className="text-indigo-600 underline hover:text-indigo-800"
        >
          Forgot Password?
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
