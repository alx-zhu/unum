import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Step } from "@/types/tasks";
import { mockTasks } from "@/lib/constants";

interface FocusSessionProps {
  step: Step;
  onComplete: (notes?: string) => void;
  onExit: () => void;
}

export const FocusSession: React.FC<FocusSessionProps> = ({
  step,
  onComplete,
  onExit,
}) => {
  const [sessionNotes, setSessionNotes] = useState("");
  const task = mockTasks.find((t) => t.id === step.taskId);

  const handleComplete = () => {
    onComplete(sessionNotes.trim() || undefined);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onExit();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-50 z-50 overflow-hidden"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      {/* System status indicator */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex items-center gap-2 text-xs text-gray-500 font-medium">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span>Focus session active</span>
      </div>

      {/* Header with context and exit */}
      <header className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
        <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">
          {task!.title}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={onExit}
          className="text-gray-600 border-gray-300 hover:bg-gray-100"
        >
          ← Exit focus
        </Button>
      </header>

      {/* Central focus area */}
      <main className="flex flex-col justify-center items-center h-full px-8 max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <div className="text-sm font-medium text-gray-600 mb-4">
            Your ONE step
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 leading-tight max-w-lg mb-8">
            {step.text}
          </h1>
        </div>

        {/* Session notes */}
        <div className="w-full max-w-lg mb-8">
          <textarea
            value={sessionNotes}
            onChange={(e) => setSessionNotes(e.target.value)}
            placeholder="Notes for this session (optional)"
            rows={2}
            className="w-full border border-gray-300 rounded-lg px-3 py-3 text-sm leading-relaxed text-gray-700 bg-white resize-none transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 focus:border-transparent placeholder-gray-400"
            style={{
              minHeight: "2.5rem",
              maxHeight: "7.5rem",
            }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "auto";
              target.style.height = Math.min(target.scrollHeight, 120) + "px";
            }}
          />
        </div>

        {/* Complete action */}
        <Button
          size="lg"
          onClick={handleComplete}
          className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 text-base font-medium shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
        >
          <span>Complete & continue</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="ml-2"
          >
            <path
              d="M6 12L10 8L6 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
      </main>

      {/* Minimal progress indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gray-400 rounded-full" />
    </div>
  );
};

export default FocusSession;
