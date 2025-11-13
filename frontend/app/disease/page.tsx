"use client"

import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import DiseaseDetectionTabs from "@/components/disease-detection-tabs"

export default function DiseasePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-4 py-12"
      >
        <div className="space-y-2 mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Disease Detection
          </h1>
          <p className="text-muted-foreground text-lg">
            Upload medical images to analyze and get AI-powered diagnostic insights
          </p>
        </div>
        <DiseaseDetectionTabs />
      </motion.div>
    </main>
  )
}
