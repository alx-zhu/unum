import type { SessionIdType, StepIdType, TaskIdType } from "./tasks";

// src/types/notes.ts
export interface SessionNote {
  id: string;
  content: string;
  timestamp: string;
  sessionId: SessionIdType;
  stepId: StepIdType; // Retrieved from the session associated with the task for faster access
  taskId: TaskIdType; // Retrieved from step associated with the task
  stepName?: string;
  createdAt: Date;
}
