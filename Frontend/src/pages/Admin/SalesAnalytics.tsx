"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, Legend } from "recharts";
import LeftSideBar from "@/components/SideBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const baseURL = "http://localhost:3000"; // Define the baseURL

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("7d");
  const [salesData, setSalesData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [approvedOrders, setApprovedOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [rejectedOrders, setRejectedOrders] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState<"Approved" | "Pending" | "Rejected">("Approved");
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        // Fetch analytics and orders
        const [analyticsResponse, ordersResponse] = await Promise.all([
          axios.get(`${baseURL}/api/sales/analytics?timeRange=${timeRange}`),
        axios.get(`${baseURL}/api/orders?timeRange=${timeRange}`),
        ]);

        const { salesData } = analyticsResponse.data;
        const { orders } = ordersResponse.data;

        // Filter orders by status
        const approved = orders.filter((order: { status: string }) => order.status === "Approved");
        const pending = orders.filter((order: { status: string }) => order.status === "Pending");
        const rejected = orders.filter((order: { status: string }) => order.status === "Rejected");

        // Calculate total revenue from approved orders
        const revenue = approved.reduce((sum: number, order: { total: number }) => sum + order.total, 0);

        setSalesData(salesData);
        setTotalRevenue(revenue);
        setApprovedOrders(approved.length);
        setPendingOrders(pending.length);
        setRejectedOrders(rejected.length);
        setTotalOrders(orders.length); // Set total orders

        // Fetch top products
        const topProductsResponse = await axios.get(`http://localhost:3000/api/products/top?timeRange=${timeRange}`);
        setTopProducts(topProductsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSalesData();
  }, [timeRange]);

  return (
    <div className="flex h-screen bg-gray-100">
      <LeftSideBar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b bg-white shadow">
          <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="12m">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Summary Cards */}
          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-3">
            {/* Total Revenue */}
            <Card>
              <CardHeader>
                <CardTitle>Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-800">MAD {totalRevenue.toLocaleString()}</div>
              </CardContent>
            </Card>

            {/* Total Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Total Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-800">{totalOrders}</div>
              </CardContent>
            </Card>

            {/* Order Status */}
            <Card>
              <CardHeader>
                <CardTitle>Order Status</CardTitle>
              </CardHeader>
              <CardContent>
                <Select
                  value={selectedStatus}
                  onValueChange={(value) => setSelectedStatus(value as "Approved" | "Pending" | "Rejected")}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Approved">Approved Orders</SelectItem>
                    <SelectItem value="Pending">Pending Orders</SelectItem>
                    <SelectItem value="Rejected">Rejected Orders</SelectItem>
                  </SelectContent>
                </Select>
                <div className="mt-4 text-xl font-bold text-gray-800">
                  {selectedStatus} Orders:{" "}
                  {selectedStatus === "Approved"
                    ? approvedOrders
                    : selectedStatus === "Pending"
                    ? pendingOrders
                    : rejectedOrders}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mt-6">
            {/* Sales Overview */}
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={salesData}>
                    <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="total" stroke="#4CAF50" fill="#C8E6C9" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Top Selling Products */}
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Top Selling Products</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={topProducts}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sales" fill="#8884d8" />
                    <Bar dataKey="revenue" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
