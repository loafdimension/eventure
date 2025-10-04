import { useState } from "react";

function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      {/* login title */}
      <h2 className="text-2xl font-bold text-center">Log In</h2>

      {/* email */}
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

      {/* password */}
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

      {/* log in button */}
      <button
        type="submit"
        className="bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
      >
        Log In
      </button>

      {/* forgotten password */}
      <button type="submit">Forgot password</button>
    </form>
  );
}

export default LoginForm;
