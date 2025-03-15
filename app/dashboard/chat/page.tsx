"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bot, Calendar, ClipboardList, Loader2, Mic, PaperclipIcon, Send, Ticket, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  status?: "sending" | "sent" | "error"
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi there! I'm Ell-ena, your AI product manager. How can I help you today?",
      timestamp: new Date(),
      status: "sent",
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
      status: "sent",
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response based on user input
    setTimeout(() => {
      let response = ""

      if (input.toLowerCase().includes("ticket") && input.toLowerCase().includes("dark mode")) {
        response =
          "I've created a ticket for the dark mode feature. I've added it to your backlog with high priority. Would you like me to assign it to anyone specific?"

        toast({
          title: "Ticket Created",
          description: "A new ticket for dark mode has been created.",
        })
      } else if (input.toLowerCase().includes("to-do") || input.toLowerCase().includes("todo")) {
        response = "I've added that to your to-do list. Would you like me to set a deadline or priority for this task?"

        toast({
          title: "Task Added",
          description: "A new task has been added to your to-do list.",
        })
      } else if (input.toLowerCase().includes("meeting") || input.toLowerCase().includes("transcribe")) {
        response =
          "I'll transcribe your next meeting. Just let me know when it's scheduled, and I'll make sure to capture all the important points and action items."
      } else if (input.toLowerCase().includes("hello") || input.toLowerCase().includes("hi")) {
        response = "Hello! How can I assist you with your tasks and project management today?"
      } else {
        response =
          "I understand you need assistance with that. Could you provide more details so I can help you better?"
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
        status: "sent",
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Chat with Ell-ena</h2>
          <p className="text-muted-foreground">Ask Ell-ena to create tasks, tickets, or transcribe meetings</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Meeting
          </Button>
          <Button variant="outline" size="sm">
            <ClipboardList className="mr-2 h-4 w-4" />
            View Tasks
          </Button>
          <Button variant="outline" size="sm">
            <Ticket className="mr-2 h-4 w-4" />
            View Tickets
          </Button>
        </div>
      </div>

      <div className="flex-1 border rounded-lg overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className="flex items-start max-w-[80%] space-x-2">
                {message.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                )}

                <div
                  className={`p-3 rounded-lg ${
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  <p>{message.content}</p>
                  <div className="mt-1 text-xs opacity-70 text-right">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    {message.status === "sending" && " · Sending..."}
                    {message.status === "error" && " · Failed to send"}
                  </div>
                </div>

                {message.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                    <User className="h-5 w-5" />
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start max-w-[80%] space-x-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <div className="p-3 rounded-lg bg-muted">
                  <div className="flex space-x-1">
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="border-t p-4">
          <div className="flex space-x-2">
            <Button variant="outline" size="icon">
              <PaperclipIcon className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Mic className="h-5 w-5" />
            </Button>
            <Input
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={isTyping || !input.trim()}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              {isTyping ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            </Button>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            Try asking: "Create a ticket for the dark mode feature" or "Add a to-do item for my math assignment"
          </div>
        </div>
      </div>
    </div>
  )
}

