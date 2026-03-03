import React, { useState } from "react";
import SuperAdminLayout from "../components/SuperAdminLayout";
import { BadgeCheck, XCircle, CreditCard } from "lucide-react";

const initialSubscriptions = [
  {
    name: "Taj Palace",
    owner: "Rahul Sharma",
    plan: "Premium",
    status: "Active",
    expiry: "2026-12-31",
  },
  {
    name: "Oberoi Grand",
    owner: "Priya Singh",
    plan: "Standard",
    status: "Inactive",
    expiry: "2026-06-30",
  },
  {
    name: "Leela Ambience",
    owner: "Amit Patel",
    plan: "Premium",
    status: "Active",
    expiry: "2027-03-15",
  },
];

export default function SuperAdminSubscriptions() {
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions);
  const [search, setSearch] = useState("");
  const [renewModal, setRenewModal] = useState(false);
  const [selectedSub, setSelectedSub] = useState(null);
  const [feedback, setFeedback] = useState("");

  const filteredSubs = subscriptions.filter(sub =>
    sub.name.toLowerCase().includes(search.toLowerCase()) ||
    sub.owner.toLowerCase().includes(search.toLowerCase())
  );

  const handleRenew = (sub) => {
    setSelectedSub(sub);
    setRenewModal(true);
    setFeedback("");
  };

  const confirmRenew = () => {
    setSubscriptions(subscriptions.map(s =>
      s === selectedSub ? { ...s, expiry: "2027-12-31", status: "Active" } : s
    ));
    setRenewModal(false);
    setFeedback("Subscription renewed successfully!");
  };

  return (
    <SuperAdminLayout>
      <div className="flex-1 p-10">
        <h1 className="text-2xl font-extrabold text-blue-800 mb-6 flex items-center gap-2">
          <CreditCard className="h-7 w-7 text-blue-600" /> Manage Subscriptions
        </h1>
        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            placeholder="Search by name or owner..."
            className="border rounded px-4 py-2 w-64"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {feedback && <span className="text-green-600 font-semibold">{feedback}</span>}
        </div>
        <div className="bg-white rounded-xl shadow p-6 border mt-2">
          <table className="w-full text-left rounded overflow-hidden">
            <thead className="bg-blue-50">
              <tr>
                <th className="py-3 px-4 font-semibold">Name</th>
                <th className="py-3 px-4 font-semibold">Owner</th>
                <th className="py-3 px-4 font-semibold">Plan</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Expiry</th>
                <th className="py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubs.map((sub, idx) => (
                <tr key={idx} className="border-b last:border-b-0">
                  <td className="py-2 px-4">{sub.name}</td>
                  <td className="py-2 px-4">{sub.owner}</td>
                  <td className="py-2 px-4">
                    <span className={`px-3 py-1 rounded text-white text-xs font-bold ${sub.plan === "Premium" ? "bg-green-600" : "bg-yellow-500"}`}>{sub.plan}</span>
                  </td>
                  <td className="py-2 px-4">
                    {sub.status === "Active" ? (
                      <span className="flex items-center gap-1 text-green-600 font-semibold">
                        <BadgeCheck className="h-4 w-4" /> Active
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-500 font-semibold">
                        <XCircle className="h-4 w-4" /> Inactive
                      </span>
                    )}
                  </td>
                  <td className="py-2 px-4">{sub.expiry}</td>
                  <td className="py-2 px-4">
                    <button className="text-blue-600 font-semibold mr-2" onClick={() => handleRenew(sub)}>Renew</button>
                    <button className="text-red-600 font-semibold">Cancel</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Renew Modal */}
        {renewModal && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 min-w-[320px]">
              <h2 className="text-xl font-bold mb-4">Renew Subscription</h2>
              <p className="mb-4">Renew subscription for <span className="font-semibold">{selectedSub?.name}</span>?</p>
              <div className="flex gap-4 justify-end">
                <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={confirmRenew}>Confirm</button>
                <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => setRenewModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </SuperAdminLayout>
  );
}
