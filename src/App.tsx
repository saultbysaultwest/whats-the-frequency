import Header from "./components/Header";
import SoundChallenge from "./components/SoundChallenge";
import Leaderboard from "./components/Leaderboard";
import { useState } from "react";

function App() {
  const [refreshLeaderboard, setRefreshLeaderboard] = useState(false);

  const handleScoreSubmit = () => {
    setRefreshLeaderboard(prev => !prev); // toggle value to trigger refresh
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center">
        <SoundChallenge onScoreSubmit={handleScoreSubmit} />
        <Leaderboard refresh={refreshLeaderboard} />
      </main>
    </div>
  );
}

export default App;
