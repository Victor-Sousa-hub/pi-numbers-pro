import { cn } from "@/lib/utils";
import { getDigitColor, PI_DIGITS } from "@/lib/pi-digits";
import { useEffect, useRef } from "react";

interface PiDisplayProps {
  currentIndex: number;
  showAll?: boolean;
  wrongIndex?: number | null;
  pageStart?: number;
  pageEnd?: number;
}

export const PiDisplay = ({ 
  currentIndex, 
  showAll = false, 
  wrongIndex = null,
  pageStart = 0,
  pageEnd = 50
}: PiDisplayProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastDigitRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (lastDigitRef.current && containerRef.current) {
      lastDigitRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [currentIndex]);

  const displayDigits = showAll 
    ? PI_DIGITS.slice(pageStart, pageEnd).split('')
    : PI_DIGITS.slice(0, currentIndex).split('');

  return (
    <div className="bg-card/80 backdrop-blur rounded-xl p-4 min-h-[180px] shadow-lg border border-border">
      <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border">
        <span className="text-3xl font-bold text-primary">π</span>
        <span className="text-xl font-mono text-muted-foreground">=</span>
        <span className="text-xl font-mono text-muted-foreground">3.</span>
        <span className="ml-auto text-xs text-muted-foreground font-medium">
          {showAll ? `${pageStart + 1}-${pageEnd}` : currentIndex} digits
        </span>
      </div>
      
      <div 
        ref={containerRef}
        className="font-mono text-xl leading-relaxed max-h-[120px] overflow-y-auto"
      >
        {displayDigits.length === 0 ? (
          <span className="text-muted-foreground/50 italic text-base">Type the digits of π...</span>
        ) : (
          displayDigits.map((digit, idx) => {
            const actualIndex = showAll ? pageStart + idx : idx;
            const isWrong = wrongIndex !== null && actualIndex === wrongIndex;
            const isLast = !showAll && idx === displayDigits.length - 1;
            
            return (
              <span
                key={actualIndex}
                ref={isLast ? lastDigitRef : null}
                className={cn(
                  "inline-block w-[0.65em] text-center transition-all duration-150 font-bold",
                  isWrong && "bg-destructive/30 rounded shake",
                  isLast && !isWrong && "pop"
                )}
                style={{ color: getDigitColor(digit) }}
              >
                {digit}
              </span>
            );
          })
        )}
      </div>
    </div>
  );
};
