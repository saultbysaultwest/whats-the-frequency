// api/submit-score.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb } from './mongo.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');

  const { initials, score } = req.body;
  if (!initials || typeof score !== 'number')
    return res.status(400).json({ message: 'Invalid input' });

  try {
    const db = await getDb();
    await db.collection('scores').insertOne({
      initials: initials.toUpperCase().slice(0, 3),
      score,
      createdAt: new Date(),
    });
    return res.status(201).json({ message: 'Score saved' });
  } catch (error) {
    console.error('submit-score:', error);
    return res.status(500).json({ message: (error as Error).message });
  }
}
