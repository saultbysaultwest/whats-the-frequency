import Header from "./components/Header";
import SoundChallenge from "./components/SoundChallenge";
import Leaderboard from "./components/Leaderboard";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center">
        <SoundChallenge />
        <Leaderboard />
      </main>
    </div>
  );
}

export default App;
