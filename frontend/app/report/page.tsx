"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Upload, FileText } from "lucide-react"
import { ReportUploadArea } from "@/components/report-upload-area"
import { ReportAnalysis } from "@/components/report-analysis"

export default function ReportPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [analysis, setAnalysis] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleImageUpload = (imageData: string) => {
    setUploadedImage(imageData)
    setError(null)
    analyzeReport(imageData)
  }

  const analyzeReport = async (imageData: string) => {
    setIsLoading(true)
    setError(null)
    try {
      setTimeout(() => {
        const mockAnalysis = `📄 **Report Analysis**

• **Patient Name:** [Extracted from image]
• **Test Type:** Blood Work / Laboratory Test
• **Key Metrics / Results:**
   - Hemoglobin: 14.5 g/dL (Normal: 13.5-17.5)
   - White Blood Cells: 7.2 K/uL (Normal: 4.5-11.0)
   - Platelets: 245 K/uL (Normal: 150-400)
   - Glucose: 95 mg/dL (Normal: 70-100)

• **Normal or Abnormal Findings:**
   - All values within normal range
   - No concerning indicators detected

• **Doctor's Notes / Conclusion:**
   - Patient shows healthy blood profile
   - Recommended follow-up in 12 months

• **Date:** [Extracted from image]`

        setAnalysis(mockAnalysis)
        setIsLoading(false)
      }, 2000)
    } catch (err) {
      setError("Failed to analyze report. Please try again.")
      setIsLoading(false)
    }
  }

  const downloadAnalysis = () => {
    if (!analysis) return
    const element = document.createElement("a")
    const file = new Blob([analysis], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "report-analysis.txt"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
            Medical Report Analyzer
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload your medical report image and get instant structured analysis. Our AI extracts key metrics, findings,
            and insights from your reports.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <Card className="p-6 border-2 border-border">
              <div className="flex items-center gap-3 mb-6">
                <Upload className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold">Upload Report</h2>
              </div>
              <ReportUploadArea onImageUpload={handleImageUpload} isLoading={isLoading} />
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-destructive/10 border border-destructive text-destructive rounded-lg text-sm"
                >
                  {error}
                </motion.div>
              )}
            </Card>
          </motion.div>

          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <Card className="p-6 border-2 border-border h-full">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold">Analysis Result</h2>
              </div>

              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="flex justify-center py-12"
                >
                  <div className="w-12 h-12 border-4 border-border border-t-primary rounded-full" />
                </motion.div>
              ) : analysis ? (
                <ReportAnalysis analysis={analysis} onDownload={downloadAnalysis} />
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p>Upload a report to see analysis here</p>
                </div>
              )}
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 p-6 bg-muted/50 border border-border rounded-lg"
        >
          <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">⚕️ Medical Disclaimer</h3>
          <p className="text-sm text-muted-foreground">
            This tool is for educational purposes only and does not replace professional medical advice. Always consult
            with a qualified healthcare provider for proper diagnosis and treatment. Results are extracted using
            automated analysis and should be verified by medical professionals.
          </p>
        </motion.div>
      </motion.div>

      <Footer />
    </main>
  )
}
