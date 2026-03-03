import React, { useState } from "react";
import { UserCog } from "lucide-react";

const initialProfile = {
  name: "Admin User",
  email: "admin@restrohub.com",
  role: "Super Admin",
  photo: "https://randomuser.me/api/portraits/men/32.jpg",
};

const MyProfile = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [editName, setEditName] = useState(profile.name);
  const [editPassword, setEditPassword] = useState("");
  const [editPhoto, setEditPhoto] = useState(profile.photo);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile({ ...profile, name: editName, photo: editPhoto });
    setEditPassword("");
    alert("Profile updated!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-300">
      <div className="bg-white/90 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-blue-200 animate-fade-in backdrop-blur-md">
        <div className="flex flex-col items-center mb-6">
          <img src={profile.photo} alt="Profile" className="h-20 w-20 rounded-full object-cover border-4 border-blue-600 mb-2" />
          <h2 className="text-xl font-bold text-blue-700 mb-1">{profile.name}</h2>
          <div className="text-sm text-gray-600 mb-1">{profile.email}</div>
          <div className="flex items-center gap-1 text-xs font-semibold text-blue-600 mb-2">
            <UserCog className="h-4 w-4" />
            {profile.role}
          </div>
        </div>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Edit Name</label>
            <input
              type="text"
              className="w-full border border-blue-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              value={editName}
              onChange={e => setEditName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Change Password</label>
            <input
              type="password"
              className="w-full border border-blue-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              value={editPassword}
              onChange={e => setEditPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Update Profile Photo (URL)</label>
            <input
              type="text"
              className="w-full border border-blue-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              value={editPhoto}
              onChange={e => setEditPhoto(e.target.value)}
              placeholder="Paste image URL"
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
