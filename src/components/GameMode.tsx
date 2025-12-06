import { useState, useEffect, useCallback } from "react";
import { PiDisplay } from "./PiDisplay";
import { Numpad } from "./Numpad";
import { GameStats } from "./GameStats";
import { PI_DIGITS } from "@/lib/pi-digits";
import { useToast } from "@/hooks/use-toast";

const BEST_SCORE_KEY = "pi-game-best-score";

export const GameMode = ({ onSwitchToPractice }: { onSwitchToPractice: () => void }) => {
  // Game Mode Component
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wrongIndex, setWrongIndex] = useState<number | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<{ text: string; type: 'success' | 'error' | 'neutral' } | null>(null);
  const [bestScore, setBestScore] = useState(() => {
    const saved = localStorage.getItem(BEST_SCORE_KEY);
    return saved ? parseInt(saved, 10) : 0;
  });
  const [lastPressed, setLastPressed] = useState<string | null>(null);
  const [gameTime, setGameTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setGameTime(t => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        handleDigitPress(e.key);
      } else if (e.key === 'Backspace') {
        handleDelete();
      } else if (e.key === 'Escape' || e.key === 'r') {
        handleReset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  const handleDigitPress = useCallback((digit: string) => {
    if (!isPlaying && currentIndex === 0) {
      setIsPlaying(true);
    }

    setLastPressed(digit);
    setTimeout(() => setLastPressed(null), 150);

    const expectedDigit = PI_DIGITS[currentIndex];

    if (digit === expectedDigit) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setWrongIndex(null);
      setFeedbackMessage(null);

      // Check for milestones
      if (newIndex === 10 || newIndex === 50 || newIndex === 100 || newIndex === 500 || newIndex === 1000) {
        setFeedbackMessage({ text: `🎉 ${newIndex} digits! Amazing progress!`, type: 'success' });
        setTimeout(() => setFeedbackMessage(null), 3000);
      }

      // Update best score
      if (newIndex > bestScore) {
        setBestScore(newIndex);
        localStorage.setItem(BEST_SCORE_KEY, newIndex.toString());
      }
    } else {
      setWrongIndex(currentIndex);
      setFeedbackMessage({ text: "Game over! Redirecting to practice...", type: 'error' });

      setTimeout(() => {
        setWrongIndex(null);
        handleReset();
        setFeedbackMessage(null);
        onSwitchToPractice();
      }, 2000);
    }
  }, [currentIndex, bestScore, isPlaying, onSwitchToPractice]);

  const handleDelete = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setWrongIndex(null);
      setFeedbackMessage(null);
    }
  }, [currentIndex]);

  const handleReset = useCallback(() => {
    setCurrentIndex(0);
    setWrongIndex(null);
    setGameTime(0);
    setIsPlaying(false);
    setFeedbackMessage(null);
  }, []);

  return (
    <div className="space-y-4">
      <GameStats
        score={currentIndex}
        bestScore={bestScore}
        time={gameTime}
      />

      {feedbackMessage && (
        <div className={`text-center font-bold text-sm animate-in fade-in slide-in-from-top-2 ${feedbackMessage.type === 'error' ? 'text-destructive' :
          feedbackMessage.type === 'success' ? 'text-green-500' : 'text-muted-foreground'
          }`}>
          {feedbackMessage.text}
        </div>
      )}

      <PiDisplay
        currentIndex={currentIndex}
        wrongIndex={wrongIndex}
      />

      <Numpad
        onDigitPress={handleDigitPress}
        onDelete={handleDelete}
        onReset={handleReset}
        lastPressed={lastPressed}
      />

      <p className="text-center text-[10px] text-muted-foreground">
        Use keyboard or tap the numpad • Press R to reset
      </p>
    </div>
  );
};
