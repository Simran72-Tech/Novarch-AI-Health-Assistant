"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ImageUploadArea from "@/components/image-upload-area"
import ResultDisplay from "@/components/result-display"
import { Eye, Waves, Droplets } from "lucide-react"

const diseaseModules = [
  { id: "eye", label: "Eye Detection", icon: Eye, color: "from-blue-500 to-cyan-500" },
  { id: "lung", label: "Lung Detection", icon: Waves, color: "from-purple-500 to-pink-500" },
  { id: "skin", label: "Skin Detection", icon: Droplets, color: "from-orange-500 to-rose-500" },
]

export default function DiseaseDetectionTabs() {
  const [activeTab, setActiveTab] = useState("eye")
  const [results, setResults] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState<Record<string, boolean>>({})

  const handleImageUpload = async (file: File, moduleId: string) => {
    setLoading((prev) => ({ ...prev, [moduleId]: true }))

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch(`/api/predict/${moduleId}`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Prediction failed")
      const data = await response.json()
      setResults((prev) => ({ ...prev, [moduleId]: data }))
    } catch (error) {
      console.error("Error:", error)
      setResults((prev) => ({
        ...prev,
        [moduleId]: { error: "Failed to analyze image. Please try again." },
      }))
    } finally {
      setLoading((prev) => ({ ...prev, [moduleId]: false }))
    }
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <TabsList className="grid w-full grid-cols-3 mb-8 p-1 bg-secondary">
          {diseaseModules.map((module) => {
            const Icon = module.icon
            return (
              <TabsTrigger key={module.id} value={module.id} className="flex gap-2 items-center text-xs sm:text-sm">
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{module.label}</span>
                <span className="sm:hidden">{module.label.split(" ")[0]}</span>
              </TabsTrigger>
            )
          })}
        </TabsList>
      </motion.div>

      {diseaseModules.map((module) => (
        <TabsContent key={module.id} value={module.id} className="space-y-8">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <ImageUploadArea
              onUpload={(file) => handleImageUpload(file, module.id)}
              isLoading={loading[module.id] || false}
              moduleId={module.id}
            />
          </motion.div>

          {results[module.id] && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <ResultDisplay result={results[module.id]} isLoading={loading[module.id] || false} moduleId={module.id} />
            </motion.div>
          )}
        </TabsContent>
      ))}
    </Tabs>
  )
}
