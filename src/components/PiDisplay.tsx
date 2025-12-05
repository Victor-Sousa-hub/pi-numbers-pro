import { cn } from "@/lib/utils";
import { getDigitClass, PI_DIGITS } from "@/lib/pi-digits";
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
    <div className="paper-texture rounded-xl p-4 sm:p-6 min-h-[200px] sm:min-h-[280px] shadow-lg">
      <div className="flex items-center gap-2 mb-3 sm:mb-4 pb-3 border-b border-amber-900/20">
        <span className="text-3xl sm:text-4xl font-bold text-amber-900">π</span>
        <span className="text-xl sm:text-2xl font-mono text-amber-800">=</span>
        <span className="text-xl sm:text-2xl font-mono text-amber-800">3.</span>
        <span className="ml-auto text-xs sm:text-sm text-amber-700 font-medium">
          {showAll ? `${pageStart + 1}-${pageEnd}` : currentIndex} digits
        </span>
      </div>
      
      <div 
        ref={containerRef}
        className="font-mono text-lg sm:text-xl md:text-2xl leading-relaxed max-h-[140px] sm:max-h-[180px] overflow-y-auto"
      >
        {displayDigits.length === 0 ? (
          <span className="text-amber-400/50 italic text-base">Type the digits of π...</span>
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
                  "inline-block w-[0.65em] text-center transition-all duration-150",
                  getDigitClass(digit),
                  isWrong && "bg-red-500/30 rounded shake",
                  isLast && !isWrong && "pop"
                )}
                style={{ 
                  textShadow: isWrong ? '0 0 10px rgba(239, 68, 68, 0.5)' : 'none'
                }}
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
