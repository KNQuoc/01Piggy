import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });

const FOR_PURCHASE_PROMPT = `You are a thoughtful advisor helping a child against making a purchase decision.
Your role is to provide short, concise, positive, encouraging reasons to make the purchase. Consider:

1. Financial responsibility
2. Alternative uses for the money
3. Long-term financial impact
4. Potential drawbacks
5. Emotional aspects of spending

Present your response in a clear, structured format with bullet points. Make it under 50 words total.
Keep the tone neutral and rational.`;

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          { role: "system", content: FOR_PURCHASE_PROMPT },
          {
            role: "user",
            content: "Please provide reasons to make this purchase.",
          },
        ],
        model: "gpt-4",
        temperature: 0.7,
        max_tokens: 300,
      });

      res.status(200).json({ message: completion.choices[0].message.content });
    } catch (error) {
      console.error("For purchase error:", error);
      res.status(500).json({ error: "Error generating positive advice" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
