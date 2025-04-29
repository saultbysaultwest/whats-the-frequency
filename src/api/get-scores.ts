import { VercelRequest, VercelResponse } from '@vercel/node';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI!);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).send('Method not allowed');

  try {
    await client.connect();
    const db = client.db('leaderboardDB');
    const scores = db.collection('scores');

    const topScores = await scores.find({})
      .sort({ score: -1 })
      .limit(10)
      .toArray();

    return res.status(200).json(topScores);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
}
