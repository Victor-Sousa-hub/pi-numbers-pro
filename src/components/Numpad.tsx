import { cn } from "@/lib/utils";
import { Delete, RotateCcw } from "lucide-react";
import { getDigitColor } from "@/lib/pi-digits";

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
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
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
              "numpad-button aspect-square rounded-xl font-mono text-2xl font-bold",
              "bg-card border border-border shadow-md",
              "flex items-center justify-center",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "active:scale-95 transition-transform",
              isAction && "bg-muted text-muted-foreground",
              isLastPressed && "ring-2 ring-primary"
            )}
          >
            {key === 'delete' ? (
              <Delete className="w-6 h-6" />
            ) : key === 'reset' ? (
              <RotateCcw className="w-6 h-6" />
            ) : (
              <span style={{ color: getDigitColor(key) }}>{key}</span>
            )}
          </button>
        );
      })}
    </div>
  );
};
