import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const diseases = [
  {
    name: "Diabetes",
    description: "A chronic condition affecting blood sugar levels",
    icon: "🩺",
  },
  {
    name: "Hypertension",
    description: "High blood pressure leading to cardiovascular issues",
    icon: "❤️",
  },
  {
    name: "Asthma",
    description: "Chronic respiratory condition affecting airways",
    icon: "🫁",
  },
  {
    name: "Arthritis",
    description: "Inflammation of joints causing pain and stiffness",
    icon: "🦴",
  },
  {
    name: "Migraine",
    description: "Severe headaches with neurological symptoms",
    icon: "🧠",
  },
  {
    name: "Obesity",
    description: "Excessive body weight affecting overall health",
    icon: "⚖️",
  },
]

export default function DiseaseCards() {
  return (
    <section id="diseases" className="py-20 sm:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Common Diseases</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Understand the most prevalent health conditions affecting millions worldwide
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {diseases.map((disease) => (
            <Card key={disease.name} className="hover:shadow-lg transition">
              <CardHeader>
                <div className="text-4xl mb-4">{disease.icon}</div>
                <CardTitle>{disease.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{disease.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
