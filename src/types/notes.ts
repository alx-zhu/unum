import type { StepIdType, TaskIdType } from "./tasks";

// src/types/notes.ts
export interface SessionNote {
  id: string;
  content: string;
  timestamp: string;
  stepId: StepIdType;
  taskId: TaskIdType; // Retrieved from step associated with the task
  stepName?: string;
  createdAt: Date;
}
