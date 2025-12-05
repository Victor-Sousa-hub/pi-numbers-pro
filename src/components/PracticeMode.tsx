import { useState } from "react";
import { PiDisplay } from "./PiDisplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PI_DIGITS } from "@/lib/pi-digits";

const PAGE_SIZE = 50;

export const PracticeMode = () => {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(PI_DIGITS.length / PAGE_SIZE);
  
  const pageStart = page * PAGE_SIZE;
  const pageEnd = Math.min(pageStart + PAGE_SIZE, PI_DIGITS.length);

  return (
    <div className="space-y-4">
      <PiDisplay 
        currentIndex={0} 
        showAll={true}
        pageStart={pageStart}
        pageEnd={pageEnd}
      />
      
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => setPage(p => Math.max(0, p - 1))}
          disabled={page === 0}
          className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <span className="font-mono text-sm text-muted-foreground min-w-[100px] text-center">
          {pageStart + 1} - {pageEnd} / {PI_DIGITS.length}
        </span>
        
        <button
          onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
          disabled={page >= totalPages - 1}
          className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      
      <p className="text-center text-sm text-muted-foreground">
        Browse through the digits of π to memorize them
      </p>
    </div>
  );
};
