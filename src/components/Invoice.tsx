import React, { forwardRef, useState } from "react";

interface InvoiceProps {
  table: number;
  items: { name: string; qty: number; price: number }[];
  subtotal: number;
  tax: number;
  total: number;
}

// Forward ref for print support
export const Invoice = forwardRef<HTMLDivElement, InvoiceProps>(
  ({ table, items, subtotal, tax, total }, ref) => {
    const [showModal, setShowModal] = useState(false);
    const [editTable, setEditTable] = useState(table);
    const [editItems, setEditItems] = useState(items);

    const handleItemChange = (idx: number, field: string, value: any) => {
      setEditItems(prev => prev.map((item, i) => i === idx ? { ...item, [field]: value } : item));
    };

    return (
      <div ref={ref} className="p-6 bg-white w-[350px] text-black rounded shadow-lg relative">
        <h2 className="text-xl font-bold mb-2 text-center">Restaurant Invoice</h2>
        <div className="mb-2 text-sm">Table: <span className="font-semibold">{table}</span></div>
        <table className="w-full text-xs mb-2">
          <thead>
            <tr className="border-b">
              <th className="text-left py-1">Item</th>
              <th className="text-center py-1">Qty</th>
              <th className="text-right py-1">Price</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i}>
                <td className="py-1">{item.name}</td>
                <td className="text-center py-1">{item.qty}</td>
                <td className="text-right py-1">₹{item.qty * item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between text-xs mb-1">
          <span>Subtotal</span>
          <span>₹{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-xs mb-1">
          <span>GST (5%)</span>
          <span>₹{tax.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-base font-bold border-t pt-2 mt-2">
          <span>Total</span>
          <span>₹{total.toLocaleString()}</span>
        </div>
        <div className="text-center text-xs mt-4 text-muted-foreground">Thank you for dining with us!</div>
        <button
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
          onClick={() => setShowModal(true)}
        >
          Modify
        </button>
        {showModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-[350px] relative">
              <h3 className="text-lg font-bold mb-4">Edit Invoice</h3>
              <label className="block mb-2 text-sm font-semibold">Table Number</label>
              <input
                type="number"
                className="w-full border rounded px-2 py-1 mb-4"
                value={editTable}
                onChange={e => setEditTable(Number(e.target.value))}
              />
              <div className="mb-4">
                <label className="block mb-2 text-sm font-semibold">Items</label>
                {editItems.map((item, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <input
                      className="border rounded px-2 py-1 w-1/2"
                      value={item.name}
                      onChange={e => handleItemChange(idx, "name", e.target.value)}
                    />
                    <input
                      type="number"
                      className="border rounded px-2 py-1 w-1/4"
                      value={item.qty}
                      onChange={e => handleItemChange(idx, "qty", Number(e.target.value))}
                    />
                    <input
                      type="number"
                      className="border rounded px-2 py-1 w-1/4"
                      value={item.price}
                      onChange={e => handleItemChange(idx, "price", Number(e.target.value))}
                    />
                  </div>
                ))}
              </div>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded font-semibold hover:bg-green-700 transition mr-2"
                onClick={() => setShowModal(false)}
              >
                Save
              </button>
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded font-semibold hover:bg-gray-600 transition"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
);

Invoice.displayName = "Invoice";
