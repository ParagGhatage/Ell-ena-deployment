import { Button } from "@/components/ui/button"
import { ArrowRight, Bot, CheckCircle } from "lucide-react"

export default function Hero() {
  return (
    <section className="py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Meet{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Ell-ena
                </span>
                , Your AI Product Manager
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Automate task management with AI that creates to-do items, tickets, and transcribes meetings while
                maintaining full work context.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button className="bg-primary hover:bg-primary/90 text-white">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline">Watch Demo</Button>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-1">
                
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-[500px] aspect-video rounded-xl border bg-background shadow-xl">
              <div className="absolute inset-0 flex flex-col p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Bot className="h-6 w-6 text-primary" />
                  <h3 className="font-semibold">Ell-ena</h3>
                </div>
                <div className="flex-1 overflow-auto space-y-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="bg-secondary/20 p-3 rounded-lg">
                      <p className="text-sm">How can I help you today?</p>
                    </div>
                  </div>
                  <div className="flex items-start justify-end space-x-3">
                    <div className="bg-primary/20 p-3 rounded-lg">
                      <p className="text-sm">Create a ticket to work on the dark mode feature.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-secondary/20 p-3 rounded-lg">
                      <p className="text-sm">
                        I've created a ticket for the dark mode feature. I've added it to your backlog with high
                        priority. Would you like me to assign it to anyone specific?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

