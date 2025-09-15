// Types for better structure
export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate?: string;
  // createdAt: string;
  // completed: boolean;
  // updatedAt?: string;
  // lastWorkedOn?: string;
}

export interface Step {
  id: string;
  text: string;
  completed: boolean;
  // createdAt: string;
  // updatedAt?: string;
  // completedAt?: string;
  // taskId: string;
}
