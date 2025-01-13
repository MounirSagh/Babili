"use client";

import { useState, useEffect } from "react";
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Tooltip, Area, BarChart, Bar, Legend } from 'recharts';
import axios from "axios";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'; 
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
  const [topProducts, setTopProducts] = useState([]);
  const [timeRange, setTimeRange] = useState("7d");
  const [previousRevenue, setPreviousRevenue] = useState(0);
  const [targetRevenue, setTargetRevenue] = useState(1000000);

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

  const calculateTargetProgress = () => {
    const expectedRevenue = totalRevenue + (pendingOrders * 1000);
    return expectedRevenue === 0 ? 0 : (totalRevenue / expectedRevenue) * 100;
  };

  const progress = calculateTargetProgress();
  const conversionRate = pendingOrders ? (totalRevenue / (totalRevenue + (pendingOrders * 1000))) * 100 : 0;
  const expectedRevenue = totalRevenue + (pendingOrders * 1000);

  if (!isLoaded || user?.publicMetadata?.role !== 'admin') {
    return <h1>Loading...</h1>;
  }

  return (
        <main className="p-8">
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <Card className=" text-black shadow-lg rounded-lg">
              <CardHeader>
                <CardTitle>Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{`MAD ${totalRevenue.toLocaleString()}`}</div>
                <div className="text-lg mt-1">Progress: {progress.toFixed(2)}%</div>
              </CardContent>
            </Card>

            <Card className=" text-black shadow-lg rounded-lg">
              <CardHeader>
                <CardTitle>Expected Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{`MAD ${expectedRevenue.toLocaleString()}`}</div>
                <div className="text-lg mt-1">Including pending orders</div>
              </CardContent>
            </Card>

            <Card className="text-black shadow-lg rounded-lg">
              <CardHeader>
                <CardTitle>Conversion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{`${conversionRate.toFixed(2)}%`}</div>
                <div className="mt-4">
                  <div className="h-2 bg-gray-300 rounded-full">
                    <div
                      className={`h-full rounded-full ${conversionRate < 50 ? "bg-red-500" : "bg-green-500"}`}
                      style={{ width: `${conversionRate}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
  );
}