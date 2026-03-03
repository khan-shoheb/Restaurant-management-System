import React, { useState } from "react";
import SuperAdminLayout from "../components/SuperAdminLayout";
import { User, BadgeCheck, XCircle, Search, Shield, MoreVertical } from "lucide-react";

const initialUsers = [
  { name: "John Smith", email: "john@example.com", role: "Admin", restaurant: "Pizza Palace", status: "active" },
  { name: "Sarah Johnson", email: "sarah@example.com", role: "Owner", restaurant: "Burger Barn", status: "active" },
  { name: "Mike Chen", email: "mike@example.com", role: "Manager", restaurant: "Sushi Supreme", status: "active" },
  { name: "Emily Davis", email: "emily@example.com", role: "Owner", restaurant: "Taco Town", status: "inactive" },
  { name: "Robert Wilson", email: "robert@example.com", role: "Admin", restaurant: "Pasta Paradise", status: "active" },
];

export default function SuperAdminUsers() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalUser, setModalUser] = useState(null);
  const [showMenu, setShowMenu] = useState(null);
  const [permission, setPermission] = useState("");
  const [editForm, setEditForm] = useState({ name: "", email: "", role: "", restaurant: "", status: "active" });
  const [showDelete, setShowDelete] = useState(false);

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SuperAdminLayout>
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Users</h1>
        <p className="text-gray-500 mb-8">Manage system users and permissions</p>
        <div className="flex justify-end mb-4">
          <input
            type="text"
            placeholder="Search users..."
            className="border rounded px-4 py-2 w-72"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="bg-white rounded-xl shadow p-6 border">
          <table className="w-full text-left rounded overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 font-semibold">USER</th>
                <th className="py-3 px-4 font-semibold">ROLE</th>
                <th className="py-3 px-4 font-semibold">RESTAURANT</th>
                <th className="py-3 px-4 font-semibold">STATUS</th>
                <th className="py-3 px-4 font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, idx) => (
                <tr key={idx} className="border-b last:border-b-0">
                  <td className="py-4 px-4 flex items-center gap-4">
                    <span className="bg-purple-100 rounded-full p-2">
                      <User className="h-7 w-7 text-purple-400" />
                    </span>
                    <div>
                      <div className="font-bold text-gray-900">{user.name}</div>
                      <div className="text-gray-500 text-sm">{user.email}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="flex items-center gap-2 text-gray-700 font-semibold">
                      <Shield className="h-5 w-5 text-yellow-500" /> {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-700">{user.restaurant}</td>
                  <td className="py-4 px-4">
                    {user.status === "active" ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">active</span>
                    ) : (
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold">inactive</span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="relative inline-block text-left">
                      <button className="p-2 hover:bg-gray-100 rounded-full" onClick={() => setShowMenu(idx)}>
                        <MoreVertical className="h-5 w-5 text-gray-400" />
                      </button>
                      {showMenu === idx && (
                        <div className="absolute right-0 mt-2 w-36 bg-white border rounded shadow-lg z-10">
                          <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => { setModalUser(user); setShowModal(true); setShowMenu(null); }}>Edit</button>
                          <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => { setModalUser(user); setShowDelete(true); setShowMenu(null); }}>Delete</button>
                          <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => { setPermission(user.role); setShowMenu(null); }}>Permissions</button>
                        </div>
                      )}
                    </div>
                        {/* User Modal */}
                        {showModal && (
                          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg shadow-lg p-8 min-w-[400px]">
                              <h2 className="text-xl font-bold mb-6 text-left">Edit User</h2>
                              <form onSubmit={e => {
                                e.preventDefault();
                                setUsers(users.map(u => u.email === modalUser.email ? editForm : u));
                                setShowModal(false);
                              }}>
                                <div className="flex flex-col gap-4">
                                  <div className="flex flex-col items-start">
                                    <label className="block text-sm font-semibold mb-1">Name</label>
                                    <input className="border rounded px-3 py-2 w-full" value={editForm.name} onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))} required />
                                  </div>
                                  <div className="flex flex-col items-start">
                                    <label className="block text-sm font-semibold mb-1">Email</label>
                                    <input className="border rounded px-3 py-2 w-full" value={editForm.email} onChange={e => setEditForm(f => ({ ...f, email: e.target.value }))} required />
                                  </div>
                                  <div className="flex flex-col items-start">
                                    <label className="block text-sm font-semibold mb-1">Role</label>
                                    <select className="border rounded px-3 py-2 w-full" value={editForm.role} onChange={e => setEditForm(f => ({ ...f, role: e.target.value }))}>
                                      <option>Admin</option>
                                      <option>Owner</option>
                                      <option>Manager</option>
                                    </select>
                                  </div>
                                  <div className="flex flex-col items-start">
                                    <label className="block text-sm font-semibold mb-1">Restaurant</label>
                                    <input className="border rounded px-3 py-2 w-full" value={editForm.restaurant} onChange={e => setEditForm(f => ({ ...f, restaurant: e.target.value }))} />
                                  </div>
                                  <div className="flex flex-col items-start">
                                    <label className="block text-sm font-semibold mb-1">Status</label>
                                    <select className="border rounded px-3 py-2 w-full" value={editForm.status} onChange={e => setEditForm(f => ({ ...f, status: e.target.value }))}>
                                      <option value="active">Active</option>
                                      <option value="inactive">Inactive</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="flex gap-4 justify-end mt-8">
                                  <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">Save</button>
                                  <button type="button" className="bg-gray-300 px-4 py-2 rounded" onClick={() => setShowModal(false)}>Cancel</button>
                                </div>
                              </form>
                            </div>
                          </div>
                        )}
                        {/* Permissions Modal */}
                        {permission && (
                          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg shadow-lg p-8 min-w-[340px]">
                              <h2 className="text-xl font-bold mb-4">Permissions</h2>
                              <p className="mb-4">Role: <span className="font-semibold">{permission}</span></p>
                              <div className="mb-3">
                                <label className="block text-sm font-semibold mb-1">Can Edit Users</label>
                                <input type="checkbox" className="mr-2" defaultChecked={permission === "Admin"} />
                              </div>
                              <div className="mb-3">
                                <label className="block text-sm font-semibold mb-1">Can Delete Users</label>
                                <input type="checkbox" className="mr-2" defaultChecked={permission === "Admin" || permission === "Owner"} />
                              </div>
                              <div className="flex gap-4 justify-end mt-4">
                                <button className="bg-yellow-600 text-white px-4 py-2 rounded" onClick={() => setPermission("")}>Close</button>
                              </div>
                            </div>
                          </div>
                        )}
                        {/* Delete Modal */}
                        {showDelete && (
                          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg shadow-lg p-8 min-w-[340px]">
                              <h2 className="text-xl font-bold mb-4">Delete User</h2>
                              <p className="mb-4">Are you sure you want to delete <span className="font-semibold">{modalUser?.name}</span>?</p>
                              <div className="flex gap-4 justify-end">
                                <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={() => { setUsers(users.filter(u => u.email !== modalUser.email)); setShowDelete(false); }}>Delete</button>
                                <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => setShowDelete(false)}>Cancel</button>
                              </div>
                            </div>
                          </div>
                        )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SuperAdminLayout>
  );
}
