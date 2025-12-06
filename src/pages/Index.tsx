import { useState } from "react";
import { ModeSelector, GameMode as GameModeType } from "@/components/ModeSelector";
import { PracticeMode } from "@/components/PracticeMode";
import { GameMode } from "@/components/GameMode";

const Index = () => {
  const [mode, setMode] = useState<GameModeType>('game');

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-background via-background to-card flex flex-col safe-area-inset overflow-hidden">
      {/* Header */}
      <header className="pt-2 pb-1 px-4 shrink-0">
        <div className="max-w-md mx-auto text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="text-3xl font-bold text-primary glow-primary inline-block">
              π
            </span>
            <div className="text-left">
              <h1 className="text-base font-bold text-foreground">
                Pi Memory
              </h1>
              <p className="text-[10px] text-muted-foreground">
                Memorize the digits of π
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Mode Selector */}
      <div className="flex justify-center px-4 pb-2 shrink-0">
        <ModeSelector mode={mode} onModeChange={setMode} />
      </div>

      {/* Main Content */}
      <main className="flex-1 px-2 pb-2 overflow-y-auto">
        <div className="max-w-md mx-auto h-full flex flex-col justify-center">
          {mode === 'practice' ? <PracticeMode /> : <GameMode onSwitchToPractice={() => setMode('practice')} />}
        </div>
      </main>
    </div>
  );
};

export default Index;
