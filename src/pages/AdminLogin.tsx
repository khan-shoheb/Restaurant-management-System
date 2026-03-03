import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DEMO_ADMIN = { username: "admin", password: "demo123" };
const DEMO_SUPERADMIN = { username: "superadmin", password: "super123" };
const HOTEL_IMAGE = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      role === "admin" &&
      username.trim() === DEMO_ADMIN.username &&
      password.trim() === DEMO_ADMIN.password
    ) {
      localStorage.setItem("isAdmin", "true");
      localStorage.setItem("userRole", "admin");
      window.location.href = "/";
    } else if (
      role === "superadmin" &&
      username.trim() === DEMO_SUPERADMIN.username &&
      password.trim() === DEMO_SUPERADMIN.password
    ) {
      localStorage.setItem("isSuperAdmin", "true");
      localStorage.setItem("userRole", "superadmin");
      window.location.href = "/";
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <img
        src={HOTEL_IMAGE}
        alt="5-star hotel background"
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ filter: "brightness(0.6) blur(2px)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white/60 to-blue-300 z-10" />
      <form onSubmit={handleSubmit} className="relative z-20 bg-white/90 p-8 rounded-2xl shadow-2xl w-full max-w-sm border border-blue-200 animate-fade-in backdrop-blur-md">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-600 text-white rounded-full p-3 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 19.125V18a6.75 6.75 0 0113.5 0v1.125A2.625 2.625 0 0115.375 21.75H8.625A2.625 2.625 0 014.5 19.125z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-1 text-blue-700 tracking-wide">Login</h2>
          <div className="flex gap-2 mb-2">
            <label className="flex items-center gap-1">
              <input type="radio" name="role" value="admin" checked={role === "admin"} onChange={() => setRole("admin")} /> Admin
            </label>
            <label className="flex items-center gap-1">
              <input type="radio" name="role" value="superadmin" checked={role === "superadmin"} onChange={() => setRole("superadmin")} /> Super Admin
            </label>
          </div>
          {role === "admin" ? (
            <>
              <div className="text-xs text-gray-500">Demo Username: <span className="font-semibold text-blue-600">admin</span></div>
              <div className="text-xs text-gray-500 mb-2">Demo Password: <span className="font-semibold text-blue-600">demo123</span></div>
            </>
          ) : (
            <>
              <div className="text-xs text-gray-500">Demo Username: <span className="font-semibold text-blue-600">superadmin</span></div>
              <div className="text-xs text-gray-500 mb-2">Demo Password: <span className="font-semibold text-blue-600">super123</span></div>
            </>
          )}
        </div>
        {error && <div className="mb-4 text-red-600 text-sm text-center">{error}</div>}
        <div className="mb-4">
          <label className="block mb-1 font-semibold text-gray-700">Username</label>
          <input
            type="text"
            className="w-full border border-blue-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            placeholder="Enter username"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-semibold text-gray-700">Password</label>
          <input
            type="password"
            className="w-full border border-blue-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            placeholder="Enter password"
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
