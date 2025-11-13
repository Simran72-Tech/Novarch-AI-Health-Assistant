"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

interface DiseaseDetectorProps {
  type: "eye" | "lung" | "skin"
}

export default function DiseaseDetector({ type }: DiseaseDetectorProps) {
  const [image, setImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{
    disease: string
    confidence: number
  } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file",
        description: "Please select an image file",
        variant: "destructive",
      })
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      setImage(e.target?.result as string)
      setResult(null)
    }
    reader.readAsDataURL(file)
  }

  const handleAnalyze = async () => {
    if (!image) return

    setLoading(true)
    try {
      const response = await fetch(`/api/predict/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image }),
      })

      if (!response.ok) throw new Error("Analysis failed")

      const data = await response.json()
      setResult(data)
      toast({
        title: "Analysis complete",
        description: `Disease: ${data.disease}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze image",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.currentTarget.classList.add("border-primary", "bg-primary/5")
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove("border-primary", "bg-primary/5")
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.currentTarget.classList.remove("border-primary", "bg-primary/5")
    const file = e.dataTransfer.files?.[0]
    if (file) {
      const input = fileInputRef.current
      if (input) {
        const dataTransfer = new DataTransfer()
        dataTransfer.items.add(file)
        input.files = dataTransfer.files
        handleFileSelect({
          target: input,
        } as React.ChangeEvent<HTMLInputElement>)
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card>
        <CardContent className="pt-6">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
            <div className="space-y-3">
              <div className="text-4xl">📸</div>
              <div>
                <p className="font-semibold text-foreground">Drag and drop your image</p>
                <p className="text-sm text-muted-foreground">or click to browse</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Image Preview */}
      {image && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <img
                src={image || "/placeholder.svg"}
                alt="Preview"
                className="w-full max-h-96 object-contain rounded-lg"
              />
              <Button onClick={handleAnalyze} disabled={loading} className="w-full" size="lg">
                {loading ? "Analyzing..." : "Analyze Image"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {result && (
        <Card className="border-primary bg-primary/5">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Diagnosis</p>
                <p className="text-2xl font-bold text-foreground">{result.disease}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Confidence</p>
                <div className="w-full bg-border rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${result.confidence * 100}%` }}
                  />
                </div>
                <p className="text-sm text-foreground mt-1">{(result.confidence * 100).toFixed(1)}%</p>
              </div>
              <Link href="/chat">
                <Button variant="outline" className="w-full bg-transparent">
                  Chat about this result
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
