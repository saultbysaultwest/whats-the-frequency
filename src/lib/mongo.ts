// lib/mongo.ts
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
let cachedClient: MongoClient | null = null;

export async function getDb() {
  if (!cachedClient) {
    cachedClient = await MongoClient.connect(uri, { maxPoolSize: 10 });
  }
  return cachedClient.db('leaderboardDB');
}
