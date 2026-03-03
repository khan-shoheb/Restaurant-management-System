import React, { useState } from "react";
import { UserCog, User, Users, ShieldCheck, ChefHat, DollarSign } from "lucide-react";

const initialUsers = [
  { id: 1, username: "admin", role: "admin" },
  { id: 2, username: "manager", role: "manager" },
  { id: 3, username: "staff", role: "staff" },
  { id: 4, username: "cashier", role: "cashier" },
  { id: 5, username: "chef", role: "chef" },
];

const roles = ["admin", "manager", "cashier", "chef", "staff"];
const roleColors = {
  admin: "bg-blue-600 text-white",
  manager: "bg-green-500 text-white",
  cashier: "bg-purple-500 text-white",
  chef: "bg-orange-400 text-white",
  staff: "bg-yellow-400 text-black",
};
const roleIcons = {
  admin: <ShieldCheck className="inline-block mr-1 h-4 w-4" />,
  manager: <UserCog className="inline-block mr-1 h-4 w-4" />,
  cashier: <DollarSign className="inline-block mr-1 h-4 w-4" />,
  chef: <ChefHat className="inline-block mr-1 h-4 w-4" />,
  staff: <User className="inline-block mr-1 h-4 w-4" />,
};
const rolePermissions = {
  admin: "Full access to all modules",
  manager: "Billing, Reports, Staff management",
  cashier: "Orders, Billing",
  chef: "Recipe, Inventory",
  staff: "Orders only",
};

const AdminUsers = () => {
  const [users, setUsers] = useState(initialUsers);
  const [newUsername, setNewUsername] = useState("");
  const [newRole, setNewRole] = useState("staff");

  const addUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername) return;
    setUsers([...users, { id: Date.now(), username: newUsername, role: newRole }]);
    setNewUsername("");
    setNewRole("staff");
  };

  const changeRole = (id: number, role: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, role } : u));
  };

  const removeUser = (id: number) => {
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-300">
      <div className="bg-white/90 p-8 rounded-2xl shadow-2xl w-full max-w-xl border border-blue-200 animate-fade-in backdrop-blur-md">
        <div className="flex items-center gap-2 mb-6">
          <Users className="h-8 w-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-blue-700">Manage Users</h2>
        </div>
        <form onSubmit={addUser} className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Username"
            value={newUsername}
            onChange={e => setNewUsername(e.target.value)}
            className="border px-3 py-2 rounded w-1/2 focus:outline-none focus:border-blue-500"
          />
          <select
            value={newRole}
            onChange={e => setNewRole(e.target.value)}
            className="border px-3 py-2 rounded w-1/3 focus:outline-none focus:border-blue-500"
          >
            {roles.map(r => <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>)}
          </select>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition">Add Staff</button>
        </form>
        <table className="w-full text-sm border rounded overflow-hidden shadow">
          <thead>
            <tr className="bg-blue-50">
              <th className="py-2">Username</th>
              <th>Role</th>
              <th>Change Role</th>
              <th>Permissions</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-t hover:bg-blue-50 transition">
                <td className="py-2 font-semibold flex items-center gap-2">
                  {roleIcons[user.role]}
                  {user.username}
                </td>
                <td>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${roleColors[user.role]}`}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </td>
                <td>
                  <select
                    value={user.role}
                    onChange={e => changeRole(user.id, e.target.value)}
                    className="border px-2 py-1 rounded focus:outline-none focus:border-blue-500"
                  >
                    {roles.map(r => <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>)}
                  </select>
                </td>
                <td>
                  <span className="text-xs text-gray-700 font-medium">{rolePermissions[user.role]}</span>
                </td>
                <td>
                  <button
                    onClick={() => removeUser(user.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded font-semibold hover:bg-red-700 transition"
                  >Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
