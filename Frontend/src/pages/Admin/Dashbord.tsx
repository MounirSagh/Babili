'use client'

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react'; 
import { Bell, Search, Users, DollarSign, Activity, ShoppingCart, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import LeftSideBar from "@/components/SideBar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Area,
} from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const revenueData = [
  { name: "Jan", total: 1200, target: 1000 },
  { name: "Feb", total: 2100, target: 1500 },
  { name: "Mar", total: 1800, target: 2000 },
  { name: "Apr", total: 2400, target: 2200 },
  { name: "May", total: 2800, target: 2400 },
  { name: "Jun", total: 3200, target: 2800 },
]

const userGrowthData = [
  { name: "Jan", total: 3000, organic: 3000, paid: 2000 },
  { name: "Feb", total: 6200, organic: 3700, paid: 2500 },
  { name: "Mar", total: 7800, organic: 4500, paid: 3300 },
  { name: "Apr", total: 8400, organic: 3000, paid: 3400 },
  { name: "May", total: 9100, organic: 5500, paid: 3600 },
  { name: "Jun", total: 10200, organic: 6200, paid: 4000 },
]

const productPerformanceData = [
  { name: "Product A", sales: 4000, revenue: 24000, growth: 15 },
  { name: "Product B", sales: 3000, revenue: 18000, growth: -5 },
  { name: "Product C", sales: 2000, revenue: 12000, growth: 10 },
  { name: "Product D", sales: 2780, revenue: 16680, growth: 22 },
  { name: "Product E", sales: 1890, revenue: 11340, growth: -2 },
]

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('')
  const [timeRange, setTimeRange] = useState('7d')
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


  return (
    <div className="flex h-screen bg-background">
      <LeftSideBar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="flex items-center justify-between px-6 py-6 border-b">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-4">
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
            <form onSubmit={(e) => e.preventDefault()} className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-8 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            <Button size="icon" variant="ghost">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <div className="flex items-center text-xs text-green-500">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span>+20.1% from last month</span>
                </div>
                <div className="h-[80px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData}>
                      <Line type="monotone" dataKey="total" stroke="#22c55e" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2,350</div>
                <div className="flex items-center text-xs text-green-500">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span>+180.1% from last month</span>
                </div>
                <div className="h-[80px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={userGrowthData}>
                      <Area type="monotone" dataKey="total" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.2%</div>
                <div className="flex items-center text-xs text-green-500">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span>+0.1% from last week</span>
                </div>
                <div className="h-[80px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { name: 'CR', value: 3.2 },
                      { name: 'Target', value: 3.5 },
                    ]}>
                      <Bar dataKey="value" fill="#22c55e" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$85.20</div>
                <div className="flex items-center text-xs text-red-500">
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                  <span>-2.5% from last month</span>
                </div>
                <div className="h-[80px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[
                      { name: 'Jan', value: 75 },
                      { name: 'Feb', value: 80 },
                      { name: 'Mar', value: 78 },
                      { name: 'Apr', value: 82 },
                      { name: 'May', value: 87 },
                      { name: 'Jun', value: 85 },
                    ]}>
                      <Line type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mt-6">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ChartContainer
                  config={{
                    total: {
                      label: "Revenue",
                      color: "hsl(var(--chart-1))",
                    },
                    target: {
                      label: "Target",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData}>
                      <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
                      <Bar dataKey="target" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-muted" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
              
            
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mt-6">
            <Card className="col-span-4">
              <Tabs defaultValue="performance" className="h-full flex flex-col">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Product Insights</CardTitle>
                    <TabsList>
                      <TabsTrigger value="performance">Performance</TabsTrigger>
                      <TabsTrigger value="trends">Trends</TabsTrigger>
                    </TabsList>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <TabsContent value="performance" className="h-full">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead>Sales</TableHead>
                          <TableHead>Revenue</TableHead>
                          <TableHead>Growth</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {productPerformanceData.map((product) => (
                          <TableRow key={product.name}>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.sales}</TableCell>
                            <TableCell>${product.revenue}</TableCell>
                            <TableCell>
                              <span className={product.growth > 0 ? "text-green-500" : "text-red-500"}>
                                {product.growth > 0 ? <ArrowUpRight className="inline h-4 w-4 mr-1" /> :
                                  <ArrowDownRight className="inline h-4 w-4 mr-1" />
                                }
                                {Math.abs(product.growth)}%
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TabsContent>
                  <TabsContent value="trends" className="h-full">
                    <ChartContainer
                      config={{
                        sales: {
                          label: "Sales",
                          color: "hsl(var(--chart-5))",
                        },
                        revenue: {
                          label: "Revenue",
                          color: "hsl(var(--chart-6))",
                        },
                      }}
                      className="h-[300px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={productPerformanceData}>
                          <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                          <YAxis yAxisId="left" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                          <YAxis yAxisId="right" orientation="right" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                          <Tooltip content={<ChartTooltipContent />} />
                          <Legend />
                          <Bar yAxisId="left" dataKey="sales" fill="hsl(var(--chart-5))" radius={[4, 4, 0, 0]} />
                          <Bar yAxisId="right" dataKey="revenue" fill="hsl(var(--chart-6))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}