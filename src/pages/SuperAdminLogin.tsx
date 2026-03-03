
import React, { useState } from "react";

export default function SuperAdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    // Simple demo: username = superadmin, password = 1234
    if (username === "superadmin" && password === "1234") {
      localStorage.setItem("userRole", "superadmin");
      window.location.href = "/superadmin-dashboard";
    } else {
      setError("Incorrect username or password. Please try again.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow w-full max-w-sm">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Super Admin Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="border rounded-lg px-3 py-2"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border rounded-lg px-3 py-2"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-lg px-4 py-2 font-medium shadow hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-gray-600 text-sm">
          <p>For Super Admin only. Username: <b>superadmin</b>, Password: <b>1234</b></p>
        </div>
      </div>
    </div>
  );
}
