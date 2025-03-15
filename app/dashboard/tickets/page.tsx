"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Filter, Plus, Search, Tag, UserIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface Ticket {
  id: string
  title: string
  description: string
  priority: "Low" | "Medium" | "High"
  status: "Open" | "In Progress" | "Resolved" | "Closed"
  assignee: string
  reporter: string
  created: string
  updated: string
  tags: string[]
}

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: "TICKET-001",
      title: "Implement dark mode across the application",
      description:
        "Users have requested a dark mode option. We need to implement this across all pages of the application.",
      priority: "High",
      status: "In Progress",
      assignee: "Alex Johnson",
      reporter: "Sarah Miller",
      created: "2025-03-10",
      updated: "2025-03-15",
      tags: ["UI", "Feature Request"],
    },
    {
      id: "TICKET-002",
      title: "Fix navigation bug on mobile devices",
      description:
        "The navigation menu doesn't work properly on mobile devices. It doesn't close when a menu item is selected.",
      priority: "High",
      status: "Open",
      assignee: "Unassigned",
      reporter: "Michael Chen",
      created: "2025-03-12",
      updated: "2025-03-12",
      tags: ["Bug", "Mobile"],
    },
    {
      id: "TICKET-003",
      title: "Add export to PDF functionality",
      description: "Users need to be able to export their reports to PDF format.",
      priority: "Medium",
      status: "Open",
      assignee: "Unassigned",
      reporter: "Emily Rodriguez",
      created: "2025-03-14",
      updated: "2025-03-14",
      tags: ["Feature Request"],
    },
    {
      id: "TICKET-004",
      title: "Optimize database queries for better performance",
      description: "The application is slow when loading large datasets. We need to optimize the database queries.",
      priority: "Medium",
      status: "Open",
      assignee: "David Kim",
      reporter: "Lisa Wong",
      created: "2025-03-15",
      updated: "2025-03-15",
      tags: ["Performance", "Backend"],
    },
    {
      id: "TICKET-005",
      title: "Update user documentation with new features",
      description: "The user documentation needs to be updated to include the new features added in the last release.",
      priority: "Low",
      status: "Open",
      assignee: "Unassigned",
      reporter: "James Wilson",
      created: "2025-03-15",
      updated: "2025-03-15",
      tags: ["Documentation"],
    },
  ])

  const [newTicket, setNewTicket] = useState<Omit<Ticket, "id" | "created" | "updated">>({
    title: "",
    description: "",
    priority: "Medium",
    status: "Open",
    assignee: "Unassigned",
    reporter: "",
    tags: [],
  })

  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [tagInput, setTagInput] = useState("")

  const { toast } = useToast()

  const handleAddTicket = () => {
    if (!newTicket.title.trim()) {
      toast({
        title: "Ticket title required",
        description: "Please enter a title for your ticket.",
        variant: "destructive",
      })
      return
    }

    const ticket: Ticket = {
      ...newTicket,
      id: `TICKET-${String(tickets.length + 1).padStart(3, "0")}`,
      created: new Date().toISOString().split("T")[0],
      updated: new Date().toISOString().split("T")[0],
    }

    setTickets([...tickets, ticket])
    setNewTicket({
      title: "",
      description: "",
      priority: "Medium",
      status: "Open",
      assignee: "Unassigned",
      reporter: "",
      tags: [],
    })

    setIsDialogOpen(false)

    toast({
      title: "Ticket created",
      description: "Your ticket has been created successfully.",
    })
  }

  const handleAddTag = () => {
    if (!tagInput.trim()) return

    if (!newTicket.tags.includes(tagInput)) {
      setNewTicket({
        ...newTicket,
        tags: [...newTicket.tags, tagInput],
      })
    }

    setTagInput("")
  }

  const handleRemoveTag = (tag: string) => {
    setNewTicket({
      ...newTicket,
      tags: newTicket.tags.filter((t) => t !== tag),
    })
  }

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const openTickets = filteredTickets.filter((ticket) => ticket.status === "Open")
  const inProgressTickets = filteredTickets.filter((ticket) => ticket.status === "In Progress")
  const resolvedTickets = filteredTickets.filter((ticket) => ticket.status === "Resolved")
  const closedTickets = filteredTickets.filter((ticket) => ticket.status === "Closed")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Tickets</h2>
          <p className="text-muted-foreground">Manage and track issues and feature requests</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Create Ticket
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Ticket</DialogTitle>
              <DialogDescription>Create a new ticket for an issue or feature request.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Ticket title"
                  value={newTicket.title}
                  onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Detailed description of the issue or feature request"
                  rows={4}
                  value={newTicket.description}
                  onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={newTicket.priority}
                    onValueChange={(value) =>
                      setNewTicket({ ...newTicket, priority: value as "Low" | "Medium" | "High" })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={newTicket.status}
                    onValueChange={(value) =>
                      setNewTicket({ ...newTicket, status: value as "Open" | "In Progress" | "Resolved" | "Closed" })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Open">Open</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Resolved">Resolved</SelectItem>
                      <SelectItem value="Closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="assignee">Assignee</Label>
                  <Select
                    value={newTicket.assignee}
                    onValueChange={(value) => setNewTicket({ ...newTicket, assignee: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select assignee" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Unassigned">Unassigned</SelectItem>
                      <SelectItem value="Alex Johnson">Alex Johnson</SelectItem>
                      <SelectItem value="David Kim">David Kim</SelectItem>
                      <SelectItem value="Emily Rodriguez">Emily Rodriguez</SelectItem>
                      <SelectItem value="Michael Chen">Michael Chen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reporter">Reporter</Label>
                  <Input
                    id="reporter"
                    placeholder="Your name"
                    value={newTicket.reporter}
                    onChange={(e) => setNewTicket({ ...newTicket, reporter: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex space-x-2">
                  <Input
                    id="tags"
                    placeholder="Add tag"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                  />
                  <Button type="button" variant="outline" onClick={handleAddTag}>
                    Add
                  </Button>
                </div>
                {newTicket.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newTicket.tags.map((tag, index) => (
                      <div
                        key={index}
                        className="bg-secondary/20 text-secondary-foreground px-2 py-1 rounded-full text-xs flex items-center"
                      >
                        {tag}
                        <button
                          type="button"
                          className="ml-1 hover:text-destructive"
                          onClick={() => handleRemoveTag(tag)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-primary hover:bg-primary/90 text-white" onClick={handleAddTicket}>
                Create Ticket
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-[300px]">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tickets..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="w-full sm:w-auto">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full sm:w-auto">
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Tickets ({filteredTickets.length})</TabsTrigger>
          <TabsTrigger value="open">Open ({openTickets.length})</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress ({inProgressTickets.length})</TabsTrigger>
          <TabsTrigger value="resolved">Resolved ({resolvedTickets.length})</TabsTrigger>
          <TabsTrigger value="closed">Closed ({closedTickets.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTickets.length === 0 ? (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                No tickets found. Try adjusting your filters or create a new ticket.
              </div>
            ) : (
              filteredTickets.map((ticket) => (
                <Card key={ticket.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">{ticket.title}</CardTitle>
                        <CardDescription className="text-xs">{ticket.id}</CardDescription>
                      </div>
                      <div
                        className={`text-xs px-2 py-1 rounded-full ${
                          ticket.priority === "High"
                            ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                            : ticket.priority === "Medium"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                              : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                        }`}
                      >
                        {ticket.priority}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{ticket.description}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {ticket.tags.map((tag, index) => (
                        <div
                          key={index}
                          className="bg-secondary/20 text-secondary-foreground px-2 py-0.5 rounded-full text-xs flex items-center"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <UserIcon className="h-3 w-3 mr-1" />
                        {ticket.assignee}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(ticket.updated).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-1">
                    <div
                      className={`w-full text-center text-xs py-1 rounded-full ${
                        ticket.status === "Open"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                          : ticket.status === "In Progress"
                            ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                            : ticket.status === "Resolved"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
                      }`}
                    >
                      {ticket.status}
                    </div>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="open" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {openTickets.length === 0 ? (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                No open tickets found. Try adjusting your filters or create a new ticket.
              </div>
            ) : (
              openTickets.map((ticket) => (
                <Card key={ticket.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">{ticket.title}</CardTitle>
                        <CardDescription className="text-xs">{ticket.id}</CardDescription>
                      </div>
                      <div
                        className={`text-xs px-2 py-1 rounded-full ${
                          ticket.priority === "High"
                            ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                            : ticket.priority === "Medium"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                              : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                        }`}
                      >
                        {ticket.priority}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{ticket.description}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {ticket.tags.map((tag, index) => (
                        <div
                          key={index}
                          className="bg-secondary/20 text-secondary-foreground px-2 py-0.5 rounded-full text-xs flex items-center"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <UserIcon className="h-3 w-3 mr-1" />
                        {ticket.assignee}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(ticket.updated).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-1">
                    <div className="w-full text-center text-xs py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                      {ticket.status}
                    </div>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="in-progress" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {inProgressTickets.length === 0 ? (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                No in-progress tickets found. Try adjusting your filters or create a new ticket.
              </div>
            ) : (
              inProgressTickets.map((ticket) => (
                <Card key={ticket.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">{ticket.title}</CardTitle>
                        <CardDescription className="text-xs">{ticket.id}</CardDescription>
                      </div>
                      <div
                        className={`text-xs px-2 py-1 rounded-full ${
                          ticket.priority === "High"
                            ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                            : ticket.priority === "Medium"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                              : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                        }`}
                      >
                        {ticket.priority}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{ticket.description}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {ticket.tags.map((tag, index) => (
                        <div
                          key={index}
                          className="bg-secondary/20 text-secondary-foreground px-2 py-0.5 rounded-full text-xs flex items-center"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <UserIcon className="h-3 w-3 mr-1" />
                        {ticket.assignee}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(ticket.updated).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-1">
                    <div className="w-full text-center text-xs py-1 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                      {ticket.status}
                    </div>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="resolved" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {resolvedTickets.length === 0 ? (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                No resolved tickets found. Try adjusting your filters or create a new ticket.
              </div>
            ) : (
              resolvedTickets.map((ticket) => (
                <Card key={ticket.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">{ticket.title}</CardTitle>
                        <CardDescription className="text-xs">{ticket.id}</CardDescription>
                      </div>
                      <div
                        className={`text-xs px-2 py-1 rounded-full ${
                          ticket.priority === "High"
                            ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                            : ticket.priority === "Medium"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                              : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                        }`}
                      >
                        {ticket.priority}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{ticket.description}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {ticket.tags.map((tag, index) => (
                        <div
                          key={index}
                          className="bg-secondary/20 text-secondary-foreground px-2 py-0.5 rounded-full text-xs flex items-center"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <UserIcon className="h-3 w-3 mr-1" />
                        {ticket.assignee}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(ticket.updated).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-1">
                    <div className="w-full text-center text-xs py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                      {ticket.status}
                    </div>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="closed" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {closedTickets.length === 0 ? (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                No closed tickets found. Try adjusting your filters or create a new ticket.
              </div>
            ) : (
              closedTickets.map((ticket) => (
                <Card key={ticket.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">{ticket.title}</CardTitle>
                        <CardDescription className="text-xs">{ticket.id}</CardDescription>
                      </div>
                      <div
                        className={`text-xs px-2 py-1 rounded-full ${
                          ticket.priority === "High"
                            ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                            : ticket.priority === "Medium"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                              : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                        }`}
                      >
                        {ticket.priority}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{ticket.description}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {ticket.tags.map((tag, index) => (
                        <div
                          key={index}
                          className="bg-secondary/20 text-secondary-foreground px-2 py-0.5 rounded-full text-xs flex items-center"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <UserIcon className="h-3 w-3 mr-1" />
                        {ticket.assignee}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(ticket.updated).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-1">
                    <div className="w-full text-center text-xs py-1 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300">
                      {ticket.status}
                    </div>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

