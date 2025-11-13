export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File

    if (!file) {
      return Response.json({ error: "No file provided" }, { status: 400 })
    }

    // TODO: Replace with actual ML model integration
    // This is a placeholder that returns mock results for demonstration
    const diseases = [
      {
        disease: "Healthy",
        confidence: 0.95,
        description: "No abnormalities detected in the eye examination.",
      },
      {
        disease: "Cataract",
        confidence: 0.88,
        description: "Signs of cataract formation detected. Recommend ophthalmology consultation.",
      },
      {
        disease: "Diabetic Retinopathy",
        confidence: 0.82,
        description: "Potential signs of diabetic retinopathy detected. Urgent medical attention recommended.",
      },
    ]

    const randomResult = diseases[Math.floor(Math.random() * diseases.length)]

    return Response.json(randomResult)
  } catch (error) {
    console.error("Eye prediction error:", error)
    return Response.json({ error: "Failed to analyze image" }, { status: 500 })
  }
}
