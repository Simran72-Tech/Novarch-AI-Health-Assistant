"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="border-t border-border bg-card"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4 text-primary">Novarch</h3>
            <p className="text-sm text-muted-foreground">Advanced AI-powered health detection and guidance.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <div className="space-y-2 text-sm">
              <Link href="/disease" className="text-muted-foreground hover:text-primary transition">
                Disease Detection
              </Link>
              <Link href="/chat" className="text-muted-foreground hover:text-primary transition block">
                AI Chatbot
              </Link>
              <Link href="/report" className="text-muted-foreground hover:text-primary transition block">
                Report Analyzer
              </Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <div className="space-y-2 text-sm">
              <Link href="#" className="text-muted-foreground hover:text-primary transition">
                Privacy Policy
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition block">
                Terms of Service
              </Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Disclaimer</h4>
            <p className="text-xs text-muted-foreground">
              Not a substitute for professional medical advice. Always consult a doctor.
            </p>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Novarch. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  )
}
