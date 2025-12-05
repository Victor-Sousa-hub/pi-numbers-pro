import { useState } from "react";
import { ModeSelector, GameMode as GameModeType } from "@/components/ModeSelector";
import { PracticeMode } from "@/components/PracticeMode";
import { GameMode } from "@/components/GameMode";

const Index = () => {
  const [mode, setMode] = useState<GameModeType>('game');

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-background via-background to-card flex flex-col safe-area-inset">
      {/* Header */}
      <header className="pt-4 pb-2 px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="text-4xl font-bold text-primary glow-primary inline-block">
              π
            </span>
            <div className="text-left">
              <h1 className="text-lg font-bold text-foreground">
                Pi Memory
              </h1>
              <p className="text-xs text-muted-foreground">
                Memorize the digits of π
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Mode Selector */}
      <div className="flex justify-center px-4 pb-2">
        <ModeSelector mode={mode} onModeChange={setMode} />
      </div>

      {/* Main Content */}
      <main className="flex-1 px-3 pb-4 overflow-hidden">
        <div className="max-w-md mx-auto h-full">
          {mode === 'practice' ? <PracticeMode /> : <GameMode />}
        </div>
      </main>
    </div>
  );
};

export default Index;
