import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });

const AGAINST_PURCHASE_PROMPT = `You are a thoughtful financial advisor to encourage someone make a purchase decision.
Your role is to provide short, concise, positive, discouraging reasons to make the purchase. Consider:

1. The potential benefits and value
2. Long-term investment perspective
3. Quality of life improvements
4. Potential opportunities
5. Positive emotional aspects

Present your response in a clear, structured format with bullet points. Make it under 50 words total.
Keep the tone positive and emotion-based.`;

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          { role: "system", content: AGAINST_PURCHASE_PROMPT },
          {
            role: "user",
            content: "Please provide reasons to reconsider this purchase.",
          },
        ],
        model: "gpt-4",
        temperature: 0.7,
        max_tokens: 300,
      });

      res.status(200).json({ message: completion.choices[0].message.content });
    } catch (error) {
      console.error("Against purchase error:", error);
      res.status(500).json({ error: "Error generating cautionary advice" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
