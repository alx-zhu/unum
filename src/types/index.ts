export type TaskIdType = string;

export type StepIdType = string;

export type SessionIdType = number;

export type NoteIdType = string;

export type BucketIdType = "time-sensitive" | "important" | "when-available";

export interface Bucket {
  id: BucketIdType;
  title: string;
  description: string;
}

export interface Task {
  id: TaskIdType;
  title: string;
  description: string;
  bucketId: BucketIdType;
  dueDate?: string;
  // createdAt: string;
  // completed: boolean;
  // updatedAt?: string;
  // lastWorkedOn?: string;
}

export interface Step {
  id: StepIdType;
  text: string;
  completed: boolean;
  createdAt: string;
  updatedAt?: string;
  completedAt?: string;
  taskId: TaskIdType;
}

export interface Session {
  id: SessionIdType;
  stepId: StepIdType;
  taskId: TaskIdType; // Fetched from step in query, not stored in model
  startedAt: string;
  endedAt?: string;
  wasCompleted: boolean;
  endingNote?: string;
  pinnedNoteIds: Set<NoteIdType>;
}

export interface SessionNote {
  id: NoteIdType;
  title?: string;
  content: string;
  timestamp: string;
  sessionId: SessionIdType;
  stepId: StepIdType; // Retrieved from the session associated with the task for faster access
  taskId: TaskIdType; // Retrieved from step associated with the task
  stepName?: string;
  createdAt: Date;
}
