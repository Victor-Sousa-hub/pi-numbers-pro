import { Trophy, Target, Timer } from "lucide-react";

interface GameStatsProps {
  score: number;
  bestScore: number;
  time?: number;
}

export const GameStats = ({ score, bestScore, time }: GameStatsProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-center gap-4 sm:gap-8">
      <div className="flex items-center gap-2 text-foreground">
        <Target className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
        <div className="text-center">
          <div className="text-xs text-muted-foreground uppercase tracking-wide">Score</div>
          <div className="text-lg sm:text-xl font-bold font-mono">{score}</div>
        </div>
      </div>
      
      <div className="h-8 w-px bg-border" />
      
      <div className="flex items-center gap-2 text-foreground">
        <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
        <div className="text-center">
          <div className="text-xs text-muted-foreground uppercase tracking-wide">Best</div>
          <div className="text-lg sm:text-xl font-bold font-mono">{bestScore}</div>
        </div>
      </div>

      {time !== undefined && (
        <>
          <div className="h-8 w-px bg-border" />
          <div className="flex items-center gap-2 text-foreground">
            <Timer className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            <div className="text-center">
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Time</div>
              <div className="text-lg sm:text-xl font-bold font-mono">{formatTime(time)}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
