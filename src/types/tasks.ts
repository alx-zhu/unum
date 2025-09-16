export type TaskIdType = string;

export type StepIdType = string;

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
