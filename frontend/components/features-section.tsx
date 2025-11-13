"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Bug as Lung, Droplets } from "lucide-react"

const features = [
  {
    icon: Eye,
    title: "Eye Disease Detection",
    description: "Diagnose conditions like cataracts, glaucoma, and diabetic retinopathy with AI precision",
  },
  {
    icon: Lung,
    title: "Lung Disease Detection",
    description: "Detect pneumonia, lung cancer, and tuberculosis from medical images",
  },
  {
    icon: Droplets,
    title: "Skin Disease Detection",
    description: "Identify skin conditions including eczema, psoriasis, and melanoma early",
  },
]

export default function FeaturesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="py-20 sm:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground">Detection Capabilities</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Powered by advanced AI models for accurate and reliable health diagnostics
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {features.map((feature, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition border-border/50">
                <CardHeader>
                  <feature.icon className="w-8 h-8 text-primary mb-3" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
