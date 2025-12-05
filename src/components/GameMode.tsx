import { useState, useEffect, useCallback } from "react";
import { PiDisplay } from "./PiDisplay";
import { Numpad } from "./Numpad";
import { GameStats } from "./GameStats";
import { PI_DIGITS } from "@/lib/pi-digits";
import { useToast } from "@/hooks/use-toast";

const BEST_SCORE_KEY = "pi-game-best-score";

export const GameMode = () => {
  const { toast } = useToast();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wrongIndex, setWrongIndex] = useState<number | null>(null);
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
      
      // Check for milestones
      if (newIndex === 10 || newIndex === 50 || newIndex === 100 || newIndex === 500 || newIndex === 1000) {
        toast({
          title: `🎉 ${newIndex} digits!`,
          description: "Amazing progress! Keep going!",
        });
      }
      
      // Update best score
      if (newIndex > bestScore) {
        setBestScore(newIndex);
        localStorage.setItem(BEST_SCORE_KEY, newIndex.toString());
      }
    } else {
      setWrongIndex(currentIndex);
      toast({
        title: "Wrong digit!",
        description: `Expected ${expectedDigit}, got ${digit}`,
        variant: "destructive",
      });
      
      setTimeout(() => setWrongIndex(null), 500);
    }
  }, [currentIndex, bestScore, isPlaying, toast]);

  const handleDelete = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setWrongIndex(null);
    }
  }, [currentIndex]);

  const handleReset = useCallback(() => {
    setCurrentIndex(0);
    setWrongIndex(null);
    setGameTime(0);
    setIsPlaying(false);
  }, []);

  return (
    <div className="space-y-6">
      <GameStats 
        score={currentIndex} 
        bestScore={bestScore}
        time={gameTime}
      />
      
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
      
      <p className="text-center text-xs text-muted-foreground">
        Use keyboard or tap the numpad • Press R to reset
      </p>
    </div>
  );
};
