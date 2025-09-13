// Types for better structure
export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate?: string;
}

export interface Step {
  id: string;
  text: string;
  completed: boolean;
}
