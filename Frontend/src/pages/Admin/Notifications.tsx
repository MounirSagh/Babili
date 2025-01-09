'use client';

import { useState, useEffect } from 'react';
import { Search, CheckCircle, AlertCircle, InfoIcon, MessageSquare, Package, DollarSign, Download } from 'lucide-react';
import LeftSideBar from '@/components/SideBar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import axios from 'axios';

import { downloadInvoice } from "@/utils/invoice";
type NotificationType = 'success' | 'error' | 'info' | 'message' | 'order' | 'payment';

type Notification = {
  _id: string;
  type: NotificationType;
  title: string;
  message: string;
  filePath?: string; // Optional file path for invoices or other files
  date: string;
  read: boolean;
};

const notificationIcons = {
  success: <CheckCircle className="h-5 w-5 text-green-500" />,
  error: <AlertCircle className="h-5 w-5 text-red-500" />,
  info: <InfoIcon className="h-5 w-5 text-blue-500" />,
  message: <MessageSquare className="h-5 w-5 text-purple-500" />,
  order: <Package className="h-5 w-5 text-orange-500" />,
  payment: <DollarSign className="h-5 w-5 text-green-500" />,
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Fetch notifications from backend
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/notification/getnotifications");
        console.log("Fetched notifications:", response.data); // Debug logging
        setNotifications(response.data); // Update state
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
  
    fetchNotifications();
  }, []);
  

  // Filter notifications based on type and search query
  const filteredNotifications = notifications.filter(
    (notification) =>
      (filterType === 'all' || notification.type === filterType) &&
      (notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notification.message.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleMarkAsRead = async (id: string) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/notification/markasread/${id}`);
      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === id ? { ...notification, read: true } : notification
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };
  

  const handleDeleteNotification = async (id: string) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/notification/deletenotification/${id}`);
      console.log(response.data.message); // Log success message
      setNotifications((prev) => prev.filter((notification) => notification._id !== id));
    } catch (error) {
      console.error("Error deleting notification:", error);
      alert("Failed to delete the notification.");
    }
  };
  
  //  const downloadInvoice = async (filePath: string) => {
  //   try {
  //     const response = await axios.get(filePath, {
  //       responseType: 'blob', // Ensures the response is treated as a file
  //     });
  
  //     // Create a blob URL for the file
  //     const blob = new Blob([response.data], { type: response.headers['content-type'] });
  //     const url = window.URL.createObjectURL(blob);
  
  //     // Create a temporary link element
  //     const link = document.createElement('a');
  //     link.href = url;
  
  //     // Extract the file name from the path or default to "invoice.pdf"
  //     const fileName = filePath.split('/').pop() || 'invoice.pdf';
  //     link.setAttribute('download', fileName);
  
  //     // Append the link to the body, click it, and remove it
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  
  //     // Revoke the blob URL
  //     window.URL.revokeObjectURL(url);
  //   } catch (error) {
  //     console.error('Error downloading invoice:', error);
  //     alert('Failed to download the invoice.');
  //   }
  // };
  

  return (
    <div className="flex h-screen bg-background">
      <LeftSideBar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 border-b">
          <h1 className="text-2xl font-bold">Notifications</h1>
          <div className="flex items-center space-x-4">
            <form onSubmit={(e) => e.preventDefault()} className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search notifications..."
                className="pl-8 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter notifications" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Notifications</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="message">Messages</SelectItem>
                <SelectItem value="order">Orders</SelectItem>
                <SelectItem value="payment">Payments</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </header>
        <main className="flex-1 overflow-hidden p-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription>Stay updated with your latest activities</CardDescription>
            </CardHeader>
            <CardContent>
  <ScrollArea className="h-[calc(100vh-250px)]">
    {filteredNotifications.length === 0 ? (
      <div className="text-center text-muted-foreground py-8">No notifications found</div>
    ) : (
      filteredNotifications.map((notification, index) => (
        <div key={notification._id}>
          {index > 0 && <Separator className="my-2" />}
          <div
            className={`flex items-start space-x-4 py-4 ${
              notification.read ? "opacity-60" : ""
            }`}
          >
            <div className="shrink-0">{notificationIcons[notification.type]}</div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{notification.title}</p>
                <Badge variant={notification.read ? "secondary" : "default"}>
                  {notification.read ? "Read" : "New"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{notification.message}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(notification.date).toLocaleString()}
              </p>
            </div>
            <div className="shrink-0 space-x-2">
              {!notification.read && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleMarkAsRead(notification._id)}
                  disabled={notification.read} // Prevent multiple clicks if already read
                  aria-label="Mark notification as read"
                >
                  Mark as Read
                </Button>
              )}
          
  
{/* {notification.filePath && (
  <Button
    variant="outline"
    size="sm"
    onClick={() => downloadInvoice(`http://localhost:3000${notification.filePath}`)} // Ensure the URL is correct
  >
    Download Invoice
  </Button>
)} */}
{notification.filePath && (
  <Button
    variant="outline"
    size="sm"
    onClick={() => {
      const formattedPath = notification.filePath && notification.filePath.startsWith("/")
        ? notification.filePath
        : `/${notification.filePath}`;
      const fullUrl = `http://localhost:3000${formattedPath}`;
      window.open(fullUrl, "_blank");
    }}
  >
    Download Invoice
  </Button>
)}



             <Button
  variant="ghost"
  size="sm"
  onClick={() => handleDeleteNotification(notification._id)}
>
  Delete
</Button>

            </div>
          </div>
        </div>
      ))
    )}
  </ScrollArea>
</CardContent>

          </Card>
        </main>
      </div>
    </div>
  );
}
