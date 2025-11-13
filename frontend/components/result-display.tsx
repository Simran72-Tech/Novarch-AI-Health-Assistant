"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { AlertCircle, CheckCircle2, TrendingUp } from "lucide-react"

interface ResultDisplayProps {
  result: any
  isLoading: boolean
  moduleId: string
}

export default function ResultDisplay({ result, isLoading, moduleId }: ResultDisplayProps) {
  if (isLoading) {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <CardContent className="pt-6 flex justify-center py-16">
            <div className="flex flex-col items-center gap-4">
              <Spinner className="w-8 h-8" />
              <p className="text-muted-foreground font-medium">Analyzing image with AI...</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  if (result.error) {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="border-destructive/30 bg-destructive/5">
          <CardContent className="pt-6">
            <div className="flex gap-3 items-start">
              <AlertCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-destructive">{result.error}</p>
                <p className="text-sm text-muted-foreground mt-1">Please try with a clearer image.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  const hasDisease = result.disease && result.disease !== "Healthy"
  const confidence = result.confidence ? (result.confidence * 100).toFixed(1) : 0

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className={`border-2 ${hasDisease ? "border-orange-300/50" : "border-green-300/50"}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {hasDisease ? (
              <>
                <AlertCircle className="w-5 h-5 text-orange-500" />
                Analysis Complete
              </>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                Analysis Complete
              </>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className={`rounded-lg p-6 ${
              hasDisease
                ? "bg-orange-50 dark:bg-orange-950/30 border border-orange-200/50"
                : "bg-green-50 dark:bg-green-950/30 border border-green-200/50"
            }`}
          >
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Diagnosis</p>
            <p className="text-3xl font-bold text-foreground mt-2">{result.disease || "No Disease Detected"}</p>
            <div className="flex items-center gap-2 mt-4">
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Confidence: <span className="font-semibold text-foreground">{confidence}%</span>
              </p>
            </div>
          </motion.div>

          {result.description && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-secondary/50 border border-border rounded-lg p-4 space-y-2"
            >
              <p className="text-sm font-semibold text-foreground">About this condition</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{result.description}</p>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200/50 rounded-lg p-4"
          >
            <p className="text-xs text-blue-700 dark:text-blue-300">
              <span className="font-semibold">⚠️ Medical Disclaimer:</span> This AI analysis is for informational
              purposes only. Please consult a healthcare professional for accurate diagnosis and treatment.
            </p>
          </motion.div>

          <Link href="/chat" className="block">
            <Button className="w-full gap-2" size="lg">
              <span>💬</span>
              Chat with AI about this result
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  )
}
