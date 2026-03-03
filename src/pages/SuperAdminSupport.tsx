import React, { useState } from "react";
import SuperAdminLayout from "../components/SuperAdminLayout";
import { MessageSquare, Clock, CheckCircle } from "lucide-react";

const stats = [
  { label: "Open Tickets", value: 2, icon: <MessageSquare className="h-7 w-7 text-red-500" />, color: "bg-red-50", text: "text-red-600" },
  { label: "In Progress", value: 1, icon: <Clock className="h-7 w-7 text-yellow-500" />, color: "bg-yellow-50", text: "text-yellow-600" },
  { label: "Resolved", value: 2, icon: <CheckCircle className="h-7 w-7 text-green-500" />, color: "bg-green-50", text: "text-green-600" },
];

const tickets = [
  { id: "#1042", subject: "Payment gateway issue", restaurant: "Pizza Palace", status: "open", time: "2 hours ago" },
  { id: "#1041", subject: "Menu not updating", restaurant: "Burger Barn", status: "in-progress", time: "5 hours ago" },
  { id: "#1040", subject: "Login problem", restaurant: "Sushi Supreme", status: "resolved", time: "1 day ago" },
  { id: "#1039", subject: "Order sync failed", restaurant: "Taco Town", status: "open", time: "1 day ago" },
  { id: "#1038", subject: "Report generation error", restaurant: "Pasta Paradise", status: "resolved", time: "2 days ago" },
];

import { MoreVertical } from "lucide-react";

function TicketActions({ ticket, onEdit, onResolve, onDelete }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        className="p-2 rounded-full hover:bg-gray-100"
        onClick={() => setOpen((v) => !v)}
        aria-label="Actions"
      >
        <MoreVertical className="h-5 w-5 text-gray-500" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-36 bg-white border rounded shadow-lg z-10">
          <button className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700" onClick={() => { setOpen(false); onEdit(ticket); }}>Edit</button>
          <button className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700" onClick={() => { setOpen(false); onResolve(ticket); }}>Resolve</button>
          <button className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-red-600" onClick={() => { setOpen(false); onDelete(ticket); }}>Delete</button>
        </div>
      )}
    </div>
  );
}

const statusBadge = status => {
  if (status === "open") return <span className="bg-red-50 text-red-500 px-3 py-1 rounded-full text-xs font-bold">open</span>;
  if (status === "in-progress") return <span className="bg-yellow-50 text-yellow-600 px-3 py-1 rounded-full text-xs font-bold">in-progress</span>;
  if (status === "resolved") return <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-bold">resolved</span>;
  return null;
};

export default function SuperAdminSupport() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [ticketList, setTicketList] = useState(tickets);
  const [editModal, setEditModal] = useState({ open: false, ticket: null });
  const [deleteModal, setDeleteModal] = useState({ open: false, ticket: null });

  const filteredTickets = ticketList.filter(ticket => {
    const statusMatch = statusFilter === "all" || ticket.status === statusFilter;
    const searchMatch =
      ticket.subject.toLowerCase().includes(search.toLowerCase()) ||
      ticket.restaurant.toLowerCase().includes(search.toLowerCase());
    return statusMatch && searchMatch;
  });

  function handleEdit(ticket) {
    setEditModal({ open: true, ticket });
  }
  function handleEditSave(subject, restaurant) {
    setTicketList(list =>
      list.map(t =>
        t.id === editModal.ticket.id
          ? { ...t, subject, restaurant }
          : t
      )
    );
    setEditModal({ open: false, ticket: null });
  }
  function handleEditClose() {
    setEditModal({ open: false, ticket: null });
  }

  function handleResolve(ticket) {
    setTicketList(list =>
      list.map(t =>
        t.id === ticket.id ? { ...t, status: "resolved" } : t
      )
    );
  }

  function handleDelete(ticket) {
    setDeleteModal({ open: true, ticket });
  }
  function handleDeleteConfirm() {
    setTicketList(list => list.filter(t => t.id !== deleteModal.ticket.id));
    setDeleteModal({ open: false, ticket: null });
  }
  function handleDeleteClose() {
    setDeleteModal({ open: false, ticket: null });
  }

  return (
    <SuperAdminLayout>
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Support</h1>
        <p className="text-gray-500 mb-8">Manage support tickets and requests</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {stats.map((stat, idx) => (
            <div key={stat.label} className={`rounded-xl shadow flex flex-col items-center justify-center p-8 border ${stat.color}`}>
              {stat.icon}
              <div className={`text-3xl font-extrabold mt-2 ${stat.text}`}>{stat.value}</div>
              <div className="text-md font-semibold text-gray-700 mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row md:items-center mb-4 gap-2">
          <div className="flex items-center">
            <label htmlFor="statusFilter" className="mr-2 font-medium text-gray-700">Status:</label>
            <select
              id="statusFilter"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="border rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring"
            >
              <option value="all">All</option>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
          <div className="flex items-center md:ml-4">
            <label htmlFor="search" className="mr-2 font-medium text-gray-700">Search:</label>
            <input
              id="search"
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Subject or Restaurant"
              className="border rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring"
              style={{ minWidth: 200 }}
            />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 border w-full">
          <table className="w-full text-left rounded overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 font-semibold">TICKET</th>
                <th className="py-3 px-4 font-semibold">SUBJECT</th>
                <th className="py-3 px-4 font-semibold">RESTAURANT</th>
                <th className="py-3 px-4 font-semibold">STATUS</th>
                <th className="py-3 px-4 font-semibold">TIME</th>
                <th className="py-3 px-4 font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((ticket, idx) => (
                <tr key={ticket.id} className="border-b last:border-b-0">
                  <td className="py-4 px-4 font-semibold text-gray-700">{ticket.id}</td>
                  <td className="py-4 px-4 text-gray-900">{ticket.subject}</td>
                  <td className="py-4 px-4 text-gray-700">{ticket.restaurant}</td>
                  <td className="py-4 px-4">{statusBadge(ticket.status)}</td>
                  <td className="py-4 px-4 text-gray-500">{ticket.time}</td>
                  <td className="py-4 px-4">
                    <TicketActions ticket={ticket} onEdit={handleEdit} onResolve={handleResolve} onDelete={handleDelete} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Modal */}
        {editModal.open && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Edit Ticket</h2>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const subject = (form.elements.namedItem('subject') as HTMLInputElement).value;
                  const restaurant = (form.elements.namedItem('restaurant') as HTMLInputElement).value;
                  handleEditSave(subject, restaurant);
                }}
              >
                <div className="mb-4">
                  <label className="block mb-1 font-medium">Subject</label>
                  <input
                    name="subject"
                    defaultValue={editModal.ticket.subject}
                    className="border rounded px-3 py-2 w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 font-medium">Restaurant</label>
                  <input
                    name="restaurant"
                    defaultValue={editModal.ticket.restaurant}
                    className="border rounded px-3 py-2 w-full"
                    required
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button type="button" className="px-4 py-2 rounded bg-gray-200" onClick={handleEditClose}>Cancel</button>
                  <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">Save</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {deleteModal.open && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Delete Ticket</h2>
              <p className="mb-6">Are you sure you want to delete ticket <span className="font-bold">{deleteModal.ticket.id}</span>?</p>
              <div className="flex justify-end gap-2">
                <button type="button" className="px-4 py-2 rounded bg-gray-200" onClick={handleDeleteClose}>Cancel</button>
                <button type="button" className="px-4 py-2 rounded bg-red-600 text-white" onClick={handleDeleteConfirm}>Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </SuperAdminLayout>
  );
}
