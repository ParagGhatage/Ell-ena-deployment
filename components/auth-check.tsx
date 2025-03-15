"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Loader2 } from "lucide-react"

interface AuthCheckProps {
  children: React.ReactNode
}

export default function AuthCheck({ children }: AuthCheckProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      const user = localStorage.getItem("ellena-user")

      if (!user && !pathname.includes("/auth/")) {
        // Redirect to sign in if not authenticated and trying to access protected route
        router.push("/auth/sign-in")
      } else if (user && pathname.includes("/auth/")) {
        // Redirect to dashboard if already authenticated and trying to access auth pages
        router.push("/dashboard")
      } else {
        setIsAuthenticated(!!user)
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [pathname, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // For auth pages, we don't need to check authentication
  if (pathname.includes("/auth/") || pathname === "/") {
    return <>{children}</>
  }

  // For protected routes, only render if authenticated
  return isAuthenticated ? <>{children}</> : null
}

