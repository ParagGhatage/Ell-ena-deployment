"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTheme } from "next-themes"
import { useToast } from "@/hooks/use-toast"
import { Save } from "lucide-react"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()

  const [settings, setSettings] = useState({
    appearance: {
      theme: theme || "light",
      animations: true,
      reducedMotion: false,
    },
    privacy: {
      collectAnalytics: true,
      shareUsageData: true,
      allowCookies: true,
    },
    notifications: {
      emailDigest: true,
      taskReminders: true,
      meetingAlerts: true,
      desktopNotifications: false,
    },
    integrations: {
      github: false,
      jira: false,
      slack: true,
      google: true,
    },
  })

  const handleSwitchChange = (category: string, setting: string, checked: boolean) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: checked,
      },
    }))
  }

  const handleThemeChange = (newTheme: string) => {
    setSettings((prev) => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        theme: newTheme,
      },
    }))
    setTheme(newTheme)
  }

  const handleSaveSettings = (category: string) => {
    // Simulate saving settings
    toast({
      title: "Settings saved",
      description: `Your ${category} settings have been saved successfully.`,
    })
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">Manage your application settings and preferences</p>
        </div>
      </div>

      <Tabs defaultValue="appearance" className="space-y-6">
        <TabsList>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize how Ell-ena looks and feels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium">Theme</h3>
                <div className="grid grid-cols-3 gap-2">
                  <div
                    className={`border rounded-lg p-4 cursor-pointer ${
                      settings.appearance.theme === "light" ? "border-primary bg-primary/5" : ""
                    }`}
                    onClick={() => handleThemeChange("light")}
                  >
                    <div className="h-12 rounded-md bg-white border mb-2"></div>
                    <div className="text-sm font-medium text-center">Light</div>
                  </div>
                  <div
                    className={`border rounded-lg p-4 cursor-pointer ${
                      settings.appearance.theme === "dark" ? "border-primary bg-primary/5" : ""
                    }`}
                    onClick={() => handleThemeChange("dark")}
                  >
                    <div className="h-12 rounded-md bg-gray-900 border mb-2"></div>
                    <div className="text-sm font-medium text-center">Dark</div>
                  </div>
                  <div
                    className={`border rounded-lg p-4 cursor-pointer ${
                      settings.appearance.theme === "system" ? "border-primary bg-primary/5" : ""
                    }`}
                    onClick={() => handleThemeChange("system")}
                  >
                    <div className="h-12 rounded-md bg-gradient-to-r from-white to-gray-900 border mb-2"></div>
                    <div className="text-sm font-medium text-center">System</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Accessibility</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="animations" className="font-normal">
                      Enable animations
                    </Label>
                    <p className="text-sm text-muted-foreground">Show animations throughout the interface</p>
                  </div>
                  <Switch
                    id="animations"
                    checked={settings.appearance.animations}
                    onCheckedChange={(checked) => handleSwitchChange("appearance", "animations", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="reducedMotion" className="font-normal">
                      Reduced motion
                    </Label>
                    <p className="text-sm text-muted-foreground">Minimize animations for accessibility</p>
                  </div>
                  <Switch
                    id="reducedMotion"
                    checked={settings.appearance.reducedMotion}
                    onCheckedChange={(checked) => handleSwitchChange("appearance", "reducedMotion", checked)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="bg-primary hover:bg-primary/90 text-white"
                onClick={() => handleSaveSettings("appearance")}
              >
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Privacy</CardTitle>
              <CardDescription>Manage your privacy settings and data usage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="collectAnalytics" className="font-normal">
                    Collect analytics
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Allow us to collect anonymous usage data to improve the product
                  </p>
                </div>
                <Switch
                  id="collectAnalytics"
                  checked={settings.privacy.collectAnalytics}
                  onCheckedChange={(checked) => handleSwitchChange("privacy", "collectAnalytics", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="shareUsageData" className="font-normal">
                    Share usage data
                  </Label>
                  <p className="text-sm text-muted-foreground">Share anonymous usage data with our partners</p>
                </div>
                <Switch
                  id="shareUsageData"
                  checked={settings.privacy.shareUsageData}
                  onCheckedChange={(checked) => handleSwitchChange("privacy", "shareUsageData", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="allowCookies" className="font-normal">
                    Allow cookies
                  </Label>
                  <p className="text-sm text-muted-foreground">Allow us to use cookies to enhance your experience</p>
                </div>
                <Switch
                  id="allowCookies"
                  checked={settings.privacy.allowCookies}
                  onCheckedChange={(checked) => handleSwitchChange("privacy", "allowCookies", checked)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="bg-primary hover:bg-primary/90 text-white"
                onClick={() => handleSaveSettings("privacy")}
              >
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Configure how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailDigest" className="font-normal">
                    Email digest
                  </Label>
                  <p className="text-sm text-muted-foreground">Receive a daily email digest of your activity</p>
                </div>
                <Switch
                  id="emailDigest"
                  checked={settings.notifications.emailDigest}
                  onCheckedChange={(checked) => handleSwitchChange("notifications", "emailDigest", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="taskReminders" className="font-normal">
                    Task reminders
                  </Label>
                  <p className="text-sm text-muted-foreground">Receive reminders for upcoming and overdue tasks</p>
                </div>
                <Switch
                  id="taskReminders"
                  checked={settings.notifications.taskReminders}
                  onCheckedChange={(checked) => handleSwitchChange("notifications", "taskReminders", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="meetingAlerts" className="font-normal">
                    Meeting alerts
                  </Label>
                  <p className="text-sm text-muted-foreground">Receive alerts for upcoming meetings</p>
                </div>
                <Switch
                  id="meetingAlerts"
                  checked={settings.notifications.meetingAlerts}
                  onCheckedChange={(checked) => handleSwitchChange("notifications", "meetingAlerts", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="desktopNotifications" className="font-normal">
                    Desktop notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">Receive desktop notifications when the app is open</p>
                </div>
                <Switch
                  id="desktopNotifications"
                  checked={settings.notifications.desktopNotifications}
                  onCheckedChange={(checked) => handleSwitchChange("notifications", "desktopNotifications", checked)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="bg-primary hover:bg-primary/90 text-white"
                onClick={() => handleSaveSettings("notifications")}
              >
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>Connect Ell-ena with your other tools and services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-500"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">GitHub</h3>
                    <p className="text-sm text-muted-foreground">
                      Connect with GitHub to sync issues and pull requests
                    </p>
                  </div>
                </div>
                <Switch
                  id="github"
                  checked={settings.integrations.github}
                  onCheckedChange={(checked) => handleSwitchChange("integrations", "github", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-500"
                    >
                      <path d="M10.5 20H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H20a2 2 0 0 1 2 2v3"></path>
                      <circle cx="18" cy="18" r="3"></circle>
                      <path d="m19.5 15.5-3 3"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Jira</h3>
                    <p className="text-sm text-muted-foreground">Connect with Jira to sync tickets and projects</p>
                  </div>
                </div>
                <Switch
                  id="jira"
                  checked={settings.integrations.jira}
                  onCheckedChange={(checked) => handleSwitchChange("integrations", "jira", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-500"
                    >
                      <path d="M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z"></path>
                      <path d="M16 8H8v8h8V8Z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Slack</h3>
                    <p className="text-sm text-muted-foreground">Connect with Slack to receive notifications</p>
                  </div>
                </div>
                <Switch
                  id="slack"
                  checked={settings.integrations.slack}
                  onCheckedChange={(checked) => handleSwitchChange("integrations", "slack", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-500"
                    >
                      <path d="M12 22v-5"></path>
                      <path d="M9 8V2H5v6a3 3 0 0 0 0 6v6h4v-6"></path>
                      <path d="M15 8V2h4v6a3 3 0 0 1 0 6v6h-4v-6"></path>
                      <path d="M9 14h6"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Google</h3>
                    <p className="text-sm text-muted-foreground">Connect with Google to sync calendar and contacts</p>
                  </div>
                </div>
                <Switch
                  id="google"
                  checked={settings.integrations.google}
                  onCheckedChange={(checked) => handleSwitchChange("integrations", "google", checked)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="bg-primary hover:bg-primary/90 text-white"
                onClick={() => handleSaveSettings("integrations")}
              >
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

