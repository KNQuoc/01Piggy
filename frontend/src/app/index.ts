import { PinataSDK } from "pinata";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY })
const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: process.env.PINATA_GATEWAY,
});

const FOR_PURCHASE_PROMPT = `You are a thoughtful advisor helping someone make a purchase decision. 
Your role is to provide positive, encouraging reasons to make the purchase. Consider:

1. The potential benefits and value
2. Long-term investment perspective
3. Quality of life improvements
4. Potential opportunities
5. Positive emotional aspectsnpm install pinata-sdk


Present your response in a clear, structured format with bullet points.
Keep the tone positive but rational.`;

const AGAINST_PURCHASE_PROMPT = `You are a thoughtful financial advisor helping someone make a purchase decision. 
Your role is to provide careful, conservative reasons to reconsider the purchase. Consider:

1. Financial responsibility
2. Alternative uses for the money
3. Long-term financial impact
4. Potential drawbacks
5. Emotional aspects of spending

Present your response in a clear, structured format with bullet points.
Keep the tone constructive and thoughtful, not negative.`;

Bun.serve({
    port: 3000,
    hostname: "localhost",
    // Increase timeout to handle longer OpenAI responses
    idleTimeout: 254, // 30 seconds
    // Add development options
    development: process.env.NODE_ENV !== 'production',
    async fetch(req) {
      const url = new URL(req.url);
      
      // Add CORS headers for development
      const headers = new Headers({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      });

      // Handle OPTIONS requests for CORS
      if (req.method === 'OPTIONS') {
        return new Response(null, { headers });
      }
      
      if (url.pathname === "/") { 
        return new Response(Bun.file("./index.html"))
      }

      // Handle the "for purchase" perspective
      if (url.pathname === "/decision/for" && req.method === "POST") {
        try {
          const controller = new AbortController();
          // Set timeout for OpenAI request
          const timeout = setTimeout(() => controller.abort(), 25000);

          const completion = await openai.chat.completions.create({
            messages: [
              { 
                role: "system", 
                content: FOR_PURCHASE_PROMPT 
              },
              {
                role: "user",
                content: "Please provide reasons to make this purchase."
              }
            ],
            model: "gpt-4",
            temperature: 0.7,
            max_tokens: 300 // Reduced tokens for faster response
          }, { signal: controller.signal });

          clearTimeout(timeout);

          return Response.json({ 
            message: completion.choices[0].message.content
          }, { headers });
        } catch (error) {
          console.error('For purchase error:', error);
          return new Response(
            JSON.stringify({ error: "Error generating positive advice" }), 
            { status: 500, headers }
          );
        }
      }

      // Handle the "against purchase" perspective
      if (url.pathname === "/decision/against" && req.method === "POST") {
        try {
          const controller = new AbortController();
          // Set timeout for OpenAI request
          const timeout = setTimeout(() => controller.abort(), 25000);

          const completion = await openai.chat.completions.create({
            messages: [
              { 
                role: "system", 
                content: AGAINST_PURCHASE_PROMPT 
              },
              {
                role: "user",
                content: "Please provide reasons to reconsider this purchase."
              }
            ],
            model: "gpt-4",
            temperature: 0.7,
            max_tokens: 300 // Reduced tokens for faster response
          }, { signal: controller.signal });

          clearTimeout(timeout);

          return Response.json({ 
            message: completion.choices[0].message.content
          }, { headers });
        } catch (error) {
          console.error('Against purchase error:', error);
          return new Response(
            JSON.stringify({ error: "Error generating cautionary advice" }), 
            { status: 500, headers }
          );
        }
      }
      
      return new Response("404!", { headers, status: 404 });
    },
});