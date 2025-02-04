"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import NavBar from "@/components/NavBar";

type CartItem = {
  productId: {
    REF: string;
    price: number;
    attributes: { key: string; value: any }[];
    subcategoryID: { name: string };
  };
  quantity: number;
};

type Order = {
  _id: string;
  userDetails: {
    firstName: string;
    lastName: string;
    email: string;
  };
  cartItems: CartItem[];
  date: string;
  totalPrice: number;
  status: string;
};

export default function OrderHistoryPage() {
  const { user } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/order/userorders/${user?.id}`);
      setOrders(response.data);
      setFilteredOrders(response.data);
    } catch (error) {
      console.error("Error fetching user orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchOrders();
    }
  }, [user]);

  useEffect(() => {
    const filtered = orders.filter((order) => {
      const matchesSearch = order.cartItems.some((item) =>
        item.productId?.subcategoryID?.name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) || order._id.includes(searchTerm) // Check for both subcategory name and order ID match
      );
      const matchesStatus = statusFilter === "All" || order.status === statusFilter;
      const matchesStartDate =
        !startDate || new Date(order.date) >= new Date(startDate);
      const matchesEndDate =
        !endDate || new Date(order.date) <= new Date(endDate);

      return (
        matchesSearch && matchesStatus && matchesStartDate && matchesEndDate
      );
    });

    setFilteredOrders(filtered);
  }, [searchTerm, statusFilter, startDate, endDate, orders]);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="container mx-auto py-12 px-4 md:px-8 lg:px-12">
        <Card className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg">
          <CardHeader className="border-b">
            <CardTitle className="text-3xl font-bold text-center text-gray-900 py-4">
              Order History
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Input
                placeholder="Search by Order ID or Subcategory name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
              <Select onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Statuses</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center space-x-2">
                <Input
                  type="date"
                  placeholder="Start date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full"
                />
                <Input
                  type="date"
                  placeholder="End date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            {/* Orders Table */}
            {isLoading ? (
              <div className="flex justify-center items-center py-16">
                <p className="text-lg font-medium text-gray-500">
                  Loading your order history...
                </p>
              </div>
            ) : filteredOrders.length > 0 ? (
              <div className="overflow-x-auto">
                <Table className="w-full border-collapse">
                  <TableHeader className="sticky top-0 bg-gray-100 z-10">
                    <TableRow>
                      <TableHead className="text-left py-4 px-6 font-semibold text-gray-700 uppercase tracking-wider">
                        Order ID
                      </TableHead>
                      <TableHead className="text-left py-4 px-6 font-semibold text-gray-700 uppercase tracking-wider">
                        Date
                      </TableHead>
                      <TableHead className="text-left py-4 px-6 font-semibold text-gray-700 uppercase tracking-wider">
                        Items
                      </TableHead>
                      <TableHead className="text-left py-4 px-6 font-semibold text-gray-700 uppercase tracking-wider">
                        Total Quantity
                      </TableHead>
                      <TableHead className="text-left py-4 px-6 font-semibold text-gray-700 uppercase tracking-wider">
                        Total Price
                      </TableHead>
                      <TableHead className="text-left py-4 px-6 font-semibold text-gray-700 uppercase tracking-wider">
                        Status
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow
                        key={order._id}
                        className="hover:bg-gray-50 transition duration-300"
                      >
                        <TableCell className="py-4 px-6 text-gray-800 font-medium">
                          {order._id}
                        </TableCell>
                        <TableCell className="py-4 px-6 text-gray-600">
                          {new Date(order.date).toLocaleString()}
                        </TableCell>
                        <TableCell className="py-4 px-6 text-gray-600">
                          {order.cartItems.map((item, index) => (
                            <p key={index} className="mb-1">
                              <span className="font-medium text-gray-800">
                                {item.productId?.subcategoryID?.name || "Unknown"}:{" "}
                                {item.productId?.REF || "Unknown REF"}
                              </span>{" "}
                              (Qty: {item.quantity})
                            </p>
                          ))}
                        </TableCell>
                        <TableCell className="py-4 px-6 text-gray-600 font-medium">
                          {order.cartItems.reduce((total, item) => total + item.quantity, 0)}
                        </TableCell>
                        <TableCell className="py-4 px-6 font-semibold text-green-600">
                          MAD {order.totalPrice ? order.totalPrice.toFixed(2) : "0.00"}
                        </TableCell>
                        <TableCell className="py-4 px-6 text-gray-800 font-bold">
                          {order.status}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-lg font-semibold text-gray-500">No orders found.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
