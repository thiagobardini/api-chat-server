// /api/index.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { fetchTextData } from "../db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000; 

const initialText = await fetchTextData();
// console.log("Initial text:", initialText);
const initialHistory = [
  {
    role: "user",
    parts: [{ text: initialText }],
  },
  {
    role: "model",
    parts: [{ text: "Hello, I'm an AI. How can I help you? 🤖" }],
  },
];

// Initialize the Google Generative AI with the API key from the environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

// Endpoint to test fetching text data from the database
app.get("/test-fetch-text", async (req, res) => {
  try {
    const text = await fetchTextData();
    res.send(`Recovered text: ${text}`);
  } catch (error) {
    res.status(500).send(`Error fetching text: ${error.message}`);
  }
});

app.post("/chat-with-gemini", async (req, res) => {
  console.log("Received request:", req.body);
  const { message, history } = req.body;

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 150,
  };
  const safetySettings = [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  ];

  const fullHistory = initialHistory.concat(history);

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const chat = await model.startChat({ generationConfig, safetySettings, history: fullHistory });
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = await response.text();
    console.log("Response from AI:", text);
    res.send(text);
  } catch (error) {
    console.error("Error during chat:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
