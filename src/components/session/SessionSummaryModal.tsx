// src/components/session/SessionSummaryModal.tsx
import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import type { Step, SessionNote, Task } from "@/types";

interface SessionSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { sessionTitle: string; commitMessage: string }) => void;
  step: Step;
  task: Task;
  sessionNotes: SessionNote[];
  sessionDuration: number; // in minutes
  sessionStartTime: string;
}

const SessionSummaryModal: React.FC<SessionSummaryModalProps> = ({
  isOpen,
  onClose,
  onSave,
  step,
  task,
  sessionNotes,
  sessionDuration,
  sessionStartTime,
}) => {
  const sessionTitle = `${step.text} - ${getTimeOfDay(
    sessionStartTime
  )} Session`;
  const [commitMessage, setCommitMessage] = useState("");

  const handleSave = () => {
    onSave({
      sessionTitle,
      commitMessage: commitMessage.trim(),
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      if (commitMessage.trim()) {
        handleSave();
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[520px] p-0 gap-0 overflow-hidden border-0">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#404040] px-6 py-6 text-center">
          <div className="flex justify-center gap-2 flex-wrap mb-4">
            <Badge className="py-1 bg-white/20 border-white/30 text-white font-medium max-w-[200px] truncate hover:bg-white/20 text-left inline-block rounded-sm">
              {task.title}
            </Badge>
            <Badge className="py-1 bg-white/10 border-white/20 text-white/85 font-normal max-w-[200px] truncate hover:bg-white/10 text-left inline-block rounded-sm">
              {step.text}
            </Badge>
          </div>
          <div className="flex items-center justify-center gap-4 text-[13px] text-white/70">
            <span>{getTimeOfDay(sessionStartTime)} Session</span>
            <div className="w-[3px] h-[3px] bg-white/40 rounded-full" />
            <span>{formatTime(sessionStartTime)}</span>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pt-8 pb-6">
          {/* Primary Section - Commit Message */}
          <div className="mb-6">
            <label className="block text-[11px] font-semibold text-[#1a1a1a] uppercase tracking-[0.5px] mb-2">
              When you return to this step
            </label>
            <Textarea
              value={commitMessage}
              onChange={(e) => setCommitMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="What should you remember or do next?&#10;&#10;e.g., 'Continue with Acme Corp pricing verification. Check their enterprise page and contact sales if needed.'"
              rows={3}
              className="border-2 border-[#e0e0e0] focus-visible:border-[#1a1a1a] focus-visible:ring-0 rounded-lg text-[14px] resize-none"
              maxLength={280}
            />
            <div className="flex items-center justify-between mt-1.5 text-[12px] text-[#999]">
              <div className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-[#f5f5f5] border border-[#d0d0d0] rounded text-[11px]">
                  ⌘
                </kbd>
                <kbd className="px-1.5 py-0.5 bg-[#f5f5f5] border border-[#d0d0d0] rounded text-[11px]">
                  ↵
                </kbd>
                <span>to save</span>
              </div>
              <span>{commitMessage.length}/280</span>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-[#fafafa] rounded-lg p-4 mb-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="flex flex-col gap-1">
                <div className="text-[18px] font-semibold text-[#1a1a1a]">
                  {sessionDuration}m
                </div>
                <div className="text-[11px] text-[#666] uppercase tracking-[0.3px]">
                  Duration
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-[18px] font-semibold text-[#1a1a1a]">
                  {sessionNotes.length}
                </div>
                <div className="text-[11px] text-[#666] uppercase tracking-[0.3px]">
                  Notes
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-[18px] font-semibold text-[#1a1a1a]">
                  {formatTime(sessionStartTime)}
                </div>
                <div className="text-[11px] text-[#666] uppercase tracking-[0.3px]">
                  Started
                </div>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div className="pt-6 border-t border-[#f0f0f0] mb-6">
            <label className="block text-[11px] font-semibold text-[#666] uppercase tracking-[0.5px] mb-3">
              Session Notes ({sessionNotes.length})
            </label>
            {sessionNotes.length > 0 ? (
              <div className="grid gap-2">
                {sessionNotes.map((note) => (
                  <div
                    key={note.id}
                    className="bg-[#fffbf0] border border-[#ffe9b3] rounded-md px-3 py-2.5 text-[13px] text-[#4a3900]"
                  >
                    {note.title && (
                      <span className="font-semibold mr-1">{note.title}:</span>
                    )}
                    <span className="line-clamp-2">{note.content}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-[13px] text-[#999] italic text-center py-4">
                No notes captured during this session
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-[#e0e0e0] text-[#666] hover:bg-[#fafafa] hover:border-[#d0d0d0] hover:text-[#666]"
            >
              Skip
            </Button>
            <Button
              onClick={handleSave}
              disabled={!commitMessage.trim()}
              className="flex-[2] bg-[#1a1a1a] hover:bg-[#000] text-white disabled:bg-[#e0e0e0] disabled:text-[#999]"
            >
              Save Reminder & Continue
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Helper Functions
function getTimeOfDay(timeString: string): string {
  const time = new Date(timeString);
  const hour = time.getHours();

  if (hour < 12) return "Morning";
  if (hour < 18) return "Afternoon";
  if (hour < 22) return "Evening";
  return "Late Night";
}

function formatTime(timeString: string): string {
  return new Date(timeString).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export default SessionSummaryModal;
