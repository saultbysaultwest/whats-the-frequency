import { VercelRequest, VercelResponse } from '@vercel/node';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI!);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');

  const { initials, score } = req.body;

  if (!initials || typeof score !== 'number') {
    return res.status(400).json({ message: 'Invalid input' });
  }

  try {
    await client.connect();
    const db = client.db('leaderboardDB');
    const scores = db.collection('scores');

    await scores.insertOne({
      initials: initials.toUpperCase().substring(0, 3),
      score,
      createdAt: new Date()
    });

    return res.status(201).json({ message: 'Score saved' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
}
