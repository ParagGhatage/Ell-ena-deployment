import { Bot, Calendar, ClipboardList, MessageSquare, Network, Ticket } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Features() {
  const features = [
    {
      icon: <Ticket className="h-10 w-10 text-primary" />,
      title: "Automated Ticket Creation",
      description:
        "Ell-ena creates detailed tickets with proper context, saving you time and ensuring nothing falls through the cracks.",
    },
    {
      icon: <ClipboardList className="h-10 w-10 text-primary" />,
      title: "Smart To-Do Lists",
      description: "Add to-do items naturally through chat, and Ell-ena will organize and prioritize them for you.",
    },
    {
      icon: <Calendar className="h-10 w-10 text-primary" />,
      title: "Meeting Transcription",
      description: "Automatically transcribe and summarize meetings, extracting action items and decisions.",
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-primary" />,
      title: "Natural Chat Interface",
      description: "Interact with Ell-ena through a simple chat interface using natural language.",
    },
    {
      icon: <Network className="h-10 w-10 text-primary" />,
      title: "Graph RAG Technology",
      description: "Advanced context retrieval ensures Ell-ena understands the full picture of your work.",
    },
    {
      icon: <Bot className="h-10 w-10 text-primary" />,
      title: "Input Agnostic",
      description: "Works with text, voice, or any other input method you prefer to use.",
    },
  ]

  return (
    <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-secondary/20 px-3 py-1 text-sm">Features</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Everything You Need in a Product Manager
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Ell-ena combines AI intelligence with practical tools to streamline your workflow and boost productivity.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 border-gray-100 dark:border-gray-800">
              <CardHeader>
                <div className="mb-2">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

