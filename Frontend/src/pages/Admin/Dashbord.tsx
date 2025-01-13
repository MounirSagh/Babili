"use client";

import { useState, useEffect } from "react";
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Tooltip, BarChart, Bar, Legend, PieChart, Pie, Cell } from "recharts";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import LeftSideBar from "@/components/SideBar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const baseURL = "http://localhost:3000";

export default function AnalyticsDashboard() {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [approvedOrders, setApprovedOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [rejectedOrders, setRejectedOrders] = useState(0);
  const [salesData, setSalesData] = useState([]);
  const [timeRange, setTimeRange] = useState("7d");
  const [previousRevenue, setPreviousRevenue] = useState(0);
  const [topProducts, setTopProducts] = useState([]);
  const [targetRevenue, setTargetRevenue] = useState(1000000);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/sales/analytics?timeRange=${timeRange}`);
        const { approved, pending, rejected, allOrders, salesData } = response.data;

        setApprovedOrders(approved.totalOrders);
        setPendingOrders(pending.totalOrders);
        setRejectedOrders(rejected.totalOrders);
        setTotalOrders(allOrders.totalOrders);
        setTotalRevenue(approved.totalRevenue);
        setPreviousRevenue(allOrders.previousRevenue);
        setSalesData(salesData);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/order/admin/getorders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalyticsData();
    fetchOrders();
  }, [timeRange]);

  useEffect(() => {
    const fetchTopSellingProducts = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/products/top?timeRange=${timeRange}`);
        setTopProducts(response.data);
      } catch (error) {
        console.error("Error fetching top selling products:", error);
      }
    };

    fetchTopSellingProducts();
  }, [timeRange]);

  const progress = (totalRevenue / targetRevenue) * 100;

  if (!isLoaded || user?.publicMetadata?.role !== "admin") {
    return <h1>Loading...</h1>;
  }

  const orderStatusData = [
    { name: "Approved", value: approvedOrders, color: "#34D399" },
    { name: "Pending", value: pendingOrders, color: "#FBBF24" },
    { name: "Rejected", value: rejectedOrders, color: "#F87171" },
  ];

  return (
    <div className="flex h-screen bg-white">
      <LeftSideBar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 border-b bg-white">
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
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

        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Total Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{totalOrders}</div>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">${totalRevenue.toLocaleString()}</div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Orders by Status</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={orderStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
                      {orderStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Top Selling Products</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={topProducts}>
                    <XAxis dataKey="productName" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="totalSales" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Last 10 Orders</h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total Price</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.slice(0, 10).map((order: any) => (
                    <TableRow key={order._id}>
                      <TableCell>{order._id}</TableCell>
                      <TableCell>{`${order.userDetails.firstName} ${order.userDetails.lastName}`}</TableCell>
                      <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                      <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-sm font-medium ${
                            order.status === "Approved"
                              ? "bg-green-100 text-green-700"
                              : order.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}