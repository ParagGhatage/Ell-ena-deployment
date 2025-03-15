import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Features from "@/components/features"
import ChatDemo from "@/components/chat-demo"
import HowItWorks from "@/components/how-it-works"
import Pricing from "@/components/pricing"
import FAQ from "@/components/faq"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <ChatDemo />
        <HowItWorks />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}

