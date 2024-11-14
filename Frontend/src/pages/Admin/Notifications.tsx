'use client'

import { useState } from 'react'
import { Search, CheckCircle, AlertCircle, InfoIcon, MessageSquare, Package, DollarSign } from 'lucide-react'
import LeftSideBar from "@/components/SideBar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"


// Define allowed notification types
type NotificationType = 'success' | 'error' | 'info' | 'message' | 'order' | 'payment'


// Sample notification data
const initialNotifications: { id: number, type: NotificationType, title: string, message: string, time: string, read: boolean }[] = [
  { id: 1, type: 'success', title: 'Order Shipped', message: 'Your order #12345 has been shipped.', time: '2 hours ago', read: false },
  { id: 2, type: 'error', title: 'Payment Failed', message: 'Your payment for order #67890 has failed.', time: '5 hours ago', read: false },
  { id: 3, type: 'info', title: 'New Feature', message: 'Check out our new product recommendation engine!', time: '1 day ago', read: true },
  { id: 4, type: 'message', title: 'New Message', message: 'You have a new message from Customer Support.', time: '2 days ago', read: true },
  { id: 5, type: 'order', title: 'New Order', message: 'You have received a new order #13579.', time: '3 days ago', read: false },
  { id: 6, type: 'payment', title: 'Payment Received', message: 'Payment of $250.00 has been received for order #24680.', time: '4 days ago', read: true },
]

const notificationIcons = {
  success: <CheckCircle className="h-5 w-5 text-green-500" />,
  error: <AlertCircle className="h-5 w-5 text-red-500" />,
  info: <InfoIcon className="h-5 w-5 text-blue-500" />,
  message: <MessageSquare className="h-5 w-5 text-purple-500" />,
  order: <Package className="h-5 w-5 text-orange-500" />,
  payment: <DollarSign className="h-5 w-5 text-green-500" />,
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')

  const filteredNotifications = notifications.filter(notification => 
    (filterType === 'all' || notification.type === filterType) &&
    (notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     notification.message.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const handleMarkAsRead = (id: any) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ))
  }

  const handleDeleteNotification = (id: any) => {
    setNotifications(notifications.filter(notification => notification.id !== id))
  }

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
                    <div key={notification.id}>
                      {index > 0 && <Separator className="my-2" />}
                      <div className={`flex items-start space-x-4 py-4 ${notification.read ? 'opacity-60' : ''}`}>
                        <div className="shrink-0">
                          {notificationIcons[notification.type]}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">{notification.title}</p>
                            <Badge variant={notification.read ? "secondary" : "default"}>
                              {notification.read ? 'Read' : 'New'}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{notification.message}</p>
                          <p className="text-xs text-muted-foreground">{notification.time}</p>
                        </div>
                        <div className="shrink-0 space-x-2">
                          {!notification.read && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleMarkAsRead(notification.id)}
                            >
                              Mark as Read
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteNotification(notification.id)}
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
  )
}