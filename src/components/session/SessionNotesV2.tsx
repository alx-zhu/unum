// src/components/notes/SessionNotes.tsx
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import QuickNoteInput from "./QuickNoteInput";
import type { NoteIdType, SessionNote } from "@/types";
import type { SessionIdType } from "@/types";
import NoteGrid from "./NoteGrid";
import { getSessionById } from "@/lib/constants";

interface SessionNotesProps {
  sessionId: SessionIdType;
  notes: SessionNote[];
  onCreateNote: (content: string) => void;
  onUpdateNote: (
    id: NoteIdType,
    updates: { content?: string; title?: string }
  ) => void;
}

const SessionNotes: React.FC<SessionNotesProps> = ({
  sessionId,
  notes,
  onCreateNote,
  onUpdateNote,
}) => {
  const session = getSessionById(sessionId);
  const [pinnedNoteIds, setPinnedNoteIds] = useState<Set<NoteIdType>>(
    session?.pinnedNoteIds || new Set<NoteIdType>()
  );
  const totalNotesCount = notes.length;

  if (!session) {
    return <span>Session not found</span>;
  }

  const isPinned = (id: string) => pinnedNoteIds.has(id);

  // TODO: combine pin and unpin into toggle
  const onSetNotePinned = (id: string, pinned: boolean) => {
    if (pinned) {
      const updatedPinned = new Set(pinnedNoteIds);
      updatedPinned.add(id);
      setPinnedNoteIds(updatedPinned);
    } else {
      const updatedPinned = new Set(pinnedNoteIds);
      updatedPinned.delete(id);
      setPinnedNoteIds(updatedPinned);
    }
  };

  const pinnedNotes = notes.filter((note) => isPinned(note.id));
  const currentSessionNotes = notes.filter(
    (note) => note.sessionId === sessionId && !isPinned(note.id)
  );
  const currentStepNotes = notes.filter(
    (note) =>
      note.stepId === session.stepId &&
      note.sessionId !== sessionId &&
      !isPinned(note.id)
  );
  const otherStepNotes = notes.filter(
    (note) =>
      note.stepId !== session.stepId &&
      note.taskId === session.taskId &&
      !isPinned(note.id)
  );
  const otherTaskNotes = notes.filter(
    (note) => note.taskId !== session.taskId && !isPinned(note.id)
  );

  return (
    <div className="space-y-6">
      <Card className="mb-10 overflow-hidden transition-all duration-300 ease-out p-0 gap-0">
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50 cursor-pointer transition-colors hover:bg-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">
              Session Notes
            </span>
            <Badge variant="secondary" className="text-xs">
              {totalNotesCount}
            </Badge>
          </div>
        </div>

        {/* Quick Input - Always Visible */}
        <div className="p-4 border-b border-gray-100 bg-white">
          <QuickNoteInput
            onSave={onCreateNote}
            onInputChange={() => console.log("input changed")}
            autoFocus
          />
        </div>
      </Card>

      {/* Pinned Notes */}
      <NoteGrid
        title="Pinned Notes"
        notes={pinnedNotes}
        onUpdateNote={onUpdateNote}
        onPinNote={(id) => onSetNotePinned(id, true)}
        onUnpinNote={(id) => onSetNotePinned(id, false)}
        pinnedNoteIds={pinnedNoteIds}
        indicatorColor="amber"
        className="mb-6"
      />

      {/* Current Session */}
      <NoteGrid
        title="This Session"
        notes={currentSessionNotes}
        isCurrentStep={true}
        onUpdateNote={onUpdateNote}
        onPinNote={(id) => onSetNotePinned(id, true)}
        onUnpinNote={(id) => onSetNotePinned(id, false)}
        pinnedNoteIds={pinnedNoteIds}
        indicatorColor="blue"
      />

      {/* Current Step (Previous Sessions) */}
      <NoteGrid
        title="This Step (Previous Sessions)"
        notes={currentStepNotes}
        isCurrentStep={true}
        onUpdateNote={onUpdateNote}
        onPinNote={(id) => onSetNotePinned(id, true)}
        onUnpinNote={(id) => onSetNotePinned(id, false)}
        pinnedNoteIds={pinnedNoteIds}
        indicatorColor="green"
      />

      {/* Other Steps in This Task */}
      <NoteGrid
        title="Other Steps in This Task"
        notes={otherStepNotes}
        isCurrentStep={false}
        onUpdateNote={onUpdateNote}
        onPinNote={(id) => onSetNotePinned(id, true)}
        onUnpinNote={(id) => onSetNotePinned(id, false)}
        pinnedNoteIds={pinnedNoteIds}
        indicatorColor="indigo"
      />

      {/* Other Tasks */}
      <NoteGrid
        title="Other Tasks"
        notes={otherTaskNotes}
        isCurrentStep={false}
        onUpdateNote={onUpdateNote}
        onPinNote={(id) => onSetNotePinned(id, true)}
        onUnpinNote={(id) => onSetNotePinned(id, false)}
        pinnedNoteIds={pinnedNoteIds}
        indicatorColor="gray"
      />
    </div>
  );
};

export default SessionNotes;
