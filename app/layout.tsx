import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import AuthCheck from "@/components/auth-check"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ell-ena | AI-Powered Product Manager",
  description:
    "Automate task management with AI that creates to-do items, tickets, and transcribes meetings while maintaining full work context.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthCheck>{children}</AuthCheck>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'