// src/components/notes/SessionNotes.tsx
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import QuickNoteInput from "./QuickNoteInput";
import NotesGroup from "./NotesGroup";
import type { SessionNote } from "@/types";
import { motion } from "framer-motion";
import type { SessionIdType } from "@/types";

interface SessionNotesProps {
  sessionId: SessionIdType;
  notes: SessionNote[];
  onCreateNote: (content: string) => void;
  onUpdateNote: (id: string, content: string) => void;
}

const SessionNotes: React.FC<SessionNotesProps> = ({
  sessionId,
  notes,
  onCreateNote,
  onUpdateNote,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasInput, setHasInput] = useState(false);
  const noteInputRef = useRef<HTMLTextAreaElement>(null);
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
        noteInputRef.current?.focus();
        setIsExpanded(true);
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
            ref={noteInputRef}
            onSave={onCreateNote}
            onInputChange={setHasInput}
            autoFocus
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
            {notes.length > 0 ? (
              <NotesGroup
                title="Session Notes"
                notes={notes}
                isCurrentStep={true}
                onUpdateNote={onUpdateNote}
              />
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
