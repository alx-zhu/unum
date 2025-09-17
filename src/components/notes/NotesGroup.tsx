// src/components/notes/NotesGroup.tsx
import React from "react";
import NoteItem from "./NoteItem";
import type { NotesGroup as NotesGroupType } from "@/types/notes";

interface NotesGroupProps {
  group: NotesGroupType;
  onUpdateNote: (id: string, content: string) => void;
}

const NotesGroup: React.FC<NotesGroupProps> = ({ group, onUpdateNote }) => {
  if (group.notes.length === 0) return null;

  return (
    <div className="mb-4 last:mb-0">
      <div className="flex items-center mb-2 text-xs font-semibold text-gray-700 uppercase tracking-wide">
        <div
          className={`w-1.5 h-1.5 rounded-full mr-2 ${
            group.isCurrentStep ? "bg-blue-500" : "bg-gray-400"
          }`}
        />
        {group.title}
      </div>
      <div className="space-y-0">
        {group.notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            onUpdate={onUpdateNote}
            isOtherTask={!group.isCurrentStep}
          />
        ))}
      </div>
    </div>
  );
};

export default NotesGroup;
