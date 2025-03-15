import { ArrowRight, Bot, BrainCircuit, CheckCircle, ClipboardList, MessageSquare } from "lucide-react"

export default function HowItWorks() {
  const steps = [
    {
      icon: <MessageSquare className="h-10 w-10 text-primary" />,
      title: "Chat with Ell-ena",
      description: "Simply tell Ell-ena what you need in natural language through the chat interface.",
    },
    {
      icon: <BrainCircuit className="h-10 w-10 text-primary" />,
      title: "AI Processes Your Request",
      description: "Ell-ena's advanced AI understands context and extracts relevant information.",
    },
    {
      icon: <ClipboardList className="h-10 w-10 text-primary" />,
      title: "Tasks Are Created",
      description: "Tickets, to-do items, or meeting notes are automatically generated with proper details.",
    },
    {
      icon: <CheckCircle className="h-10 w-10 text-primary" />,
      title: "Review and Confirm",
      description: "Quickly review the created items and make any necessary adjustments.",
    },
  ]

  return (
    <section id="how-it-works" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-secondary/20 px-3 py-1 text-sm">How It Works</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple Process, Powerful Results</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Ell-ena makes task management effortless with a streamlined workflow.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-5xl mt-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex items-center justify-center mt-8">
                    <ArrowRight className="h-6 w-6 text-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <div className="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg max-w-3xl">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Bot className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Graph RAG Technology</h3>
                <p className="text-gray-500 dark:text-gray-400">Our advanced context retrieval system</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Ell-ena uses Graph RAG (Retrieval Augmented Generation) to maintain a comprehensive understanding of your
              work context. This technology creates connections between tasks, projects, and conversations, allowing
              Ell-ena to make intelligent decisions and provide relevant suggestions based on your entire work history.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

