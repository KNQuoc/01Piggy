import { Hono } from "hono";
import { cors } from "hono/cors";
import { PinataSDK } from "pinata";
import { PGlite } from "@electric-sql/pglite";
import OpenAI from "openai";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";
import * as FormData from "form-data";
import { Readable } from "stream";
import Gtts from "gtts";

// Load environment variables
dotenv.config();

// Initialize Pinata and OpenAI
const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: process.env.PINATA_GATEWAY,
});

// Initialize Hono app
const app = new Hono();

// Apply CORS middleware
app.use("*", cors());

// Prompts for OpenAI
const FOR_PURCHASE_PROMPT = `You are a thoughtful advisor helping a child against making a purchase decision. 
Your role is to provide short, concise, positive, encouraging reasons to make the purchase. Consider:

1. Financial responsibility
2. Alternative uses for the money
3. Long-term financial impact
4. Potential drawbacks
5. Emotional aspects of spending

Present your response in a clear, structured format with bullet points. Make it under 50 words total.
Keep the tone neutral and rational.`;

const AGAINST_PURCHASE_PROMPT = `You are a thoughtful financial advisor to encourage someone to make a purchase decision. 
Your role is to provide short, concise, positive, discouraging reasons to make the purchase. Consider:

1. The potential benefits and value
2. Long-term investment perspective
3. Quality of life improvements
4. Potential opportunities
5. Positive emotional aspects

Present your response in a clear, structured format with bullet points. Make it under 50 words total.
Keep the tone positive and emotion-based.`;

const FINANCIAL_SYSTEM_MESSAGE = `You are a helpful financial advisor designed to teach children about financial literacy. Your goal is to:
- Use simple language appropriate for children
  - Explain financial concepts through relatable examples
  - Encourage good money habits
  - Be positive and encouraging
  - Use emoji occasionally to keep engagement
  - Break down complex topics into simple steps
  - Avoid technical financial jargon

Start by asking about the user's day, with basic greetings and such. Keep it short, generally under 100 words.`;

// Database initialization
let db: PGlite;

async function initDB(): Promise<void> {
  try {
    db = new PGlite("piggy");

    await db.exec(`CREATE TABLE IF NOT EXISTS account(
        account_id INT PRIMARY KEY,
        username VARCHAR(200) NOT NULL,
        password VARCHAR(200) NOT NULL,
        balance BIGINT NOT NULL DEFAULT 0,
        sub_account_num INT DEFAULT 0
      );`);

    await db.exec(`CREATE TABLE IF NOT EXISTS sub_account(
      sub_account_id INT PRIMARY KEY,
      username VARCHAR(200),
      password VARCHAR(200),
      account_id INT,
      money INT DEFAULT 0,
      FOREIGN KEY(account_id) REFERENCES account(account_id)
      );`);

    await db.exec(`CREATE TABLE IF NOT EXISTS marketplace(
      item_id INT PRIMARY KEY,
      item_name VARCHAR(200),
      price INT NOT NULL
      );`);

    await db.exec(`CREATE TABLE IF NOT EXISTS transaction (
      transaction_id INT PRIMARY KEY,
      transaction_date DATE NOT NULL,
      item_id INT,
      item_quantity INT,
      sub_account_id INT,
      account_id INT,
      FOREIGN KEY(account_id) REFERENCES account(account_id),
      FOREIGN KEY(item_id) REFERENCES marketplace(item_id),
      FOREIGN KEY(sub_account_id) REFERENCES sub_account(sub_account_id)
      );`);

    console.log("Database initialized successfully.");
  } catch (error) {
    console.error("Database initialization error:", error);
    throw error;
  }
}

// Initialize the database
(async () => {
  try {
    await initDB();
  } catch (error) {
    console.error("Failed to initialize database:", error);
  }
})();

// Define OpenAI endpoints with input validation
app.post("/decision/for", async (c) => {
  try {
    const body = await c.req.json();
    if (!body || !body.content) {
      return c.json({ error: "Invalid input. 'content' is required." }, 400);
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: FOR_PURCHASE_PROMPT },
        { role: "user", content: body.content },
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

    return c.json({ message: completion.choices[0].message.content });
  } catch (error) {
    console.error("For purchase error:", error);
    return c.json({ error: "Error generating positive advice" }, 500);
  }
});

app.post("/decision/against", async (c) => {
  try {
    const body = await c.req.json();
    if (!body || !body.content) {
      return c.json({ error: "Invalid input. 'content' is required." }, 400);
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: AGAINST_PURCHASE_PROMPT },
        { role: "user", content: body.content },
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

    return c.json({ message: completion.choices[0].message.content });
  } catch (error) {
    console.error("Against purchase error:", error);
    return c.json({ error: "Error generating cautionary advice" }, 500);
  }
});

// Example route for authentication
app.get("/auth", (c) => {
  return c.text("Auth route placeholder");
});

// Add a health check endpoint
app.get("/health", (c) => {
  return c.json({ status: "OK", uptime: process.uptime() });
});

// Add a chat endpoint
app.post("/chat/financial", async (c) => {
  try {
    const body = await c.req.json();
    if (!body || !body.message) {
      return c.json({ error: "Invalid input. 'message' is required." }, 400);
    }

    // Construct messages without using specific types
    const openAiMessages = [
      { role: "system", content: FINANCIAL_SYSTEM_MESSAGE },
      ...(body.messages || []), // Add conversation history if provided
      { role: "user", content: body.message },
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: openAiMessages,
      temperature: 0.7,
      max_tokens: 300,
    });

    return c.json({
      message: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("Chat error:", error);
    return c.json({ error: "Error generating chat response" }, 500);
  }
});

app.post("/chat/initial", async (c) => {
  try {
    const body = await c.req.json();
    if (!body || !body.message) {
      return c.json({ error: "Invalid input. 'message' is required." }, 400);
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: FINANCIAL_SYSTEM_MESSAGE },
        { role: "user", content: body.message },
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

    return c.json({
      message: completion.choices[0].message.content,
      messagesCid: "some-unique-id", // Optional: Generate a real CID if needed
    });
  } catch (error) {
    console.error("Initial chat error:", error);
    return c.json({ error: "Error generating initial response" }, 500);
  }
});

app.post("/chat/speech-to-text", async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get("audio") as File;

    if (!file) {
      return c.json({ error: "Audio file is required" }, 400);
    }

    // Convert to compatible FormData object
    const audioBuffer = Buffer.from(await file.arrayBuffer());
    const form = new FormData();
    form.append("file", audioBuffer, { filename: "audio.mp3" });

    const transcription = await openai.audio.transcriptions.create({
      file: form.getBuffer(),
      model: "whisper-1",
    });

    return c.json({ text: transcription.text });
  } catch (error) {
    console.error("Speech-to-Text Error:", error);
    return c.json({ error: "Error processing audio" }, 500);
  }
});

// Text-to-Speech Endpoint
app.post("/chat/text-to-speech", async (c) => {
  try {
    const body = await c.req.json();
    const text = body.text;

    if (!text) {
      return c.json({ error: "Text input is required" }, 400);
    }

    const gtts = new Gtts(text, "en");
    const outputPath = path.resolve("./output.mp3");

    await new Promise<void>((resolve, reject) => {
      gtts.save(outputPath, (err: Error | undefined) => {
        if (err) reject(err);
        else resolve();
      });
    });

    const audioBuffer = fs.readFileSync(outputPath);
    return new Response(audioBuffer, {
      headers: { "Content-Type": "audio/mpeg" },
    });
  } catch (error) {
    console.error("Text-to-Speech Error:", error);
    return c.json({ error: "Error generating speech" }, 500);
  }
});


// Start Bun server and mount Hono app
Bun.serve({
  port: 4000,
  hostname: "localhost",
  fetch: app.fetch,
});
