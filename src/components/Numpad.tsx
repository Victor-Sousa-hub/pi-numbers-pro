import { cn } from "@/lib/utils";
import { Delete, RotateCcw } from "lucide-react";

interface NumpadProps {
  onDigitPress: (digit: string) => void;
  onDelete?: () => void;
  onReset?: () => void;
  disabled?: boolean;
  lastPressed?: string | null;
}

export const Numpad = ({ 
  onDigitPress, 
  onDelete, 
  onReset,
  disabled = false,
  lastPressed = null 
}: NumpadProps) => {
  const digits = [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    ['reset', '0', 'delete']
  ];

  const handleKeyPress = (key: string) => {
    if (disabled) return;
    
    if (key === 'delete') {
      onDelete?.();
    } else if (key === 'reset') {
      onReset?.();
    } else {
      onDigitPress(key);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3 max-w-xs mx-auto">
      {digits.flat().map((key) => {
        const isAction = key === 'delete' || key === 'reset';
        const isLastPressed = lastPressed === key;
        
        return (
          <button
            key={key}
            onClick={() => handleKeyPress(key)}
            disabled={disabled}
            className={cn(
              "numpad-button aspect-square rounded-xl font-mono text-xl sm:text-2xl font-semibold",
              "bg-secondary border border-border",
              "flex items-center justify-center",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              isAction && "bg-muted text-muted-foreground",
              !isAction && "text-foreground hover:bg-secondary/80",
              isLastPressed && "ring-2 ring-primary"
            )}
          >
            {key === 'delete' ? (
              <Delete className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : key === 'reset' ? (
              <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <span className={`digit-${key}`}>{key}</span>
            )}
          </button>
        );
      })}
    </div>
  );
};
