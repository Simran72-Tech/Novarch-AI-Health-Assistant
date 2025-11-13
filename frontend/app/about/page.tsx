import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2 text-foreground">About Novarch</h1>
        <p className="text-muted-foreground mb-8">Revolutionizing healthcare with AI-powered disease detection</p>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground">
                Novarch aims to democratize healthcare by providing accessible, AI-driven disease detection and health
                guidance. Our platform leverages advanced computer vision and machine learning to analyze medical images
                with clinical-grade accuracy.
              </p>
              <p className="text-foreground">
                We're committed to bridging the gap between patients and healthcare professionals, providing preliminary
                insights that can guide clinical decision-making.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Technology Stack</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-start">
                  <span className="mr-3 font-semibold text-primary">•</span>
                  <span>
                    <strong>Frontend:</strong> Next.js 14, React, TypeScript, Tailwind CSS
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 font-semibold text-primary">•</span>
                  <span>
                    <strong>Backend:</strong> Next.js API Routes, Node.js
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 font-semibold text-primary">•</span>
                  <span>
                    <strong>AI Integration:</strong> Vercel AI SDK, OpenAI GPT
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 font-semibold text-primary">•</span>
                  <span>
                    <strong>Machine Learning:</strong> CNN-based models for image classification
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Disease Detection Modules</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Eye Disease Detection</h4>
                <p className="text-muted-foreground">
                  Analyzes retinal images to detect cataracts, glaucoma, and diabetic retinopathy using advanced
                  computer vision algorithms.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Lung Disease Detection</h4>
                <p className="text-muted-foreground">
                  Interprets chest X-rays to identify pneumonia, tuberculosis, and other respiratory conditions with
                  high accuracy.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Skin Disease Detection</h4>
                <p className="text-muted-foreground">
                  Examines skin lesion images to classify dermatological conditions including melanoma, psoriasis, and
                  eczema.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Important Disclaimer</CardTitle>
            </CardHeader>
            <CardContent className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <p className="text-foreground text-sm">
                Novarch is an AI-powered assistant designed for educational and preliminary screening purposes only. The
                results provided by this platform should not be considered as professional medical advice or a
                substitute for professional medical diagnosis or treatment. Always consult with qualified healthcare
                professionals for medical concerns. The accuracy of predictions depends on image quality and may not
                account for all clinical factors.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
