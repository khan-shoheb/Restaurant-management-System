import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Plus, Phone, Mail, Star, MoreVertical } from "lucide-react";
import { useState } from "react";

const customers = [
  { name: "Rahul Sharma", email: "rahul@email.com", phone: "+91 98765 43210", visits: 32, totalSpent: "₹24,500", lastVisit: "Today", vip: true },
  { name: "Priya Singh", email: "priya@email.com", phone: "+91 87654 32109", visits: 18, totalSpent: "₹12,800", lastVisit: "Yesterday", vip: false },
  { name: "Amit Patel", email: "amit@email.com", phone: "+91 76543 21098", visits: 45, totalSpent: "₹38,200", lastVisit: "2 days ago", vip: true },
  { name: "Neha Gupta", email: "neha@email.com", phone: "+91 65432 10987", visits: 12, totalSpent: "₹8,400", lastVisit: "1 week ago", vip: false },
  { name: "Vikram Joshi", email: "vikram@email.com", phone: "+91 54321 09876", visits: 28, totalSpent: "₹19,600", lastVisit: "3 days ago", vip: true },
  { name: "Sneha Reddy", email: "sneha@email.com", phone: "+91 43210 98765", visits: 8, totalSpent: "₹5,200", lastVisit: "2 weeks ago", vip: false },
];

const CRM = () => {
      const [menuOpenIdx, setMenuOpenIdx] = useState(null);
      const handleMenuOpen = (idx) => setMenuOpenIdx(idx);
      const handleMenuClose = () => setMenuOpenIdx(null);
      const [editIdx, setEditIdx] = useState(null);
      const [viewIdx, setViewIdx] = useState(null);
      const handleEdit = (idx) => { setEditIdx(idx); handleMenuClose(); };
      const handleDelete = (idx) => {
        setCustomerList(customerList.filter((_, i) => i !== idx));
        handleMenuClose();
      };
      const handleView = (idx) => { setViewIdx(idx); handleMenuClose(); };
      const handleEditModalClose = () => setEditIdx(null);
      const handleViewModalClose = () => setViewIdx(null);
      const handleEditFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCustomerList(list => list.map((c, i) => i === editIdx ? { ...c, [name]: type === "checkbox" ? checked : value } : c));
      };
    const [showModal, setShowModal] = useState(false);
    const [newCustomer, setNewCustomer] = useState({
      name: "",
      email: "",
      phone: "",
      visits: 0,
      totalSpent: "₹0",
      lastVisit: "Today",
      vip: false
    });
    const [customerList, setCustomerList] = useState(customers);

    const handleAddCustomer = () => setShowModal(true);
    const handleModalClose = () => {
      setShowModal(false);
      setNewCustomer({ name: "", email: "", phone: "", visits: 0, totalSpent: "₹0", lastVisit: "Today", vip: false });
    };
    const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;
      setNewCustomer((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    };
    const handleFormSubmit = (e) => {
      e.preventDefault();
      setCustomerList([...customerList, newCustomer]);
      handleModalClose();
    };
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Customer Management</h1>
            <p className="text-muted-foreground">{customerList.length} registered customers</p>
          </div>
          <Button className="gradient-warm text-primary-foreground gap-2" onClick={handleAddCustomer}>
            <Plus className="h-4 w-4" /> Add Customer
          </Button>
        </div>

        {/* Modal for Add Customer */}
                {/* Edit Customer Modal */}
                {editIdx !== null && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[350px] relative">
                      <button className="absolute top-2 right-2 text-gray-500 hover:text-black" onClick={handleEditModalClose} aria-label="Close">×</button>
                      <h2 className="text-lg font-bold mb-4">Edit Customer</h2>
                      <form className="space-y-3">
                        <input name="name" value={customerList[editIdx].name} onChange={handleEditFormChange} placeholder="Name" className="w-full border rounded px-2 py-1" required />
                        <input name="email" value={customerList[editIdx].email} onChange={handleEditFormChange} placeholder="Email" className="w-full border rounded px-2 py-1" required />
                        <input name="phone" value={customerList[editIdx].phone} onChange={handleEditFormChange} placeholder="Phone" className="w-full border rounded px-2 py-1" required />
                        <input name="visits" type="number" value={customerList[editIdx].visits} onChange={handleEditFormChange} placeholder="Visits" className="w-full border rounded px-2 py-1" min="0" />
                        <input name="totalSpent" value={customerList[editIdx].totalSpent} onChange={handleEditFormChange} placeholder="Total Spent (₹)" className="w-full border rounded px-2 py-1" />
                        <label className="flex items-center gap-2">
                          <input type="checkbox" name="vip" checked={customerList[editIdx].vip} onChange={handleEditFormChange} /> VIP Customer
                        </label>
                        <button type="button" className="w-full bg-orange-500 text-white py-2 rounded" onClick={handleEditModalClose}>Close</button>
                      </form>
                    </div>
                  </div>
                )}

                {/* View Details Modal */}
                {viewIdx !== null && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[350px] relative">
                      <button className="absolute top-2 right-2 text-gray-500 hover:text-black" onClick={handleViewModalClose} aria-label="Close">×</button>
                      <h2 className="text-lg font-bold mb-4">Customer Details</h2>
                      <div className="space-y-2">
                        <div><b>Name:</b> {customerList[viewIdx].name}</div>
                        <div><b>Email:</b> {customerList[viewIdx].email}</div>
                        <div><b>Phone:</b> {customerList[viewIdx].phone}</div>
                        <div><b>Visits:</b> {customerList[viewIdx].visits}</div>
                        <div><b>Total Spent:</b> {customerList[viewIdx].totalSpent}</div>
                        <div><b>Last Visit:</b> {customerList[viewIdx].lastVisit}</div>
                        <div><b>VIP:</b> {customerList[viewIdx].vip ? "Yes" : "No"}</div>
                      </div>
                      <button type="button" className="w-full bg-orange-500 text-white py-2 rounded mt-4" onClick={handleViewModalClose}>Close</button>
                    </div>
                  </div>
                )}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[350px] relative">
              <button className="absolute top-2 right-2 text-gray-500 hover:text-black" onClick={handleModalClose} aria-label="Close">×</button>
              <h2 className="text-lg font-bold mb-4">Add Customer</h2>
              <form onSubmit={handleFormSubmit} className="space-y-3">
                <input name="name" value={newCustomer.name} onChange={handleInputChange} placeholder="Name" className="w-full border rounded px-2 py-1" required />
                <input name="email" value={newCustomer.email} onChange={handleInputChange} placeholder="Email" className="w-full border rounded px-2 py-1" required />
                <input name="phone" value={newCustomer.phone} onChange={handleInputChange} placeholder="Phone" className="w-full border rounded px-2 py-1" required />
                <input name="visits" type="number" value={newCustomer.visits} onChange={handleInputChange} placeholder="Visits" className="w-full border rounded px-2 py-1" min="0" />
                <input name="totalSpent" value={newCustomer.totalSpent} onChange={handleInputChange} placeholder="Total Spent (₹)" className="w-full border rounded px-2 py-1" />
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="vip" checked={newCustomer.vip} onChange={handleInputChange} /> VIP Customer
                </label>
                <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded">Add</button>
              </form>
            </div>
          </div>
        )}

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search customers..." className="pl-9" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {customerList.map((customer, idx) => (
            <Card key={customer.name + customer.email} className="shadow-card hover:shadow-elevated transition-shadow animate-scale-in">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full gradient-warm flex items-center justify-center text-sm font-bold text-primary-foreground">
                      {customer.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{customer.name}</h3>
                        {customer.vip && (
                          <Star className="h-3.5 w-3.5 fill-warning text-warning" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">Last visit: {customer.lastVisit}</p>
                    </div>
                  </div>
                  <div className="relative">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleMenuOpen(idx)}>
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                    {menuOpenIdx === idx && (
                      <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
                        <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => handleEdit(idx)}>Edit</button>
                        <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => handleDelete(idx)}>Delete</button>
                        <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => handleView(idx)}>View Details</button>
                        <button className="block w-full text-left px-4 py-2 text-red-500" onClick={handleMenuClose}>Close</button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-3.5 w-3.5" />
                    <span>{customer.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-3.5 w-3.5" />
                    <span>{customer.phone}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t flex justify-between">
                  <div className="text-center">
                    <p className="text-lg font-bold">{customer.visits}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Visits</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold">{customer.totalSpent}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Total Spent</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold">₹{customer.visits > 0 ? Math.round(parseInt(customer.totalSpent.replace(/[₹,]/g, "")) / customer.visits) : 0}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Avg Order</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CRM;
