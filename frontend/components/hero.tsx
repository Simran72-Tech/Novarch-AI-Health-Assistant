"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Stethoscope, Brain, FileText } from "lucide-react"

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  return (
    <section className="relative py-20 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="text-center space-y-8">
          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="text-5xl sm:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent text-balance">
              AI-Powered Health Assistant
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
              Detect diseases early with advanced AI, get personalized health guidance, and take control of your
              wellness journey.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link href="/disease">
              <Button size="lg" className="w-full sm:w-auto gap-2">
                <Stethoscope className="w-4 h-4" />
                Start Detection
              </Button>
            </Link>
            <Link href="/chat">
              <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 bg-transparent">
                <Brain className="w-4 h-4" />
                Chat with AI
              </Button>
            </Link>
            <Link href="/report">
              <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 bg-transparent">
                <FileText className="w-4 h-4" />
                Report Analyzer
              </Button>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            {[
              {
                icon: Stethoscope,
                title: "Disease Detection",
                desc: "AI-powered analysis for Eye, Lung & Skin diseases",
              },
              { icon: Brain, title: "Smart Chatbot", desc: "Get instant health advice from our AI assistant" },
              { icon: FileText, title: "Report Analyzer", desc: "Analyze medical reports with advanced AI insights" },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="p-6 rounded-lg border border-border bg-card hover:shadow-lg transition"
              >
                <feature.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
