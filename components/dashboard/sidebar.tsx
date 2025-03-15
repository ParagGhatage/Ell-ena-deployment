"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Cog,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Ticket,
  User,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface SidebarProps {
  className?: string
}

export default function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const { toast } = useToast()
  const router = useRouter()

  const mainNavItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Tasks",
      href: "/dashboard/tasks",
      icon: <ClipboardList className="h-5 w-5" />,
    },
    {
      title: "Tickets",
      href: "/dashboard/tickets",
      icon: <Ticket className="h-5 w-5" />,
    },
    {
      title: "Chat",
      href: "/dashboard/chat",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      title: "Calendar",
      href: "/dashboard/calendar",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "Analytics",
      href: "/dashboard/analytics",
      icon: <BarChart className="h-5 w-5" />,
    },
  ]

  const secondaryNavItems = [
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: <User className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: <Cog className="h-5 w-5" />,
    },
  ]

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("ellena-user")

    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })

    // Redirect to home page
    router.push("/")
  }

  return (
    <div
      className={cn(
        "flex flex-col border-r bg-background h-screen sticky top-0 transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className,
      )}
    >
      <div className="flex h-14 items-center px-4 border-b">
        <Link href="/" className="flex items-center space-x-2">
          {!collapsed && (
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Ell-ena
            </span>
          )}
          {collapsed && (
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              E
            </span>
          )}
        </Link>
        <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          {mainNavItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                collapsed && "justify-center px-2",
              )}
            >
              {item.icon}
              {!collapsed && <span>{item.title}</span>}
            </Link>
          ))}
        </nav>
        <div className="mt-4 px-4">
          <div className="border-t pt-4">
            <nav className="grid gap-1 px-2">
              {secondaryNavItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                    pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                    collapsed && "justify-center px-2",
                  )}
                >
                  {item.icon}
                  {!collapsed && <span>{item.title}</span>}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="border-t p-4">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            collapsed && "justify-center px-2",
          )}
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span className="ml-2">Log out</span>}
        </Button>
      </div>
    </div>
  )
}

