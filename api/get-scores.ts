import { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb } from '../src/lib/mongo';           // <-- update path if needed

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).send('Method not allowed');
  }

  try {
    const db = await getDb();
    const topScores = await db
      .collection('scores')
      .find({})
      .sort({ score: -1, createdAt: 1 })  // tie-break identical scores
      .limit(10)
      .toArray();

    return res.status(200).json(topScores);
  } catch (error) {
    console.error('get-scores:', error);
    return res.status(500).json({ message: (error as Error).message });
  }
}
