import { useEffect, useState } from "react";

type ScoreEntry = {
  initials: string;
  score: number;
};

type LeaderboardProps = {
  refresh: boolean;
};

const Leaderboard = ({ refresh }: LeaderboardProps) => {
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      setLoading(true); // 🛠️ Add this so loading shows again on refresh
      try {
        const res = await fetch('/api/get-scores');
        const data = await res.json();
        setScores(data);
      } catch (err) {
        console.error('Failed to fetch scores', err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchScores();
  }, [refresh]);
  

  if (loading) return <p className="text-center mt-4">Loading leaderboard...</p>;

  return (
    <div className="flex flex-col items-center mt-8 p-4 border rounded-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">🏆 Leaderboard</h2>
      <ol className="w-full">
        {scores.map((entry, index) => (
          <li key={index} className="flex justify-between px-4 py-2 border-b">
            <span>{index + 1}. {entry.initials}</span>
            <span>{entry.score}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Leaderboard;
