"use client"

import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import FeaturesSection from "@/components/features-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Hero />
        <FeaturesSection />
        <Footer />
      </motion.div>
    </main>
  )
}
