import { cn } from "@/lib/utils";
import { getDigitColor, PI_DIGITS } from "@/lib/pi-digits";

interface PiDisplayProps {
  currentIndex: number;
  showAll?: boolean;
  wrongIndex?: number | null;
}

const ITEMS_PER_PAGE = 50;

export const PiDisplay = ({
  currentIndex,
  showAll = false,
  wrongIndex = null,
}: PiDisplayProps) => {

  // Calculate current page based on cursor position.
  // The cursor is at (currentIndex + 1) because index 0 is occupied by "3."
  const cursorPosition = currentIndex + 1;
  const currentPage = Math.floor(cursorPosition / ITEMS_PER_PAGE);
  const pageStart = currentPage * ITEMS_PER_PAGE;

  return (
    <div className="bg-card/80 backdrop-blur rounded-xl p-3 sm:p-6 shadow-lg border border-border w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4 border-b border-border pb-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">π</span>
          <span className="text-sm text-muted-foreground font-medium">
            Page {currentPage + 1} / 20
          </span>
        </div>
        <span className="text-[10px] text-muted-foreground font-medium">
          {currentIndex} digits
        </span>
      </div>

      <div className="grid grid-cols-10 gap-1 sm:gap-3 justify-items-center">
        {Array.from({ length: ITEMS_PER_PAGE }).map((_, idx) => {
          const absoluteIndex = pageStart + idx;

          // Special case for the very first item of the entire sequence
          if (absoluteIndex === 0) {
            return (
              <div
                key="header-3"
                className="w-7 h-9 sm:w-8 sm:h-10 flex items-center justify-center text-xl sm:text-2xl font-mono font-bold text-primary"
              >
                3.
              </div>
            );
          }

          // For all other items, map to PI_DIGITS
          // We subtract 1 because index 0 is taken by "3."
          const digitIndex = absoluteIndex - 1;
          const digit = PI_DIGITS[digitIndex];

          // If we ran out of digits (shouldn't happen with 1000 digits limit but safe check)
          if (!digit) return <div key={absoluteIndex} className="w-7 h-9 sm:w-8 sm:h-10" />;

          const isTyped = digitIndex < currentIndex;
          const isCurrent = digitIndex === currentIndex;
          const isWrong = wrongIndex !== null && digitIndex === wrongIndex;

          let content = "•";
          let color = "#52525b"; // zinc-600

          if (isTyped) {
            content = digit;
            color = getDigitColor(digit);
          } else if (isWrong) {
            content = "•";
            color = "#ef4444"; // Red
          } else if (showAll) {
            content = digit;
            color = getDigitColor(digit);
          }

          return (
            <div
              key={absoluteIndex}
              className={cn(
                "w-7 h-9 sm:w-8 sm:h-10 flex items-center justify-center text-xl sm:text-2xl font-mono transition-all duration-200",
                isCurrent && !isWrong && "animate-pulse bg-primary/10 rounded",
                isWrong && "animate-shake bg-destructive/20 rounded",
                !isTyped && !isWrong && "text-muted-foreground/40"
              )}
              style={{ color: isTyped || (showAll && !isWrong) ? color : undefined }}
            >
              <span className={cn(
                isTyped ? "font-bold" : "text-lg sm:text-xl"
              )}>
                {content}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
