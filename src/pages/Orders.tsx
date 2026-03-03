import React from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Clock, CheckCircle, Truck, Eye } from "lucide-react";
import { StatCard } from "@/components/StatCard";

const orders = [
  { id: "#1024", customer: "Rahul Sharma", type: "Dine-in", items: ["Butter Chicken x2", "Naan x4"], total: "₹1,100", time: "2 min ago", status: "New" },
  { id: "#1023", customer: "Priya Singh", type: "Online", items: ["Biryani x1", "Raita x1"], total: "₹380", time: "8 min ago", status: "Preparing" },
  { id: "#1022", customer: "Amit Patel", type: "Online", items: ["Paneer Tikka x2", "Lassi x2"], total: "₹800", time: "15 min ago", status: "Ready" },
  { id: "#1021", customer: "Neha Gupta", type: "Dine-in", items: ["Dal Makhani x1", "Rice x1"], total: "₹460", time: "22 min ago", status: "Delivered" },
  { id: "#1020", customer: "Vikram Joshi", type: "Online", items: ["Chicken Tikka x3"], total: "₹960", time: "30 min ago", status: "Delivered" },
  { id: "#1019", customer: "Sneha Reddy", type: "Takeaway", items: ["Biryani x2", "Gulab Jamun x4"], total: "₹1,240", time: "45 min ago", status: "Completed" },
];

const statusStyle: Record<string, string> = {
  New: "bg-info/10 text-info border-info/30",
  Preparing: "bg-warning/10 text-warning border-warning/30",
  Ready: "bg-primary/10 text-primary border-primary/30",
  Delivered: "bg-success/10 text-success border-success/30",
  Completed: "bg-muted text-muted-foreground",
};

const typeStyle: Record<string, string> = {
  "Dine-in": "bg-secondary text-secondary-foreground",
  Online: "bg-primary/10 text-primary",
  Takeaway: "bg-accent/10 text-accent",
};

const Orders = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Orders</h1>
          <p className="text-muted-foreground">Manage dine-in and online orders</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="New Orders" value="8" icon={<ShoppingCart className="h-5 w-5" />} />
          <StatCard title="Preparing" value="5" icon={<Clock className="h-5 w-5" />} />
          <StatCard title="Ready" value="3" icon={<CheckCircle className="h-5 w-5" />} />
          <StatCard title="Delivered" value="42" icon={<Truck className="h-5 w-5" />} />
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="dine-in">Dine-in</TabsTrigger>
            <TabsTrigger value="online">Online</TabsTrigger>
            <TabsTrigger value="takeaway">Takeaway</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid gap-4">
              {orders.map((order) => (
                <Card key={order.id} className="shadow-card hover:shadow-elevated transition-shadow animate-fade-in">
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className="font-bold">{order.id}</span>
                          <Badge variant="outline" className={typeStyle[order.type]}>{order.type}</Badge>
                          <Badge variant="outline" className={statusStyle[order.status]}>{order.status}</Badge>
                        </div>
                        <p className="text-sm mt-1">{order.customer}</p>
                        <p className="text-xs text-muted-foreground mt-1">{order.items.join(", ")}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-bold">{order.total}</p>
                          <p className="text-xs text-muted-foreground">{order.time}</p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {["dine-in", "online", "takeaway"].map((tab) => (
            <TabsContent key={tab} value={tab}>
              <div className="grid gap-4">
                {orders
                  .filter((o) => o.type.toLowerCase() === tab)
                  .map((order) => (
                    <Card key={order.id} className="shadow-card animate-fade-in">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-3">
                              <span className="font-bold">{order.id}</span>
                              <Badge variant="outline" className={statusStyle[order.status]}>{order.status}</Badge>
                            </div>
                            <p className="text-sm mt-1">{order.customer}</p>
                            <p className="text-xs text-muted-foreground mt-1">{order.items.join(", ")}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">{order.total}</p>
                            <p className="text-xs text-muted-foreground">{order.time}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Orders;
