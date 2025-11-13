"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Upload, File } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ReportUploadAreaProps {
  onImageUpload: (imageData: string) => void
  isLoading: boolean
}

export function ReportUploadArea({ onImageUpload, isLoading }: ReportUploadAreaProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file")
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const imageData = e.target?.result as string
      setPreview(imageData)
      onImageUpload(imageData)
    }
    reader.readAsDataURL(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFileSelect(file)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFileSelect(file)
  }

  return (
    <motion.div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative border-2 border-dashed rounded-lg p-8 transition-all cursor-pointer ${
        isDragging ? "border-primary bg-primary/5" : "border-border"
      } ${preview ? "border-solid border-primary" : ""}`}
    >
      {preview ? (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.img src={preview} alt="Preview" className="max-h-48 mx-auto mb-4 rounded-lg object-cover" />
          <p className="text-sm text-muted-foreground mb-4">Report image loaded</p>
          <Button
            onClick={() => {
              setPreview(null)
              if (fileInputRef.current) fileInputRef.current.value = ""
            }}
            variant="outline"
            disabled={isLoading}
          >
            Change Image
          </Button>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="inline-block mb-4"
          >
            <Upload className="w-12 h-12 text-primary/60" />
          </motion.div>
          <p className="font-semibold mb-2">Drag and drop your report here</p>
          <p className="text-sm text-muted-foreground mb-4">or click to select</p>
          <Button onClick={() => fileInputRef.current?.click()} disabled={isLoading}>
            <File className="w-4 h-4 mr-2" />
            Select File
          </Button>
        </motion.div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
        disabled={isLoading}
      />
    </motion.div>
  )
}
