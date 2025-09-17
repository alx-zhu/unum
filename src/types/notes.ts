import type { StepIdType } from "./tasks";

// src/types/notes.ts
export interface SessionNote {
  id: string;
  content: string;
  timestamp: string;
  stepId: StepIdType;
  stepName?: string;
  createdAt: Date;
}

export interface NotesGroup {
  title: string;
  notes: SessionNote[];
  isCurrentStep: boolean;
}
