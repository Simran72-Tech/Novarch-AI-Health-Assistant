"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface ReportAnalysisProps {
  analysis: string
  onDownload: () => void
}

export function ReportAnalysis({ analysis, onDownload }: ReportAnalysisProps) {
  const lines = analysis.split("\n")

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <div className="prose prose-sm dark:prose-invert max-w-none">
        {lines.map((line, idx) => (
          <motion.p
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={`text-sm leading-relaxed ${
              line.startsWith("•")
                ? "ml-4 text-foreground"
                : line.includes("**")
                  ? "font-semibold text-primary"
                  : "text-muted-foreground"
            }`}
          >
            {line}
          </motion.p>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="pt-4 border-t border-border"
      >
        <Button onClick={onDownload} className="w-full" variant="default">
          <Download className="w-4 h-4 mr-2" />
          Download Analysis
        </Button>
      </motion.div>
    </motion.div>
  )
}
