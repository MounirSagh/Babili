'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import LeftSideBar from "@/components/SideBar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { downloadInvoice } from "@/utils/invoice";
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import AnalyticsDashboard from '@/components/SalesAnalytics';

type Attribute = {
  key: string;
  value: string;
};

type OrderItem = {
  REF: string;
  quantity: number;
  Poitrine: string;
  subcategoryID: {
    name: string;
  };
  attributes: Attribute[];
  price: number; // Add this line
};

type Order = {
  _id: string;
  userDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    address: string;
    postalCode: string;
    country: string;
  };
  cartItems: OrderItem[];
  date: string;
  totalPrice: number;
  status: string; // Pending, Approved, Rejected
  invoicePath?: string;
};

export default function AdminSalesPage() {
  const { user, isLoaded } = useUser(); 
  const navigate = useNavigate(); 

  useEffect(() => {
    if (isLoaded && user?.publicMetadata?.role !== 'admin') {
      navigate('/');
    }
  }, [isLoaded, user, navigate]);

  if (!isLoaded || user?.publicMetadata?.role !== 'admin') {
    return <h1 className="text-center mt-10">Loading...</h1>; 
  }


  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

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

  const toggleExpandOrder = (orderId: string) => {
    setExpandedOrderId((prevId) => (prevId === orderId ? null : orderId));
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/order/updateStatus/${orderId}`,
        { status }
      );
      const updatedOrder = response.data.order;
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );
      
      if (status === "Approved") {
        await axios.post("http://localhost:3000/api/mail/approval", {
          toEmail: updatedOrder.userDetails.email, 
        });
        alert("Order status updated and confirmation email sent.");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status. Please try again.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = `${order.userDetails.firstName} ${order.userDetails.lastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) || 
      order._id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDate = dateFilter
      ? new Date(order.date).toISOString().split('T')[0] === dateFilter
      : true;

    const matchesStatus = statusFilter
      ? order.status === statusFilter
      : true;

    return matchesSearch && matchesDate && matchesStatus;
  });

  return (
    <div className="flex h-screen bg-white">
      <LeftSideBar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 border-b bg-white shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard - Sales</h1>
        </header>
        <AnalyticsDashboard />
        <main className="flex-1 overflow-y-auto p-6">
          <Card className="shadow-md bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-700">All Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <Input
                  type="text"
                  placeholder="Search by customer name or order ID"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 border border-gray-300 focus:border-blue-500 rounded-md"
                />
                <Input
                  type="date"
                  placeholder="Filter by date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="flex-1 border border-gray-300 focus:border-blue-500 rounded-md"
                />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="flex-1 border border-gray-300 focus:border-blue-500 rounded-md h-10 px-3 bg-white"
                >
                  <option value="">Filter by Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              {isLoading ? (
                <p className="text-center text-gray-500">Loading orders...</p>
              ) : filteredOrders.length > 0 ? (
                [...filteredOrders].reverse().map((order) => (
                  <div key={order._id} className="mb-4 bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="text-lg font-semibold text-gray-800">Order ID: {order._id}</h2>
                        <p className="text-sm text-gray-500">
                          Date: {new Date(order.date).toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500">
                          Customer: {order.userDetails.firstName} {order.userDetails.lastName}
                        </p>
                        <p className="text-sm font-bold text-gray-700">Status: {order.status}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                          className="border border-gray-300 rounded-md px-2 py-1"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Approved">Approved</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleExpandOrder(order._id)}
                          className="text-sm border-gray-300"
                        >
                          {expandedOrderId === order._id ? "Hide Details" : "View Details"}
                        </Button>
                      </div>
                    </div>
                    {expandedOrderId === order._id && (
                      <div className="mt-4 border-t pt-4">
                        <h3 className="text-md font-semibold text-gray-600 mb-2">Order Details</h3>
                        <Table className="w-full text-sm">
                          <TableHeader>
                            <TableRow>
                              <TableHead>Subcategory</TableHead>
                              <TableHead>Reference</TableHead>
                              <TableHead>Attributes</TableHead>
                              <TableHead>Quantity</TableHead>
                              <TableHead>Price</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {order.cartItems.map((item) => (
                              <TableRow key={item.REF}>
                                <TableCell>{item.subcategoryID?.name || "Unknown Subcategory"}</TableCell>
                                <TableCell>{item.REF}</TableCell>
                                <TableCell>
                                  {item.attributes && item.attributes.length > 0
                                    ? item.attributes.map(attr => `${attr.key}: ${attr.value}`).join(", ")
                                    : "No Attributes"}
                                </TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>
                                  {item.price ? `MAD${(item.price * item.quantity).toFixed(2)}` : "Price Not Available"}
                                </TableCell>

                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                        <div className="mt-4 flex items-center justify-between">
                          <p className="text-md font-bold text-gray-800">
                            Total Price: ${order.totalPrice.toFixed(2)}
                          </p>
                          {order.invoicePath && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => downloadInvoice(order.invoicePath!)}
                              className="ml-4 text-sm border-gray-300"
                            >
                              Download Invoice
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No orders found.</p>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
