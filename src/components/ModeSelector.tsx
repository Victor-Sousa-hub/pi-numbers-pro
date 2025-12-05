import { cn } from "@/lib/utils";
import { Gamepad2, BookOpen } from "lucide-react";

export type GameMode = 'practice' | 'game';

interface ModeSelectorProps {
  mode: GameMode;
  onModeChange: (mode: GameMode) => void;
}

export const ModeSelector = ({ mode, onModeChange }: ModeSelectorProps) => {
  return (
    <div className="flex items-center bg-secondary rounded-xl p-1 gap-1">
      <button
        onClick={() => onModeChange('practice')}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200",
          mode === 'practice' 
            ? "bg-primary text-primary-foreground shadow-md" 
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <BookOpen className="w-4 h-4" />
        <span className="hidden sm:inline">Practice</span>
      </button>
      
      <button
        onClick={() => onModeChange('game')}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200",
          mode === 'game' 
            ? "bg-primary text-primary-foreground shadow-md" 
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Gamepad2 className="w-4 h-4" />
        <span className="hidden sm:inline">Game</span>
      </button>
    </div>
  );
};
