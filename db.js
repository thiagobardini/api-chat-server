import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function connectToDatabase() {
  if (!client.topology || !client.topology.isConnected()) {
    await client.connect();
  }
  return client.db('chatbot');
}

async function fetchTextData() {
  const db = await connectToDatabase();
  const collection = db.collection('initialText');
  const textEntry = await collection.findOne();
  return textEntry ? textEntry.text : null;
}

async function chatInteraction(userMessage, aiResponse) {
  const db = await connectToDatabase();
  const collection = db.collection('chatMessages');
  const timestamp = new Date();
  await collection.insertOne({ userMessage, aiResponse, timestamp });
}

export { connectToDatabase, fetchTextData, chatInteraction };
