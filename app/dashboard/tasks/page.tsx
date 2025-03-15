"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Filter, Plus, Search, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Task {
  id: string
  title: string
  description: string
  priority: "Low" | "Medium" | "High"
  status: "To Do" | "In Progress" | "Done"
  dueDate: string
  completed: boolean
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Complete dark mode implementation",
      description: "Implement dark mode across all pages of the application",
      priority: "High",
      status: "In Progress",
      dueDate: "2025-03-16",
      completed: false,
    },
    {
      id: "2",
      title: "Review pull request #42",
      description: "Review and approve the pull request for the new feature",
      priority: "Medium",
      status: "To Do",
      dueDate: "2025-03-17",
      completed: false,
    },
    {
      id: "3",
      title: "Prepare for weekly team meeting",
      description: "Create agenda and prepare slides for the weekly team meeting",
      priority: "Medium",
      status: "To Do",
      dueDate: "2025-03-17",
      completed: false,
    },
    {
      id: "4",
      title: "Fix navigation bug on mobile",
      description: "Fix the navigation menu that doesn't work properly on mobile devices",
      priority: "High",
      status: "To Do",
      dueDate: "2025-03-18",
      completed: false,
    },
    {
      id: "5",
      title: "Update user documentation",
      description: "Update the user documentation with the latest features",
      priority: "Low",
      status: "To Do",
      dueDate: "2025-03-20",
      completed: false,
    },
  ])

  const [newTask, setNewTask] = useState<Omit<Task, "id" | "completed">>({
    title: "",
    description: "",
    priority: "Medium",
    status: "To Do",
    dueDate: new Date().toISOString().split("T")[0],
  })

  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { toast } = useToast()

  const handleAddTask = () => {
    if (!newTask.title.trim()) {
      toast({
        title: "Task title required",
        description: "Please enter a title for your task.",
        variant: "destructive",
      })
      return
    }

    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
      completed: false,
    }

    setTasks([...tasks, task])
    setNewTask({
      title: "",
      description: "",
      priority: "Medium",
      status: "To Do",
      dueDate: new Date().toISOString().split("T")[0],
    })

    setIsDialogOpen(false)

    toast({
      title: "Task added",
      description: "Your task has been added successfully.",
    })
  }

  const handleToggleComplete = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))

    toast({
      title: "Task deleted",
      description: "Your task has been deleted successfully.",
    })
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || task.status === statusFilter
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const todoTasks = filteredTasks.filter((task) => task.status === "To Do")
  const inProgressTasks = filteredTasks.filter((task) => task.status === "In Progress")
  const doneTasks = filteredTasks.filter((task) => task.status === "Done")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Tasks</h2>
          <p className="text-muted-foreground">Manage your tasks and to-do items</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
              <DialogDescription>Create a new task or to-do item.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Task title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Task description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={newTask.priority}
                    onValueChange={(value) => setNewTask({ ...newTask, priority: value as "Low" | "Medium" | "High" })}
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
                    value={newTask.status}
                    onValueChange={(value) =>
                      setNewTask({ ...newTask, status: value as "To Do" | "In Progress" | "Done" })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="To Do">To Do</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Done">Done</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-primary hover:bg-primary/90 text-white" onClick={handleAddTask}>
                Add Task
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-[300px]">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
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
                <SelectItem value="To Do">To Do</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Done">Done</SelectItem>
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
          <TabsTrigger value="all">All Tasks ({filteredTasks.length})</TabsTrigger>
          <TabsTrigger value="todo">To Do ({todoTasks.length})</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress ({inProgressTasks.length})</TabsTrigger>
          <TabsTrigger value="done">Done ({doneTasks.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <div className="space-y-4">
            {filteredTasks.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No tasks found. Try adjusting your filters or add a new task.
              </div>
            ) : (
              filteredTasks.map((task) => (
                <div key={task.id} className={`border rounded-lg p-4 ${task.completed ? "bg-muted/50" : "bg-card"}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => handleToggleComplete(task.id)}
                        className="mt-1"
                      />
                      <div>
                        <h3 className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                          {task.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <div
                            className={`text-xs px-2 py-1 rounded-full ${
                              task.priority === "High"
                                ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                                : task.priority === "Medium"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                                  : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                            }`}
                          >
                            {task.priority} Priority
                          </div>
                          <div
                            className={`text-xs px-2 py-1 rounded-full ${
                              task.status === "To Do"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                                : task.status === "In Progress"
                                  ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                                  : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                            }`}
                          >
                            {task.status}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-1 h-4 w-4" />
                        {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteTask(task.id)}>
                        <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="todo" className="mt-4">
          <div className="space-y-4">
            {todoTasks.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No to-do tasks found. Try adjusting your filters or add a new task.
              </div>
            ) : (
              todoTasks.map((task) => (
                <div key={task.id} className={`border rounded-lg p-4 ${task.completed ? "bg-muted/50" : "bg-card"}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => handleToggleComplete(task.id)}
                        className="mt-1"
                      />
                      <div>
                        <h3 className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                          {task.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <div
                            className={`text-xs px-2 py-1 rounded-full ${
                              task.priority === "High"
                                ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                                : task.priority === "Medium"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                                  : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                            }`}
                          >
                            {task.priority} Priority
                          </div>
                          <div
                            className={`text-xs px-2 py-1 rounded-full ${
                              task.status === "To Do"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                                : task.status === "In Progress"
                                  ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                                  : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                            }`}
                          >
                            {task.status}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-1 h-4 w-4" />
                        {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteTask(task.id)}>
                        <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="in-progress" className="mt-4">
          <div className="space-y-4">
            {inProgressTasks.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No in-progress tasks found. Try adjusting your filters or add a new task.
              </div>
            ) : (
              inProgressTasks.map((task) => (
                <div key={task.id} className={`border rounded-lg p-4 ${task.completed ? "bg-muted/50" : "bg-card"}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => handleToggleComplete(task.id)}
                        className="mt-1"
                      />
                      <div>
                        <h3 className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                          {task.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <div
                            className={`text-xs px-2 py-1 rounded-full ${
                              task.priority === "High"
                                ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                                : task.priority === "Medium"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                                  : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                            }`}
                          >
                            {task.priority} Priority
                          </div>
                          <div
                            className={`text-xs px-2 py-1 rounded-full ${
                              task.status === "To Do"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                                : task.status === "In Progress"
                                  ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                                  : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                            }`}
                          >
                            {task.status}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-1 h-4 w-4" />
                        {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteTask(task.id)}>
                        <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="done" className="mt-4">
          <div className="space-y-4">
            {doneTasks.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No completed tasks found. Try adjusting your filters or add a new task.
              </div>
            ) : (
              doneTasks.map((task) => (
                <div key={task.id} className={`border rounded-lg p-4 ${task.completed ? "bg-muted/50" : "bg-card"}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => handleToggleComplete(task.id)}
                        className="mt-1"
                      />
                      <div>
                        <h3 className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                          {task.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <div
                            className={`text-xs px-2 py-1 rounded-full ${
                              task.priority === "High"
                                ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                                : task.priority === "Medium"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                                  : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                            }`}
                          >
                            {task.priority} Priority
                          </div>
                          <div
                            className={`text-xs px-2 py-1 rounded-full ${
                              task.status === "To Do"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                                : task.status === "In Progress"
                                  ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                                  : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                            }`}
                          >
                            {task.status}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-1 h-4 w-4" />
                        {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteTask(task.id)}>
                        <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

