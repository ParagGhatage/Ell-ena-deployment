"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, CheckCircle2, Clock, ListTodo, Plus, Ticket, TrendingUp } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import {
  Chart,
  ChartContainer,
  ChartGrid,
  ChartLineSeries,
  ChartTooltip,
  ChartTooltipContent,
  ChartXAxis,
  ChartYAxis,
} from "@/components/ui/chart"

interface User {
  name?: string
  email: string
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [greeting, setGreeting] = useState("")

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem("ellena-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    // Set greeting based on time of day
    const hour = new Date().getHours()
    if (hour < 12) {
      setGreeting("Good morning")
    } else if (hour < 18) {
      setGreeting("Good afternoon")
    } else {
      setGreeting("Good evening")
    }
  }, [])

  // Sample data for charts
  const taskCompletionData = [
    { date: "Mon", completed: 5 },
    { date: "Tue", completed: 8 },
    { date: "Wed", completed: 12 },
    { date: "Thu", completed: 7 },
    { date: "Fri", completed: 10 },
    { date: "Sat", completed: 3 },
    { date: "Sun", completed: 2 },
  ]

  const productivityData = [
    { date: "Mon", productivity: 65 },
    { date: "Tue", productivity: 72 },
    { date: "Wed", productivity: 85 },
    { date: "Thu", productivity: 78 },
    { date: "Fri", productivity: 90 },
    { date: "Sat", productivity: 45 },
    { date: "Sun", productivity: 40 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            {greeting}, {user?.name || user?.email.split("@")[0]}
          </h2>
          <p className="text-muted-foreground">Here's an overview of your productivity and tasks.</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <Button className="bg-primary hover:bg-primary/90 text-white">
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <ListTodo className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+2 from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">16</div>
            <p className="text-xs text-muted-foreground">67% completion rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">3 high priority</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Meetings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Next: 2:00 PM Today</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
            <CardDescription>Your task completion over the past week</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <Chart>
              <ChartContainer>
                <ChartGrid />
                <ChartYAxis />
                <ChartXAxis />
                <ChartLineSeries
                  data={taskCompletionData}
                  xAccessor={(d) => d.date}
                  yAccessor={(d) => d.completed}
                  className="stroke-primary"
                />
                <ChartTooltip>
                  <ChartTooltipContent />
                </ChartTooltip>
              </ChartContainer>
            </Chart>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Productivity Score</CardTitle>
            <CardDescription>Your daily productivity metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Today</div>
                  <div className="text-sm text-muted-foreground">85%</div>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">This Week</div>
                  <div className="text-sm text-muted-foreground">72%</div>
                </div>
                <Progress value={72} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">This Month</div>
                  <div className="text-sm text-muted-foreground">68%</div>
                </div>
                <Progress value={68} className="h-2" />
              </div>
              <div className="pt-4 flex items-center">
                <TrendingUp className="mr-2 h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Your productivity is up 12% from last week</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Tabs defaultValue="upcoming">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming Tasks</TabsTrigger>
              <TabsTrigger value="recent">Recent Activity</TabsTrigger>
            </TabsList>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
          <TabsContent value="upcoming" className="mt-4">
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {[
                    {
                      title: "Complete dark mode implementation",
                      priority: "High",
                      due: "Today, 5:00 PM",
                      type: "Ticket",
                    },
                    {
                      title: "Review pull request #42",
                      priority: "Medium",
                      due: "Tomorrow, 10:00 AM",
                      type: "Task",
                    },
                    {
                      title: "Prepare for weekly team meeting",
                      priority: "Medium",
                      due: "Tomorrow, 2:00 PM",
                      type: "Task",
                    },
                    {
                      title: "Fix navigation bug on mobile",
                      priority: "High",
                      due: "Wednesday, 12:00 PM",
                      type: "Ticket",
                    },
                    {
                      title: "Update user documentation",
                      priority: "Low",
                      due: "Friday, 4:00 PM",
                      type: "Task",
                    },
                  ].map((task, i) => (
                    <div key={i} className="flex items-center justify-between p-4">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            task.priority === "High"
                              ? "bg-red-500"
                              : task.priority === "Medium"
                                ? "bg-yellow-500"
                                : "bg-green-500"
                          }`}
                        />
                        <div>
                          <p className="font-medium">{task.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {task.type} • {task.priority} Priority
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{task.due}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="recent" className="mt-4">
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {[
                    {
                      title: "Created ticket for user authentication bug",
                      time: "Today, 11:32 AM",
                      type: "Ticket Created",
                    },
                    {
                      title: "Completed homepage redesign task",
                      time: "Today, 10:15 AM",
                      type: "Task Completed",
                    },
                    {
                      title: "Added 3 items to your to-do list",
                      time: "Yesterday, 4:45 PM",
                      type: "Tasks Added",
                    },
                    {
                      title: "Transcribed team standup meeting",
                      time: "Yesterday, 9:30 AM",
                      type: "Meeting Transcribed",
                    },
                    {
                      title: "Updated project timeline",
                      time: "Monday, 2:20 PM",
                      type: "Project Updated",
                    },
                  ].map((activity, i) => (
                    <div key={i} className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">{activity.type}</p>
                      </div>
                      <div className="text-sm text-muted-foreground">{activity.time}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

