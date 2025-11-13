export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Replace this with your actual API key or AI SDK implementation once configured
    const mockResponses = [
      "Based on your symptoms, this could be several conditions. Please consult with a healthcare professional for a proper diagnosis.",
      "That's a common health concern. I recommend scheduling an appointment with your doctor for a comprehensive evaluation.",
      "Diet and exercise play important roles in managing health. Consider consulting a nutritionist or fitness professional.",
      "This might be related to stress or lifestyle factors. Try maintaining a regular sleep schedule and managing stress levels.",
      "I'd recommend getting tested or consulting with a specialist for accurate diagnosis and treatment options.",
    ]

    const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)]

    return Response.json({ content: randomResponse })
  } catch (error) {
    console.error("Chat API error:", error)
    return Response.json({ error: "Failed to generate response" }, { status: 500 })
  }
}
