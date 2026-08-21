import Navbar from '../components/layout/Navbar.jsx'
import Footer from '../components/layout/Footer.jsx'
import Hero from '../components/home/Hero.jsx'
import Features from '../components/home/Features.jsx'
import HowItWorks from '../components/home/HowItWorks.jsx'
import CTA from '../components/home/CTA.jsx'

export default function Home() {
  return (
    <div className="min-h-screen bg-ink-950">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}