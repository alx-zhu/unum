// src/components/session/SessionSummaryModal.tsx
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight } from "lucide-react";
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
  const [sessionTitle, setSessionTitle] = useState(() => {
    const timeOfDay = getTimeOfDay(sessionStartTime);
    return `${step.text} - ${timeOfDay} Session`;
  });

  const [commitMessage, setCommitMessage] = useState("");
  const [showNotes, setShowNotes] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const handleSave = () => {
    onSave({
      sessionTitle: sessionTitle.trim(),
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
      <DialogContent className="max-w-lg p-0 gap-0 overflow-hidden">
        {/* Header with Context Badges */}
        <DialogHeader className="bg-gradient-to-br from-gray-900 to-gray-700 text-white p-6 text-center space-y-4">
          <div className="flex justify-center gap-2 flex-wrap">
            <Badge
              variant="outline"
              className="bg-white/20 border-white/30 text-white font-medium max-w-48 truncate"
            >
              {task.title}
            </Badge>
            <Badge
              variant="outline"
              className="bg-white/15 border-white/25 text-white/90 font-normal max-w-48 truncate"
            >
              {step.text}
            </Badge>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Session Complete</h2>
            <p className="text-white/80 text-sm">
              Review and save your focus session
            </p>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Session Title */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
              Session Title
            </label>
            <Input
              value={sessionTitle}
              onChange={(e) => setSessionTitle(e.target.value)}
              className="border-gray-200 focus:border-gray-900 focus:ring-gray-900/10"
            />
            <p className="text-xs text-gray-500">
              Auto-generated, but you can edit it
            </p>
          </div>

          {/* Commit Message */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
              When you return to this step
            </label>
            <Textarea
              value={commitMessage}
              onChange={(e) => setCommitMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="What should you remember or do next?&#10;&#10;e.g., 'Continue with Acme Corp pricing verification. Check their enterprise page and contact sales if needed.'"
              rows={3}
              className="border-gray-200 focus:border-gray-900 focus:ring-gray-900/10 resize-none"
              maxLength={280}
            />
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs">
                  ⌘
                </kbd>
                <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs">
                  ↵
                </kbd>
                <span>to save</span>
              </div>
              <span>{commitMessage.length}/280</span>
            </div>
          </div>

          {/* Session Notes (Collapsible) */}
          {sessionNotes.length > 0 && (
            <CollapsibleSection
              title={`Session Notes (${sessionNotes.length})`}
              isOpen={showNotes}
              onToggle={() => setShowNotes(!showNotes)}
            >
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 space-y-2">
                {sessionNotes.map((note) => (
                  <div key={note.id} className="text-sm text-amber-900">
                    {note.title && (
                      <span className="font-medium">{note.title}: </span>
                    )}
                    {note.content}
                  </div>
                ))}
              </div>
            </CollapsibleSection>
          )}

          {/* Session Statistics (Collapsible) */}
          <CollapsibleSection
            title="Session Statistics"
            isOpen={showStats}
            onToggle={() => setShowStats(!showStats)}
          >
            <div className="space-y-3">
              <StatRow label="Duration" value={`${sessionDuration} minutes`} />
              <StatRow
                label="Notes captured"
                value={`${sessionNotes.length} notes`}
              />
              <StatRow
                label="Session started"
                value={formatTime(sessionStartTime)}
              />
            </div>
          </CollapsibleSection>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Skip Reminder
            </Button>
            <Button
              onClick={handleSave}
              disabled={!commitMessage.trim()}
              className="flex-1 bg-gray-900 hover:bg-gray-800"
            >
              Save & Continue
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Helper Components
interface CollapsibleSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  isOpen,
  onToggle,
  children,
}) => {
  return (
    <div className="border-t border-gray-100 pt-4">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left group"
      >
        <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
          {title}
        </span>
        {isOpen ? (
          <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
        ) : (
          <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
        )}
      </button>
      {isOpen && (
        <div className="mt-3 animate-in slide-in-from-top-2 duration-200">
          {children}
        </div>
      )}
    </div>
  );
};

interface StatRowProps {
  label: string;
  value: string;
}

const StatRow: React.FC<StatRowProps> = ({ label, value }) => {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="text-sm font-medium text-gray-900">{value}</span>
    </div>
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
