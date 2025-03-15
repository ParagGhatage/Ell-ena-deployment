import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQ() {
  const faqs = [
    {
      question: "What is Ell-ena?",
      answer:
        "Ell-ena is an AI-powered product manager that automates task management by creating to-do items, tickets, and transcribing meetings while maintaining full work context. It features a chat interface where users can interact naturally.",
    },
    {
      question: "How does Ell-ena create tasks?",
      answer:
        "Ell-ena uses natural language processing to understand your requests through chat. When you ask it to create a task or ticket, it extracts relevant information, adds context based on your work history, and generates a properly formatted task with all necessary details.",
    },
    {
      question: "Can Ell-ena integrate with my existing tools?",
      answer:
        "Yes, Ell-ena is designed to integrate with popular project management and productivity tools. Our Pro and Enterprise plans offer various integration options with tools like Jira, Asana, Trello, and more.",
    },
    {
      question: "What is Graph RAG technology?",
      answer:
        "Graph RAG (Retrieval Augmented Generation) is our advanced context retrieval system that creates connections between your tasks, projects, and conversations. This allows Ell-ena to maintain a comprehensive understanding of your work context and make intelligent decisions based on your entire work history.",
    },
    {
      question: "Is my data secure with Ell-ena?",
      answer:
        "Absolutely. We take data security very seriously. All data is encrypted both in transit and at rest. We follow industry best practices for security and compliance. Enterprise plans include additional security features and customization options.",
    },
    {
      question: "Can I try Ell-ena before purchasing?",
      answer:
        "Yes, we offer a 14-day free trial with no credit card required. You can experience all the features of our Pro plan during the trial period to see how Ell-ena can improve your workflow.",
    },
  ]

  return (
    <section id="faq" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-secondary/20 px-3 py-1 text-sm">FAQ</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Frequently Asked Questions</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Find answers to common questions about Ell-ena.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-3xl mt-12">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-500 dark:text-gray-400">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 flex justify-center">
          <div className="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg max-w-2xl text-center">
            <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Our support team is here to help. Contact us anytime and we'll get back to you as soon as possible.
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-white">Contact Support</Button>
          </div>
        </div>
      </div>
    </section>
  )
}

