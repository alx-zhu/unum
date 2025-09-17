// src/components/notes/SessionNotes.tsx
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import QuickNoteInput from "./QuickNoteInput";
import NotesGroup from "./NotesGroup";
import type { SessionNote, NotesGroup as NotesGroupType } from "@/types/notes";
import { motion } from "framer-motion";

interface SessionNotesProps {
  currentStepId: string;
  currentStepName: string;
  notes: SessionNote[];
  onCreateNote: (content: string) => void;
  onUpdateNote: (id: string, content: string) => void;
}

const SessionNotes: React.FC<SessionNotesProps> = ({
  currentStepId,
  currentStepName,
  notes,
  onCreateNote,
  onUpdateNote,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasInput, setHasInput] = useState(false);

  // Group notes by current step vs other steps
  const groupedNotes: NotesGroupType[] = React.useMemo(() => {
    const currentStepNotes = notes.filter(
      (note) => note.stepId === currentStepId
    );
    const otherNotes = notes.filter((note) => note.stepId !== currentStepId);

    const groups: NotesGroupType[] = [];

    if (currentStepNotes.length > 0) {
      groups.push({
        title: "This Step",
        notes: currentStepNotes.sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
        ),
        isCurrentStep: true,
      });
    }

    if (otherNotes.length > 0) {
      groups.push({
        title: "Other Task Notes",
        notes: otherNotes.sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
        ),
        isCurrentStep: false,
      });
    }

    return groups;
  }, [notes, currentStepId]);

  const totalNotesCount = notes.length;

  // Auto-expand when user starts typing
  const showExpanded = isExpanded || hasInput;

  // Keyboard shortcut for focus
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      console.log(event.key, event.metaKey, event.ctrlKey);
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        console.log("Focusing quick note input");
        event.preventDefault();
        const quickInput = document.querySelector(
          "[data-quick-input]"
        ) as HTMLTextAreaElement;
        quickInput?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Card className="mb-8 overflow-hidden transition-all duration-300 ease-out p-0 gap-0">
      {/* Header */}
      <CardHeader className="p-0 gap-0">
        <div
          className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50 cursor-pointer transition-colors hover:bg-gray-100"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">
              Session Notes
            </span>
            <Badge variant="secondary" className="text-xs">
              {totalNotesCount}
            </Badge>
          </div>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-gray-400 transition-transform duration-200",
              showExpanded && "rotate-180"
            )}
          />
        </div>

        {/* Quick Input - Always Visible */}
        <div className="p-4 border-b border-gray-100 bg-white">
          <QuickNoteInput
            onSave={onCreateNote}
            onInputChange={setHasInput}
            autoFocus={true}
          />
        </div>
      </CardHeader>

      {/* Expandable Content */}
      <motion.div
        className="overflow-hidden"
        animate={{
          height: showExpanded ? "auto" : 0,
          opacity: showExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <CardContent className="p-4">
          <div>
            {groupedNotes.length > 0 ? (
              groupedNotes.map((group, index) => (
                <NotesGroup
                  key={`${group.title}-${index}`}
                  group={group}
                  onUpdateNote={onUpdateNote}
                />
              ))
            ) : (
              <div className="text-center py-6 text-gray-500">
                <div className="mb-3 opacity-60">
                  <svg
                    className="mx-auto h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <p className="text-sm">No notes yet for this task</p>
              </div>
            )}
          </div>
        </CardContent>
      </motion.div>
    </Card>
  );
};

export default SessionNotes;
