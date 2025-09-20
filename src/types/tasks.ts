export type TaskIdType = string;

export type StepIdType = string;

export type SessionIdType = number;

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
}
