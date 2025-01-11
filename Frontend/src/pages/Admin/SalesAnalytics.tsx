"use client";

import { useState, useEffect } from "react";
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Tooltip, Area, BarChart, Bar, Legend } from 'recharts';
import axios from "axios";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'; // Import CSS
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import LeftSideBar from "@/components/SideBar";
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
  const [topProducts, setTopProducts] = useState([]); // For top selling products
  const [timeRange, setTimeRange] = useState("7d");
  const [previousRevenue, setPreviousRevenue] = useState(0); // Store previous period's revenue
  const [targetRevenue, setTargetRevenue] = useState(1000000); // Set target revenue (example)

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
        setPreviousRevenue(allOrders.previousRevenue); // Get previous period's revenue for comparison
        setSalesData(salesData);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    fetchAnalyticsData();
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

  // Function to calculate the percentage of the target achieved
  const calculateTargetProgress = () => {
    const expectedRevenue = totalRevenue + (pendingOrders * 1000); // Modify as per actual logic
    return expectedRevenue === 0 ? 0 : (totalRevenue / expectedRevenue) * 100;
  };

  const progress = calculateTargetProgress();

  // Function to calculate conversion rate
  const conversionRate = pendingOrders ? (totalRevenue / (totalRevenue + (pendingOrders * 1000))) * 100 : 0;

  // Calculate Expected Revenue as sum of approved and pending revenue
  const expectedRevenue = totalRevenue + (pendingOrders * 1000); // Adjust for actual pending revenue

  if (!isLoaded || user?.publicMetadata?.role !== 'admin') {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <LeftSideBar />
      <div className="flex-1 flex flex-col overflow-hidden">
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

        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-3"></div>
            {/* Total Revenue */}
            <Card className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg">
              <CardHeader>
                <CardTitle>Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{`MAD ${totalRevenue.toLocaleString()}`}</div>
                <div className="text-lg text-gray-300">Compared to target: {progress.toFixed(2)}%</div>
              </CardContent>
            </Card>

           

          {/* Expected Revenue */}
          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-3 mt-5">
            <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg">
              <CardHeader>
                <CardTitle>Expected Revenue</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-5xl font-bold mb-2">{`MAD ${expectedRevenue.toLocaleString()}`}</div>
                <div className="text-lg text-gray-200">Total expected revenue, including pending orders.</div>
              </CardContent>
            </Card>

            {/* Conversion Rate */}
            <Card className="bg-gradient-to-r from-teal-400 to-green-500 text-white shadow-lg">
              <CardHeader>
                <CardTitle>Conversion Rate</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-5xl font-bold mb-2">{`${conversionRate.toFixed(2)}%`}</div>
                <div className="text-lg text-gray-200">Percentage of total expected revenue confirmed by approved orders.</div>
                {/* Optional: Progress bar to represent the conversion rate visually */}
                <div className="mt-4">
                  <div style={{ height: '10px', backgroundColor: '#e0e0e0' }}>
                    <div
                      style={{
                        width: `${conversionRate}%`,
                        height: '100%',
                        backgroundColor: conversionRate < 50 ? "#FF0000" : "#4CAF50", // Red if below 50% and green above
                      }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sales Overview with Circular Progress Bar */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mt-5">
            <Card className="col-span-2 bg-gradient-to-r from-white-500 to-indigo-500 text-black shadow-lg">
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center items-center">
                <div style={{ width: 150, height: 150 }}>
                  <CircularProgressbar 
                    value={progress} 
                    maxValue={100} 
                    text={`${progress.toFixed(2)}%`} 
                    styles={{
                      path: { stroke: progress < 50 ? "#FF0000" : "#4CAF50" },
                      text: { fill: "#4CAF50", fontSize: "20px" },
                    }}
                  />
                </div>
              </CardContent>
            </Card>

           
          </div>
        </main>
      </div>
    </div>
  );
}
