"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import Image from "next/image"
import { Upload, X } from "lucide-react"

interface ImageUploadAreaProps {
  onUpload: (file: File) => void
  isLoading: boolean
  moduleId: string
}

export default function ImageUploadArea({ onUpload, isLoading, moduleId }: ImageUploadAreaProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [isDragActive, setIsDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      onUpload(file)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(e.type === "dragenter" || e.type === "dragover")
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)

    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleFile(e.target.files[0])
    }
  }

  const resetPreview = () => {
    setPreview(null)
  }

  return (
    <Card className="border border-border hover:shadow-lg transition">
      <CardContent className="pt-6">
        {!preview ? (
          <motion.div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-all ${
              isDragActive
                ? "border-primary bg-primary/10 scale-105"
                : "border-border bg-background hover:bg-secondary/30"
            }`}
          >
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleChange} className="hidden" />

            <motion.div animate={isDragActive ? { scale: 1.1 } : { scale: 1 }} className="space-y-4">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
              <div>
                <p className="text-lg font-semibold text-foreground">Drag and drop your medical image</p>
                <p className="text-sm text-muted-foreground mt-1">or</p>
              </div>
              <Button onClick={() => fileInputRef.current?.click()} disabled={isLoading} className="gap-2">
                {isLoading ? (
                  <>
                    <Spinner className="w-4 h-4" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Choose File
                  </>
                )}
              </Button>
              <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
            <div className="relative rounded-lg overflow-hidden bg-secondary/30 p-4">
              <div className="relative w-full h-64 mx-auto">
                <Image src={preview || "/placeholder.svg"} alt="Preview" fill className="object-contain" />
              </div>
            </div>
            <div className="flex gap-2 justify-center">
              <p className="text-sm text-muted-foreground flex items-center">✓ Image selected and analyzing</p>
              <Button variant="ghost" size="sm" onClick={resetPreview} disabled={isLoading} className="gap-1">
                <X className="w-4 h-4" />
                Reset
              </Button>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}
