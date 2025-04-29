// src/lib/mongo.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
let cachedClient = null;

export async function getDb() {
  if (!cachedClient) {
    cachedClient = await MongoClient.connect(uri, { maxPoolSize: 10 });
  }
  return cachedClient.db('leaderboardDB');
}
