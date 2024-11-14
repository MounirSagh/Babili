import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LayoutDashboard, Package, ListTree, TrendingUp, Bell } from 'lucide-react'
import { Separator } from './ui/separator'

interface NavItemProps {
  label: string
  path: string
  icon: React.ReactNode
}

const navigationItems: NavItemProps[] = [
  {
    label: 'Dashboard',
    path: '/Admin/Dashboard',
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  { 
    label: 'Products', 
    path: '/Admin/Products', 
    icon: <Package className="h-4 w-4" />
  },
  { 
    label: 'Categories', 
    path: '/Admin/Categories',
    icon: <ListTree className="h-4 w-4" />
  },
  { 
    label: 'Subcategories', 
    path: '/Admin/Subcategories',
    icon: <ListTree className="h-4 w-4" />
  },
  {
    label: 'Sales',
    path: '/Admin/Sales',
    icon: <TrendingUp className="h-4 w-4" />,
  },
  {
    label: 'Sales Analytics',
    path: '/Admin/Sales-Analytics',
    icon: <TrendingUp className="h-4 w-4" />,
  },
  {
    label: 'Notifications',
    path: '/Admin/Notifications',
    icon: <Bell className="h-4 w-4" />,
  },
]

const NavItem = ({ item }: { item: NavItemProps }) => {
  const location = useLocation()
  const isActive = location.pathname === item.path

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            asChild
            variant={isActive ? "default" : "ghost"}
            className={`w-full justify-start ${isActive ? " font-medium hover:bg-muted" : ""}`}
          >
            <Link to={item.path}>
              {item.icon}
              <span className="ml-2">{item.label}</span>
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{item.label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

interface SidebarProps {
  className?: string
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  return (
    <div className={`w-64 flex-col border-r bg-background hidden md:flex ${className}`}>
      <div className="p-4 text-center ml-14">
        <img src="/src//assets/LOGO-Babili-3.png" className="w-24" />     
      </div>
      <ScrollArea className="flex-1 mt-10">
        <div className="space-y-1 p-2">
          <h3 className="mb-2 px-4 text-sm font-semibold tracking-tight">
            Planning
          </h3>
          <nav className="space-y-1">
            {navigationItems.map((item, index) => (
              <NavItem key={index} item={item} />
            ))}
          </nav>
        </div>
      </ScrollArea>
      <div className="mt-auto p-4">
        <Button variant="outline" className="w-full">
          Logout
        </Button>
      </div>
    </div>
  )
}

export default Sidebar