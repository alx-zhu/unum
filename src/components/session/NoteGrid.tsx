// src/components/notes/NoteGrid.tsx
import React from "react";
import NoteItem from "./NoteItem";
import type { NoteIdType, SessionNote } from "@/types";

interface NoteGridProps {
  title: string;
  notes: SessionNote[];
  isCurrentStep?: boolean;
  onUpdateNote: (
    id: NoteIdType,
    updates: { content?: string; title?: string }
  ) => void;
  onPinNote?: (id: NoteIdType) => void;
  onUnpinNote?: (id: NoteIdType) => void;
  pinnedNoteIds?: Set<NoteIdType>;
  showPin?: boolean;
  className?: string;
  indicatorColor?: "blue" | "green" | "amber" | "gray" | "indigo";
}

const NoteGrid: React.FC<NoteGridProps> = ({
  title,
  notes,
  isCurrentStep = false,
  onUpdateNote,
  onPinNote,
  onUnpinNote,
  pinnedNoteIds = new Set(),
  showPin = true,
  className = "",
  indicatorColor = "gray",
}) => {
  if (notes.length === 0) return null;

  const colorMap = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    amber: "bg-amber-500",
    gray: "bg-gray-400",
    indigo: "bg-indigo-500",
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Section Header */}
      <div className="flex items-center text-xs font-semibold text-gray-700 uppercase tracking-wide">
        <div
          className={`w-2 h-2 rounded-full mr-2 ${colorMap[indicatorColor]}`}
        />
        {title}
        <span className="ml-2 text-gray-500 font-normal">({notes.length})</span>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            onUpdate={onUpdateNote}
            onPin={onPinNote}
            onUnpin={onUnpinNote}
            isPinned={pinnedNoteIds.has(note.id)}
            isOtherTask={!isCurrentStep}
            showPin={showPin}
          />
        ))}
      </div>
    </div>
  );
};

export default NoteGrid;
