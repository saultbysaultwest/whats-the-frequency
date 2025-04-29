import { useState } from "react";
import { FiFastForward, FiCheck, FiX } from "react-icons/fi";

const SoundChallenge = () => {
  const [frequencies, setFrequencies] = useState<number[]>([]);
  const [targetFrequency, setTargetFrequency] = useState<number | null>(null);
  const [selectedFrequency, setSelectedFrequency] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const playSineWave = (frequency: number) => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);

    oscillator.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 1);
  };

  const startChallenge = () => {
    const rand = () => Math.floor(Math.random() * 15 + 1) * 500;

    let target = rand();
    let options = new Set<number>();
    options.add(target);

    while (options.size < 5) {
      const freq = rand();
      if (!options.has(freq)) {
        options.add(freq);
      }
    }

    const optionsArray = Array.from(options);
    shuffleArray(optionsArray);

    setTargetFrequency(target);
    setFrequencies(optionsArray);
    setSelectedFrequency(null);
    setIsAnswered(false);

    playSineWave(target);
  };

  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const handleChoice = (freq: number) => {
    if (!isAnswered) {
      setSelectedFrequency(freq);
      setIsAnswered(true);
    }
  };

  const isCorrect = (freq: number) => freq === targetFrequency;

  return (
    <div className="flex flex-col items-center justify-center p-6 gap-6 font-mono">
      {/* Rules Box */}
      <div className="border border-black rounded-md p-4 max-w-md text-center">
        <p>
          Press the "Begin!" button to hear a random frequency. Pick the correct
          frequency from the options!
        </p>
      </div>

      {/* Play Sound Button */}
      <div
        className="flex items-center gap-2 cursor-pointer hover:opacity-80"
        onClick={startChallenge}
      >
        <FiFastForward className="text-4xl" />
        <span className="text-xl">Let's Go!</span>
      </div>

      {/* Option Buttons */}
      <div className="flex flex-col items-center gap-4 mt-4 w-full max-w-xs">
        {frequencies.map((freq, idx) => (
          <button
            key={idx}
            onClick={() => handleChoice(freq)}
            disabled={isAnswered}
            className={`w-full py-2 rounded-full border flex items-center justify-center gap-2 transition
              ${isAnswered
                ? isCorrect(freq)
                  ? "bg-green-500 text-white border-green-500"
                  : selectedFrequency === freq
                  ? "bg-red-500 text-white border-red-500"
                  : "border-black"
                : "hover:bg-black hover:text-white border-black"
              }
            `}
          >
            {freq} Hz
            {isAnswered && isCorrect(freq) && <FiCheck />}
            {isAnswered && !isCorrect(freq) && selectedFrequency === freq && <FiX />}
          </button>
        ))}
      </div>

      {/* Feedback Message */}
      {isAnswered && (
        <div className="mt-4 text-xl font-bold">
          {selectedFrequency === targetFrequency ? "🎉 Correct! Well done!" : "😔 Incorrect! Better luck next time!"}
        </div>
      )}
    </div>
  );
};

export default SoundChallenge;
