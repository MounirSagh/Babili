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
import { LayoutDashboard, Package, ListTree, TrendingUp, Bell, Menu, X } from 'lucide-react'
import { useClerk } from '@clerk/clerk-react'

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
            className={`w-full justify-start text-sm sm:text-base ${
              isActive 
                ? "bg-gray-100 text-black font-medium hover:bg-gray-200" 
                : "text-black/80 hover:bg-gray-100 hover:text-black"
            }`}
          >
            <Link to={item.path} className="flex items-center w-full py-2">
              <span className="flex items-center justify-center w-8">
                {item.icon}
              </span>
              <span className="ml-2 truncate">{item.label}</span>
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right" className="hidden md:block">
          <p>{item.label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

interface SidebarProps {
  className?: string
  isVisible?: boolean
  onToggle?: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ className, isVisible = false, onToggle }) => {
  const { signOut } = useClerk()

  return (
    <>
      {/* Menu Toggle Button - Visible on phones and tablets, hidden on laptops */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-2 left-2 z-50 lg:hidden h-10 w-10"
        onClick={onToggle}
        aria-label={isVisible ? "Close menu" : "Open menu"}
      >
        {isVisible ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-40
          w-[240px] sm:w-[280px] flex flex-col bg-white
          border-r shadow-lg
          transition-all duration-300 ease-in-out
          ${isVisible ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static
          ${className}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-3 sm:p-4 text-center border-b flex-shrink-0">
            <img 
              src="/src/assets/LOGO-Babili-3.png" 
              className="w-16 sm:w-24 mx-auto" 
              alt="Logo" 
            />     
          </div>

          {/* Navigation Section */}
          <ScrollArea className="flex-grow px-2 sm:px-4 py-4">
            <div className="space-y-1">
              <h3 className="px-2 text-xs sm:text-sm font-semibold tracking-tight text-black mb-4">
                Planning
              </h3>
              <nav className="space-y-1">
                {navigationItems.map((item, index) => (
                  <NavItem key={index} item={item} />
                ))}
              </nav>
            </div>
          </ScrollArea>

          {/* Logout Section */}
          <div className="p-3 sm:p-4 border-t mt-auto flex-shrink-0">
            <Button 
              variant="outline" 
              className="w-full text-sm sm:text-base py-2 px-4 text-black hover:text-black/80" 
              onClick={() => signOut({ redirectUrl: '/' })}
            >
              Log out
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay - Visible on phones and tablets, hidden on laptops */}
      {isVisible && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}
    </>
  )
}

export default Sidebar