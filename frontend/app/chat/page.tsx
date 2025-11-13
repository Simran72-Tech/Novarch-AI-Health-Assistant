"use client"

import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import ChatInterface from "@/components/chat-interface"

export default function ChatPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 py-8"
      >
        <div className="space-y-2 mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Health Assistant AI
          </h1>
          <p className="text-muted-foreground text-lg">Ask Novarch AI anything about health, diseases, and wellness</p>
        </div>
        <ChatInterface />
      </motion.div>
    </main>
  )
}
