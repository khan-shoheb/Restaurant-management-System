import React, { useState } from "react";
import { Building, Pencil, Trash2, CheckCircle2, XCircle, PlusCircle } from "lucide-react";
import SuperAdminLayout from "../components/SuperAdminLayout";

const initialRestaurants = [
  { id: 1, name: "Taj Palace", owner: "Rahul Sharma", status: "Active", plan: "Premium" },
  { id: 2, name: "Oberoi Grand", owner: "Priya Singh", status: "Inactive", plan: "Standard" },
  { id: 3, name: "Leela Ambience", owner: "Amit Patel", status: "Active", plan: "Premium" },
];

export default function SuperAdminRestaurants() {
  const [restaurants, setRestaurants] = useState(initialRestaurants);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", owner: "", plan: "Standard" });
  const [editId, setEditId] = useState(null);

  function handleInput(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  function handleAdd(e) {
    e.preventDefault();
    if (!form.name || !form.owner) return;
    setRestaurants([
      ...restaurants,
      { id: Date.now(), name: form.name, owner: form.owner, status: "Active", plan: form.plan },
    ]);
    setForm({ name: "", owner: "", plan: "Standard" });
    setShowModal(false);
  }

  function handleEdit(id) {
    const r = restaurants.find(r => r.id === id);
    setForm({ name: r.name, owner: r.owner, plan: r.plan });
    setEditId(id);
    setShowModal(true);
  }

  function handleSave(e) {
    e.preventDefault();
    setRestaurants(restaurants.map(r =>
      r.id === editId ? { ...r, name: form.name, owner: form.owner, plan: form.plan } : r
    ));
    setEditId(null);
    setForm({ name: "", owner: "", plan: "Standard" });
    setShowModal(false);
  }

  function handleDelete(id) {
    setRestaurants(restaurants.filter(r => r.id !== id));
  }

  function handleToggleStatus(id) {
    setRestaurants(restaurants.map(r =>
      r.id === id ? { ...r, status: r.status === "Active" ? "Inactive" : "Active" } : r
    ));
  }

  return (
    <SuperAdminLayout>
      <div className="p-10">
      <div className="flex items-center gap-3 mb-8">
        <Building className="h-8 w-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-blue-800">Manage Restaurants</h1>
        <button className="ml-auto bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow hover:bg-blue-700" onClick={() => setShowModal(true)}>
          <PlusCircle className="h-5 w-5" /> Add Restaurant
        </button>
      </div>
      <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <thead className="bg-blue-50">
          <tr>
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">Owner</th>
            <th className="py-3 px-4 text-left">Plan</th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map(r => (
            <tr key={r.id} className="border-t">
              <td className="py-2 px-4 font-semibold">{r.name}</td>
              <td className="py-2 px-4">{r.owner}</td>
              <td className="py-2 px-4">
                <span className={`px-2 py-1 rounded text-xs font-bold ${r.plan === "Premium" ? "bg-green-500 text-white" : "bg-yellow-400 text-black"}`}>{r.plan}</span>
              </td>
              <td className="py-2 px-4">
                {r.status === "Active" ? (
                  <span className="flex items-center gap-1 text-green-600 font-bold"><CheckCircle2 className="h-4 w-4" /> Active</span>
                ) : (
                  <span className="flex items-center gap-1 text-red-500 font-bold"><XCircle className="h-4 w-4" /> Inactive</span>
                )}
              </td>
              <td className="py-2 px-4 flex gap-2">
                <button className="text-blue-600 hover:underline flex items-center gap-1" onClick={() => handleEdit(r.id)}><Pencil className="h-4 w-4" /> Edit</button>
                <button className="text-red-600 hover:underline flex items-center gap-1" onClick={() => handleDelete(r.id)}><Trash2 className="h-4 w-4" /> Delete</button>
                <button className="text-gray-600 hover:underline flex items-center gap-1" onClick={() => handleToggleStatus(r.id)}>
                  {r.status === "Active" ? <XCircle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
                  {r.status === "Active" ? "Deactivate" : "Activate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal for Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl" onClick={() => { setShowModal(false); setEditId(null); }}>&times;</button>
            <h2 className="text-xl font-bold mb-4">{editId ? "Edit Restaurant" : "Add Restaurant"}</h2>
            <form onSubmit={editId ? handleSave : handleAdd} className="flex flex-col gap-3">
              <input type="text" name="name" placeholder="Restaurant Name" className="border rounded-lg px-3 py-2" value={form.name} onChange={handleInput} required />
              <input type="text" name="owner" placeholder="Owner Name" className="border rounded-lg px-3 py-2" value={form.owner} onChange={handleInput} required />
              <select name="plan" className="border rounded-lg px-3 py-2" value={form.plan} onChange={handleInput} required>
                <option value="Premium">Premium</option>
                <option value="Standard">Standard</option>
              </select>
              <div className="flex gap-3 mt-4">
                <button type="submit" className="bg-blue-600 text-white rounded-lg px-4 py-2 font-medium shadow hover:bg-blue-700 transition">{editId ? "Save Changes" : "Add Restaurant"}</button>
                <button type="button" className="bg-gray-200 text-gray-700 rounded-lg px-4 py-2 font-medium shadow hover:bg-gray-300 transition" onClick={() => { setShowModal(false); setEditId(null); }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
      </div>
    </SuperAdminLayout>
  );
}
