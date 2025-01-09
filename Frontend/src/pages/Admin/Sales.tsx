// 'use client'

// import { useState } from 'react'
// import { Search, DollarSign, TrendingUp, ShoppingCart, Package, ArrowUpRight, ArrowDownRight } from 'lucide-react'
// import LeftSideBar from "@/components/SideBar"
// import { Input } from "@/components/ui/input"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import {
//   AreaChart,
//   Bar,
//   BarChart,
//   ResponsiveContainer,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   Area,
// } from "recharts"


// const salesData = [
//   { date: '2023-01-01', total: 3000 },
//   { date: '2023-02-01', total: 7500 },
//   { date: '2023-03-01', total: 6800 },
//   { date: '2023-04-01', total: 9000 },
//   { date: '2023-05-01', total: 8200 },
//   { date: '2023-06-01', total: 10500 },
// ]

// const recentOrders = [
//   { id: '1', customer: 'John Doe', date: '2023-06-15', total: 250.99, status: 'Completed' },
//   { id: '2', customer: 'Jane Smith', date: '2023-06-14', total: 120.50, status: 'Processing' },
//   { id: '3', customer: 'Bob Johnson', date: '2023-06-13', total: 75.00, status: 'Shipped' },
//   { id: '4', customer: 'Alice Brown', date: '2023-06-12', total: 199.99, status: 'Completed' },
//   { id: '5', customer: 'Charlie Wilson', date: '2023-06-11', total: 89.99, status: 'Processing' },
// ]

// const topProducts = [
//   { name: 'Product A', sales: 1200, revenue: 24000 },
//   { name: 'Product B', sales: 950, revenue: 19000 },
//   { name: 'Product C', sales: 800, revenue: 16000 },
//   { name: 'Product D', sales: 600, revenue: 12000 },
//   { name: 'Product E', sales: 500, revenue: 10000 },
// ]

// export default function SalesPage() {
//   const [timeRange, setTimeRange] = useState('7d')
//   const [searchQuery, setSearchQuery] = useState('')

//   const totalRevenue = salesData.reduce((sum, data) => sum + data.total, 0)
//   const averageOrderValue = totalRevenue / recentOrders.length
//   const conversionRate = 3.2 

//   return (
//     <div className="flex h-screen bg-background">
//       <LeftSideBar />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <header className="flex items-center justify-between px-6 py-4 border-b">
//           <h1 className="text-2xl font-bold">Sales Dashboard</h1>
//           <div className="flex items-center space-x-4">
//             <Select value={timeRange} onValueChange={setTimeRange}>
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="Select time range" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="7d">Last 7 days</SelectItem>
//                 <SelectItem value="30d">Last 30 days</SelectItem>
//                 <SelectItem value="90d">Last 90 days</SelectItem>
//                 <SelectItem value="12m">Last 12 months</SelectItem>
//               </SelectContent>
//             </Select>
//             <form onSubmit={(e) => e.preventDefault()} className="relative">
//               <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//               <Input
//                 type="search"
//                 placeholder="Search orders..."
//                 className="pl-8 w-64"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </form>
//           </div>
//         </header>
//         <main className="flex-1 overflow-y-auto p-6">
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
//                 <DollarSign className="h-4 w-4 text-muted-foreground" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
//                 <div className="flex items-center text-xs text-green-500">
//                   <ArrowUpRight className="h-4 w-4 mr-1" />
//                   <span>+20.1% from last month</span>
//                 </div>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
//                 <ShoppingCart className="h-4 w-4 text-muted-foreground" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">${averageOrderValue.toFixed(2)}</div>
//                 <div className="flex items-center text-xs text-green-500">
//                   <ArrowUpRight className="h-4 w-4 mr-1" />
//                   <span>+5.2% from last month</span>
//                 </div>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
//                 <TrendingUp className="h-4 w-4 text-muted-foreground" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{conversionRate}%</div>
//                 <div className="flex items-center text-xs text-red-500">
//                   <ArrowDownRight className="h-4 w-4 mr-1" />
//                   <span>-0.5% from last month</span>
//                 </div>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
//                 <Package className="h-4 w-4 text-muted-foreground" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{recentOrders.length}</div>
//                 <div className="flex items-center text-xs text-green-500">
//                   <ArrowUpRight className="h-4 w-4 mr-1" />
//                   <span>+12.5% from last month</span>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mt-6">
//             <Card className="col-span-4">
//               <CardHeader>
//                 <CardTitle>Sales Overview</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <AreaChart data={salesData}>
//                     <XAxis dataKey="date" />
//                     <YAxis />
//                     <Tooltip />
//                     <Area type="monotone" dataKey="total" stroke="#8884d8" fill="#8884d8" />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               </CardContent>
//             </Card>
//             <Card className="col-span-3">
//               <CardHeader>
//                 <CardTitle>Top Selling Products</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <BarChart data={topProducts}>
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     <Bar dataKey="sales" fill="#8884d8" />
//                     <Bar dataKey="revenue" fill="#82ca9d" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </CardContent>
//             </Card>
//           </div>
//           <Card className="mt-6">
//             <CardHeader>
//               <CardTitle>Recent Orders</CardTitle>
//               <CardDescription>Overview of the latest transactions</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Order ID</TableHead>
//                     <TableHead>Customer</TableHead>
//                     <TableHead>Date</TableHead>
//                     <TableHead>Total</TableHead>
//                     <TableHead>Status</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {recentOrders.map((order) => (
//                     <TableRow key={order.id}>
//                       <TableCell>{order.id}</TableCell>
//                       <TableCell>{order.customer}</TableCell>
//                       <TableCell>{order.date}</TableCell>
//                       <TableCell>${order.total.toFixed(2)}</TableCell>
//                       <TableCell>{order.status}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>
//         </main>
//       </div>
//     </div>
//   )
// }




// final
// 'use client';

// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import LeftSideBar from "@/components/SideBar";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";

// type OrderItem = {
//   REF: string;
//   quantity: number;
//   Poitrine: string;
//   subcategoryID: {
//     name: string;
//   };
// };

// type Order = {
//   _id: string;
//   userDetails: {
//     firstName: string;
//     lastName: string;
//     email: string;
//     phone: string;
//     city: string;
//     address: string;
//     postalCode: string;
//     country: string;
//   };
//   cartItems: OrderItem[];
//   date: string;
//   totalPrice: number;
//   invoicePath?: string;
// };

// export default function AdminSalesPage() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

//   const fetchOrders = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/api/order/admin/getorders");
//       setOrders(response.data);
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDownloadInvoice = async (filePath: string) => {
//     if (!filePath) {
//       console.error("Invoice file path is missing");
//       return;
//     }

//     try {
//       const response = await axios.get(`http://localhost:3000${filePath}`, {
//         responseType: "blob",
//       });

//       const fileName = filePath.split("/").pop() || "invoice.pdf";
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", fileName);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Error downloading invoice:", error);
//     }
//   };

//   const toggleExpandOrder = (orderId: string) => {
//     setExpandedOrderId((prevId) => (prevId === orderId ? null : orderId));
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   return (
//     <div className="flex h-screen bg-background">
//       <LeftSideBar />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <header className="flex items-center justify-between px-6 py-4 border-b">
//           <h1 className="text-2xl font-bold">Admin Dashboard - Sales</h1>
//         </header>
//         <main className="flex-1 overflow-y-auto p-6">
//           <Card className="mt-6">
//             <CardHeader>
//               <CardTitle>All Orders</CardTitle>
//             </CardHeader>
//             <CardContent>
//               {isLoading ? (
//                 <p className="text-center text-gray-500">Loading orders...</p>
//               ) : orders.length > 0 ? (
//                 orders.map((order) => (
//                   <div key={order._id} className="mb-4 border rounded-lg shadow-md p-4">
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <h2 className="text-lg font-bold">Order ID: {order._id}</h2>
//                         <p className="text-sm text-gray-500">
//                           Date: {new Date(order.date).toLocaleString()}
//                         </p>
//                         <p className="text-sm text-gray-500">
//                           Customer: {order.userDetails.firstName} {order.userDetails.lastName}
//                         </p>
//                       </div>
//                       <div>
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={() => toggleExpandOrder(order._id)}
//                         >
//                           {expandedOrderId === order._id ? "Hide Details" : "View Details"}
//                         </Button>
//                       </div>
//                     </div>
//                     {expandedOrderId === order._id && (
//                       <div className="mt-4 border-t pt-4">
//                         <h3 className="text-md font-bold mb-2">Order Details:</h3>
//                         <Table className="w-full border-collapse">
//                           <TableHeader>
//                             <TableRow>
//                               <TableHead>Subcategory</TableHead>
//                               <TableHead>Reference</TableHead>
//                               <TableHead>Quantity</TableHead>
//                               <TableHead>Price</TableHead>
//                             </TableRow>
//                           </TableHeader>
//                           <TableBody>
//                             {order.cartItems.map((item) => (
//                               <TableRow key={item.REF}>
//                                 <TableCell>
//                                   {item.subcategoryID?.name || "Unknown Subcategory"}
//                                 </TableCell>
//                                 <TableCell>{item.REF}</TableCell>
//                                 <TableCell>{item.quantity}</TableCell>
//                                 <TableCell>
//                                   ${(parseFloat(item.Poitrine) * item.quantity).toFixed(2)}
//                                 </TableCell>
//                               </TableRow>
//                             ))}
//                           </TableBody>
//                         </Table>
//                         <div className="mt-4">
//                           <p className="text-sm font-bold">
//                             Total Price: ${order.totalPrice.toFixed(2)}
//                           </p>
//                           {order.invoicePath && (
//                             <Button
//                               variant="outline"
//                               size="sm"
//                               onClick={() => handleDownloadInvoice(order.invoicePath!)}
//                               className="mt-2"
//                             >
//                               Download Invoice
//                             </Button>
//                           )}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-center text-gray-500">No orders found.</p>
//               )}
//             </CardContent>
//           </Card>
//         </main>
//       </div>
//     </div>
//   );
// }


// final version without filter
// 'use client';

// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import LeftSideBar from "@/components/SideBar";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { downloadInvoice } from "@/utils/invoice";

// type OrderItem = {
//   REF: string;
//   quantity: number;
//   Poitrine: string;
//   subcategoryID: {
//     name: string;
//   };
// };

// type Order = {
//   _id: string;
//   userDetails: {
//     firstName: string;
//     lastName: string;
//     email: string;
//     phone: string;
//     city: string;
//     address: string;
//     postalCode: string;
//     country: string;
//   };
//   cartItems: OrderItem[];
//   date: string;
//   totalPrice: number;
//   invoicePath?: string;
// };

// export default function AdminSalesPage() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

//   const fetchOrders = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/api/order/admin/getorders");
//       setOrders(response.data);
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };



//   const toggleExpandOrder = (orderId: string) => {
//     setExpandedOrderId((prevId) => (prevId === orderId ? null : orderId));
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);


// return (
//   <div className="flex h-screen bg-background">
//     <LeftSideBar />
//     <div className="flex-1 flex flex-col overflow-hidden">
//       <header className="flex items-center justify-between px-6 py-4 border-b">
//         <h1 className="text-2xl font-bold">Admin Dashboard - Sales</h1>
//       </header>
//       <main className="flex-1 overflow-y-auto p-6">
//         <Card className="mt-6">
//           <CardHeader>
//             <CardTitle>All Orders</CardTitle>
//           </CardHeader>
//           <CardContent>
//             {isLoading ? (
//               <p className="text-center text-gray-500">Loading orders...</p>
//             ) : orders.length > 0 ? (
//               orders.map((order) => (
//                 <div key={order._id} className="mb-4 border rounded-lg shadow-md p-4">
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <h2 className="text-lg font-bold">Order ID: {order._id}</h2>
//                       <p className="text-sm text-gray-500">
//                         Date: {new Date(order.date).toLocaleString()}
//                       </p>
//                       <p className="text-sm text-gray-500">
//                         Customer: {order.userDetails.firstName} {order.userDetails.lastName}
//                       </p>
//                     </div>
//                     <div>
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => toggleExpandOrder(order._id)}
//                       >
//                         {expandedOrderId === order._id ? "Hide Details" : "View Details"}
//                       </Button>
//                     </div>
//                   </div>
//                   {expandedOrderId === order._id && (
//                     <div className="mt-4 border-t pt-4">
//                       <h3 className="text-md font-bold mb-2">Order Details:</h3>
//                       <Table className="w-full border-collapse">
//                         <TableHeader>
//                           <TableRow>
//                             <TableHead>Subcategory</TableHead>
//                             <TableHead>Reference</TableHead>
//                             <TableHead>Quantity</TableHead>
//                             <TableHead>Price</TableHead>
//                           </TableRow>
//                         </TableHeader>
//                         <TableBody>
//                           {order.cartItems.map((item) => (
//                             <TableRow key={item.REF}>
//                               <TableCell>
//                                 {item.subcategoryID?.name || "Unknown Subcategory"}
//                               </TableCell>
//                               <TableCell>{item.REF}</TableCell>
//                               <TableCell>{item.quantity}</TableCell>
//                               <TableCell>
//                                 ${(parseFloat(item.Poitrine) * item.quantity).toFixed(2)}
//                               </TableCell>
//                             </TableRow>
//                           ))}
//                         </TableBody>
//                       </Table>
//                       <div className="mt-4 flex items-center justify-between">
//                         <p className="text-sm font-bold">
//                           Total Price: ${order.totalPrice.toFixed(2)}
//                         </p>
//                         {order.invoicePath && (
//                           <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={() => downloadInvoice(order.invoicePath!)}
//                           className="ml-4"
//                         >
//                           Download Invoice
//                         </Button>
//                         )}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))
//             ) : (
//               <p className="text-center text-gray-500">No orders found.</p>
//             )}
//           </CardContent>
//         </Card>
//       </main>
//     </div>
//   </div>
// );
// }


// 'use client';

// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import LeftSideBar from "@/components/SideBar";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { downloadInvoice } from "@/utils/invoice";

// type OrderItem = {
//   REF: string;
//   quantity: number;
//   Poitrine: string;
//   subcategoryID: {
//     name: string;
//   };
// };

// type Order = {
//   _id: string;
//   userDetails: {
//     firstName: string;
//     lastName: string;
//     email: string;
//     phone: string;
//     city: string;
//     address: string;
//     postalCode: string;
//     country: string;
//   };
//   cartItems: OrderItem[];
//   date: string;
//   totalPrice: number;
//   invoicePath?: string;
// };

// export default function AdminSalesPage() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [dateFilter, setDateFilter] = useState('');

//   const fetchOrders = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/api/order/admin/getorders");
//       setOrders(response.data);
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const toggleExpandOrder = (orderId: string) => {
//     setExpandedOrderId((prevId) => (prevId === orderId ? null : orderId));
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const filteredOrders = orders.filter((order) => {
//     const matchesSearch = `${order.userDetails.firstName} ${order.userDetails.lastName}`
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase()) || order._id.toLowerCase().includes(searchQuery.toLowerCase());

//     const matchesDate = dateFilter
//       ? new Date(order.date).toISOString().split('T')[0] === dateFilter
//       : true;

//     return matchesSearch && matchesDate;
//   });

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <LeftSideBar />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <header className="flex items-center justify-between px-6 py-4 border-b bg-white shadow-sm">
//           <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard - Sales</h1>
//         </header>
//         <main className="flex-1 overflow-y-auto p-6">
//           <Card className="mt-6 shadow-md bg-white">
//             <CardHeader>
//               <CardTitle className="text-lg font-semibold text-gray-700">All Orders</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="flex items-center gap-4 mb-6">
//                 <Input
//                   type="text"
//                   placeholder="Search by customer name or order ID"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-1/2 border border-gray-300 focus:border-blue-500 rounded-md"
//                 />
//                 <Input
//                   type="date"
//                   placeholder="Filter by date"
//                   value={dateFilter}
//                   onChange={(e) => setDateFilter(e.target.value)}
//                   className="w-1/2 border border-gray-300 focus:border-blue-500 rounded-md"
//                 />
//               </div>
//               {isLoading ? (
//                 <p className="text-center text-gray-500">Loading orders...</p>
//               ) : filteredOrders.length > 0 ? (
//                 filteredOrders.map((order) => (
//                   <div key={order._id} className="mb-4 bg-white rounded-lg shadow-sm p-6 border border-gray-200">
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <h2 className="text-lg font-semibold text-gray-800">Order ID: {order._id}</h2>
//                         <p className="text-sm text-gray-500">
//                           Date: {new Date(order.date).toLocaleString()}
//                         </p>
//                         <p className="text-sm text-gray-500">
//                           Customer: {order.userDetails.firstName} {order.userDetails.lastName}
//                         </p>
//                       </div>
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => toggleExpandOrder(order._id)}
//                         className="text-sm border-gray-300"
//                       >
//                         {expandedOrderId === order._id ? "Hide Details" : "View Details"}
//                       </Button>
//                     </div>
//                     {expandedOrderId === order._id && (
//                       <div className="mt-4 border-t pt-4">
//                         <h3 className="text-md font-semibold text-gray-600 mb-2">Order Details</h3>
//                         <Table className="w-full text-sm">
//                           <TableHeader>
//                             <TableRow>
//                               <TableHead>Subcategory</TableHead>
//                               <TableHead>Reference</TableHead>
//                               <TableHead>Quantity</TableHead>
//                               <TableHead>Price</TableHead>
//                             </TableRow>
//                           </TableHeader>
//                           <TableBody>
//                             {order.cartItems.map((item) => (
//                               <TableRow key={item.REF}>
//                                 <TableCell>
//                                   {item.subcategoryID?.name || "Unknown Subcategory"}
//                                 </TableCell>
//                                 <TableCell>{item.REF}</TableCell>
//                                 <TableCell>{item.quantity}</TableCell>
//                                 <TableCell>
//                                   ${(parseFloat(item.Poitrine) * item.quantity).toFixed(2)}
//                                 </TableCell>
//                               </TableRow>
//                             ))}
//                           </TableBody>
//                         </Table>
//                         <div className="mt-4 flex items-center justify-between">
//                           <p className="text-md font-bold text-gray-800">
//                             Total Price: ${order.totalPrice.toFixed(2)}
//                           </p>
//                           {order.invoicePath && (
//                             <Button
//                               variant="outline"
//                               size="sm"
//                               onClick={() => downloadInvoice(order.invoicePath!)}
//                               className="ml-4 text-sm border-gray-300"
//                             >
//                               Download Invoice
//                             </Button>
//                           )}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-center text-gray-500">No orders found.</p>
//               )}
//             </CardContent>
//           </Card>
//         </main>
//       </div>
//     </div>
//   );
// }

// previoud final version

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
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('');

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
      .includes(searchQuery.toLowerCase()) || order._id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDate = dateFilter
      ? new Date(order.date).toISOString().split('T')[0] === dateFilter
      : true;

    return matchesSearch && matchesDate;
  });

  return (
    <div className="flex h-screen bg-gray-100">
      <LeftSideBar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 border-b bg-white shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard - Sales</h1>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <Card className="mt-6 shadow-md bg-white">
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
                  className="w-1/2 border border-gray-300 focus:border-blue-500 rounded-md"
                />
                <Input
                  type="date"
                  placeholder="Filter by date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-1/2 border border-gray-300 focus:border-blue-500 rounded-md"
                />
              </div>
              {isLoading ? (
                <p className="text-center text-gray-500">Loading orders...</p>
              ) : filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
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
