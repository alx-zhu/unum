// src/components/notes/SessionNotesGroup.tsx
import React from "react";
import NoteItem from "./SessionNoteItem";
import type { SessionNote } from "@/types/notes";

interface SessionNotesGroupProps {
  title: string;
  notes: SessionNote[];
  isCurrentStep: boolean;
  onUpdateNote: (id: string, content: string) => void;
}

const SessionNotesGroup: React.FC<SessionNotesGroupProps> = ({
  title,
  notes,
  isCurrentStep,
  onUpdateNote,
}) => {
  if (notes.length === 0) return null;

  return (
    <div className="mb-4 last:mb-0">
      <div className="flex items-center mb-2 text-xs font-semibold text-gray-700 uppercase tracking-wide">
        <div
          className={`w-1.5 h-1.5 rounded-full mr-2 ${
            isCurrentStep ? "bg-blue-500" : "bg-gray-400"
          }`}
        />
        {title}
      </div>
      <div className="space-y-0">
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            onUpdate={onUpdateNote}
            isOtherTask={!isCurrentStep}
          />
        ))}
      </div>
    </div>
  );
};

export default SessionNotesGroup;
