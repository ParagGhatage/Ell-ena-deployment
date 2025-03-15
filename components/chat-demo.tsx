"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bot, Send, User } from "lucide-react"

type Message = {
  role: "user" | "assistant"
  content: string
}

export default function ChatDemo() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi there! I'm Ell-ena, your AI product manager. How can I help you today?",
    },
  ])

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    setMessages([...messages, { role: "user", content: input }])
    setInput("")

    // Simulate AI response
    setTimeout(() => {
      let response = ""

      if (input.toLowerCase().includes("ticket") && input.toLowerCase().includes("dark mode")) {
        response =
          "I've created a ticket for the dark mode feature. I've added it to your backlog with high priority. Would you like me to assign it to anyone specific?"
      } else if (input.toLowerCase().includes("to-do") || input.toLowerCase().includes("todo")) {
        response = "I've added that to your to-do list. Would you like me to set a deadline or priority for this task?"
      } else if (input.toLowerCase().includes("meeting") || input.toLowerCase().includes("transcribe")) {
        response =
          "I'll transcribe your next meeting. Just let me know when it's scheduled, and I'll make sure to capture all the important points and action items."
      } else {
        response =
          "I understand you need assistance with that. Could you provide more details so I can help you better?"
      }

      setMessages((prev) => [...prev, { role: "assistant", content: response }])
    }, 1000)
  }

  return (
    <section id="demo" className="py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-secondary/20 px-3 py-1 text-sm">Interactive Demo</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">See Ell-ena in Action</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Try out the chat interface and see how Ell-ena can help manage your tasks and projects.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-3xl border rounded-xl shadow-lg overflow-hidden">
          <div className="bg-primary/10 p-4 border-b">
            <div className="flex items-center space-x-2">
              <Bot className="h-6 w-6 text-primary" />
              <h3 className="font-semibold">Ell-ena Chat Demo</h3>
            </div>
          </div>

          <div className="h-[400px] overflow-y-auto p-4 flex flex-col space-y-4 bg-gray-50 dark:bg-gray-900">
            {messages.map((message, index) => (
              <div key={index} className={`flex items-start space-x-2 ${message.role === "user" ? "justify-end" : ""}`}>
                {message.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === "user"
                      ? "bg-primary/20 text-gray-800 dark:text-gray-100"
                      : "bg-secondary/20 text-gray-800 dark:text-gray-100"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>

                {message.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-4 border-t bg-background">
            <div className="flex space-x-2">
              <Input
                placeholder="Try: 'Create a ticket for the dark mode feature'"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1"
              />
              <Button onClick={handleSend} className="bg-primary hover:bg-primary/90 text-white">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Try asking: "Create a ticket for the dark mode feature" or "Add a to-do item for my math assignment"
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

