import { useState } from "react";
import { ModeSelector, GameMode as GameModeType } from "@/components/ModeSelector";
import { PracticeMode } from "@/components/PracticeMode";
import { GameMode } from "@/components/GameMode";

const Index = () => {
  const [mode, setMode] = useState<GameModeType>('game');

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="pt-6 sm:pt-10 pb-4 px-4">
        <div className="max-w-md mx-auto text-center space-y-2">
          <div className="flex items-center justify-center gap-3">
            <span className="text-5xl sm:text-6xl font-bold text-primary glow-primary inline-block">
              π
            </span>
            <div className="text-left">
              <h1 className="text-xl sm:text-2xl font-bold text-foreground">
                Pi Memory
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Memorize the digits of π
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Mode Selector */}
      <div className="flex justify-center px-4 pb-4">
        <ModeSelector mode={mode} onModeChange={setMode} />
      </div>

      {/* Main Content */}
      <main className="flex-1 px-4 pb-8">
        <div className="max-w-md mx-auto">
          {mode === 'practice' ? <PracticeMode /> : <GameMode />}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center">
        <p className="text-xs text-muted-foreground">
          How many digits can you memorize?
        </p>
      </footer>
    </div>
  );
};

export default Index;
