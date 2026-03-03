import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Plus, Search, AlertTriangle, Package } from "lucide-react";
import React from "react";
import { StatCard } from "@/components/StatCard";
import { useState } from "react";

const initialItems = [
  { name: "Chicken", unit: "kg", stock: 25, minStock: 10, maxStock: 50, category: "Meat", lastUpdated: "Today" },
  { name: "Paneer", unit: "kg", stock: 8, minStock: 5, maxStock: 30, category: "Dairy", lastUpdated: "Today" },
  { name: "Basmati Rice", unit: "kg", stock: 45, minStock: 20, maxStock: 100, category: "Grains", lastUpdated: "Yesterday" },
  { name: "Wheat Flour", unit: "kg", stock: 3, minStock: 10, maxStock: 50, category: "Grains", lastUpdated: "2 days ago" },
  { name: "Cooking Oil", unit: "L", stock: 12, minStock: 5, maxStock: 25, category: "Oils", lastUpdated: "Today" },
  { name: "Tomatoes", unit: "kg", stock: 15, minStock: 10, maxStock: 40, category: "Vegetables", lastUpdated: "Today" },
  { name: "Onions", unit: "kg", stock: 20, minStock: 15, maxStock: 50, category: "Vegetables", lastUpdated: "Yesterday" },
  { name: "Cream", unit: "L", stock: 2, minStock: 3, maxStock: 15, category: "Dairy", lastUpdated: "3 days ago" },
  { name: "Spice Mix", unit: "kg", stock: 6, minStock: 2, maxStock: 10, category: "Spices", lastUpdated: "Today" },
  { name: "Yogurt", unit: "L", stock: 10, minStock: 5, maxStock: 20, category: "Dairy", lastUpdated: "Today" },
];

const Inventory = () => {
    const [restockModal, setRestockModal] = useState({ open: false, index: null });
    const [restockQty, setRestockQty] = useState(0);

    const handleRestockOpen = (idx, currentQty) => {
      setRestockModal({ open: true, index: idx });
      setRestockQty(currentQty);
    };
    const handleRestockClose = () => {
      setRestockModal({ open: false, index: null });
      setRestockQty(0);
    };
    const handleRestockSubmit = (e) => {
      e.preventDefault();
      if (restockModal.index !== null) {
        const updated = [...items];
        updated[restockModal.index].stock = restockQty;
        updated[restockModal.index].lastUpdated = "Today";
        setItems(updated);
      }
      handleRestockClose();
    };
  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    unit: "",
    stock: 0,
    minStock: 0,
    maxStock: 0,
    category: "",
    lastUpdated: "Today"
  });
  const [items, setItems] = useState(initialItems);

  const handleAddStock = () => {
    setShowModal(true);
  };
  const handleModalClose = () => {
    setShowModal(false);
    setNewItem({ name: "", unit: "", stock: 0, minStock: 0, maxStock: 0, category: "", lastUpdated: "Today" });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: name === "stock" || name === "minStock" || name === "maxStock" ? Number(value) : value }));
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setItems([...items, newItem]);
    handleModalClose();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Inventory</h1>
            <p className="text-muted-foreground">Track stock levels and supplies</p>
          </div>
          <Button className="gradient-warm text-primary-foreground gap-2" onClick={handleAddStock}>
            <Plus className="h-4 w-4" /> Add Stock
          </Button>
        </div>

        {/* Modal for Add Stock */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[350px] relative">
              <button className="absolute top-2 right-2 text-gray-500 hover:text-black" onClick={handleModalClose} aria-label="Close">×</button>
              <h2 className="text-lg font-bold mb-4">Add Stock Item</h2>
              <form onSubmit={handleFormSubmit} className="space-y-3">
                <input name="name" value={newItem.name} onChange={handleInputChange} placeholder="Item Name" className="w-full border rounded px-2 py-1" required />
                <input name="unit" value={newItem.unit} onChange={handleInputChange} placeholder="Unit (kg/L)" className="w-full border rounded px-2 py-1" required />
                <input name="stock" type="number" value={newItem.stock} onChange={handleInputChange} placeholder="Stock" className="w-full border rounded px-2 py-1" required />
                <input name="minStock" type="number" value={newItem.minStock} onChange={handleInputChange} placeholder="Min Stock" className="w-full border rounded px-2 py-1" required />
                <input name="maxStock" type="number" value={newItem.maxStock} onChange={handleInputChange} placeholder="Max Stock" className="w-full border rounded px-2 py-1" required />
                <input name="category" value={newItem.category} onChange={handleInputChange} placeholder="Category" className="w-full border rounded px-2 py-1" required />
                <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded">Add</button>
              </form>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard title="Total Items" value={`${items.length}`} icon={<Package className="h-5 w-5" />} />
          <StatCard
            title="Low Stock Items"
            value={`${items.filter((i) => i.stock <= i.minStock).length}`}
            change="Needs attention"
            changeType="negative"
            icon={<AlertTriangle className="h-5 w-5" />}
          />
          <StatCard title="Categories" value={String([...new Set(items.map(i => i.category))].length)} icon={<Package className="h-5 w-5" />} />
        </div>

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search inventory..." className="pl-9" />
        </div>

        <div className="grid gap-3">
          {items.map((item, idx) => {
            const percentage = (item.stock / item.maxStock) * 100;
            const isLow = item.stock <= item.minStock;
            return (
              <Card key={item.name + item.category} className="shadow-card animate-fade-in">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{item.name}</h3>
                        {isLow && (
                          <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30 text-[10px]">
                            Low Stock
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{item.category} • Updated {item.lastUpdated}</p>
                    </div>
                    <div className="flex items-center gap-6 sm:w-1/2">
                      <div className="flex-1">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">Stock Level</span>
                          <span className="font-medium">
                            {item.stock} / {item.maxStock} {item.unit}
                          </span>
                        </div>
                        <Progress
                          value={percentage}
                          className={`h-2 ${isLow ? "[&>div]:bg-destructive" : "[&>div]:gradient-warm"}`}
                        />
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleRestockOpen(idx, item.stock)}>
                        Restock
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

        {/* Restock Modal */}
        {restockModal.open && restockModal.index !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[350px] relative">
              <button className="absolute top-2 right-2 text-gray-500 hover:text-black" onClick={handleRestockClose} aria-label="Close">×</button>
              <h2 className="text-lg font-bold mb-4">Restock Item</h2>
              <form onSubmit={handleRestockSubmit} className="space-y-3">
                <div>Item: <b>{items[restockModal.index].name}</b></div>
                <input type="number" min="0" max={items[restockModal.index].maxStock} value={restockQty} onChange={e => setRestockQty(Number(e.target.value))} className="w-full border rounded px-2 py-1" required />
                <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded">Update Stock</button>
              </form>
            </div>
          </div>
        )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Inventory;
