import type { Step, Task } from "@/types/tasks";

// Hard-coded static data as requested
export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Organize digital photos",
    description: "Sort through and organize family photos from the last year",
    dueDate: undefined,
    bucketId: "when-available",
  },
  {
    id: "2",
    title: 'Read "Atomic Habits"',
    description: "Finish reading the book and take notes on key concepts",
    dueDate: undefined,
    bucketId: "when-available",
  },
  {
    id: "3",
    title: "Update LinkedIn profile",
    description: "Refresh work experience and add recent projects",
    dueDate: undefined,
    bucketId: "when-available",
  },
  {
    id: "4",
    title: "Prepare quarterly presentation",
    description: "Create slides for Q4 performance review with stakeholders",
    dueDate: "2024-12-20",
    bucketId: "important",
  },
  {
    id: "5",
    title: "Complete tax document preparation",
    description: "Gather all receipts and documents for tax filing",
    dueDate: "2024-12-15",
    bucketId: "important",
  },
  {
    id: "6",
    title: "Submit project proposal",
    description: "Finalize and submit the client proposal for the new project",
    dueDate: "2024-12-10",
    bucketId: "time-sensitive",
  },
];

export const getTaskSteps = (taskId: string): Step[] => {
  const mockSteps: Record<string, Step[]> = {
    "1": [
      {
        id: "s1-1",
        text: "Create folder structure on cloud storage",
        completed: false,
        createdAt: new Date().toISOString(),
        taskId: "1",
      },
      {
        id: "s1-2",
        text: "Sort photos by year and event",
        completed: false,
        createdAt: new Date().toISOString(),
        taskId: "1",
      },
      {
        id: "s1-3",
        text: "Delete duplicates and blurry photos",
        completed: false,
        createdAt: new Date().toISOString(),
        taskId: "1",
      },
    ],
    "2": [
      {
        id: "s2-1",
        text: "Read chapters 1-3",
        completed: true,
        createdAt: new Date().toISOString(),
        taskId: "2",
      },
      {
        id: "s2-2",
        text: "Take notes on key concepts",
        completed: false,
        createdAt: new Date().toISOString(),
        taskId: "2",
      },
      {
        id: "s2-3",
        text: "Write summary of main ideas",
        completed: false,
        createdAt: new Date().toISOString(),
        taskId: "2",
      },
    ],
    "4": [
      {
        id: "s4-1",
        text: "Gather Q4 performance data",
        completed: true,
        createdAt: new Date().toISOString(),
        taskId: "4",
      },
      {
        id: "s4-2",
        text: "Create slide outline",
        completed: false,
        createdAt: new Date().toISOString(),
        taskId: "4",
      },
      {
        id: "s4-3",
        text: "Design charts and visualizations",
        completed: false,
        createdAt: new Date().toISOString(),
        taskId: "4",
      },
      {
        id: "s4-4",
        text: "Practice presentation timing",
        completed: false,
        createdAt: new Date().toISOString(),
        taskId: "4",
      },
    ],
    "6": [
      {
        id: "s6-1",
        text: "Review client requirements document",
        completed: true,
        createdAt: new Date().toISOString(),
        taskId: "6",
      },
      {
        id: "s6-2",
        text: "Draft project timeline and milestones",
        completed: true,
        createdAt: new Date().toISOString(),
        taskId: "6",
      },
      {
        id: "s6-3",
        text: "Create budget breakdown and pricing",
        completed: false,
        createdAt: new Date().toISOString(),
        taskId: "6",
      },
      {
        id: "s6-4",
        text: "Write executive summary",
        completed: false,
        createdAt: new Date().toISOString(),
        taskId: "6",
      },
      {
        id: "s6-5",
        text: "Format and proofread final document",
        completed: false,
        createdAt: new Date().toISOString(),
        taskId: "6",
      },
    ],
  };

  return mockSteps[taskId] || [];
};
