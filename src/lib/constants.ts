import type {
  Step,
  Task,
  Session,
  Bucket,
  SessionNote,
  SessionIdType,
} from "@/types";

export const buckets: Bucket[] = [
  {
    id: "time-sensitive",
    title: "Time Sensitive",
    description: "Tasks with urgent deadlines that need immediate attention",
  },
  {
    id: "important",
    title: "Important",
    description: "High-priority tasks that are crucial but not urgent",
  },
  {
    id: "when-available",
    title: "When Available",
    description:
      "Tasks to work on during free time or when other priorities are complete",
  },
];

// Hard-coded static data as requested
export const mockTasks: Task[] = [
  // Time-sensitive tasks
  {
    id: "1",
    title: "Submit project proposal",
    description: "Finalize and submit the client proposal for the new project",
    dueDate: "2025-09-25",
    bucketId: "time-sensitive",
  },
  {
    id: "2",
    title: "Complete quarterly tax filing",
    description: "Gather all receipts and documents for Q3 tax filing",
    dueDate: "2025-09-30",
    bucketId: "time-sensitive",
  },
  {
    id: "3",
    title: "Respond to urgent client feedback",
    description:
      "Address critical issues raised by the client on the current project",
    dueDate: "2025-09-22",
    bucketId: "time-sensitive",
  },

  // Important tasks
  {
    id: "4",
    title: "Prepare quarterly presentation",
    description: "Create slides for Q4 performance review with stakeholders",
    dueDate: "2025-10-15",
    bucketId: "important",
  },
  {
    id: "5",
    title: "Update team documentation",
    description:
      "Revise and update all project documentation for the development team",
    dueDate: "2025-10-30",
    bucketId: "important",
  },
  {
    id: "6",
    title: "Plan next quarter's roadmap",
    description: "Define objectives and milestones for Q1 2026",
    dueDate: "2025-11-01",
    bucketId: "important",
  },
  {
    id: "7",
    title: "Conduct team performance reviews",
    description: "Complete annual performance evaluations for all team members",
    dueDate: undefined,
    bucketId: "important",
  },

  // When-available tasks
  {
    id: "8",
    title: "Organize digital photos",
    description: "Sort through and organize family photos from the last year",
    dueDate: undefined,
    bucketId: "when-available",
  },
  {
    id: "9",
    title: 'Read "Atomic Habits"',
    description: "Finish reading the book and take notes on key concepts",
    dueDate: undefined,
    bucketId: "when-available",
  },
  {
    id: "10",
    title: "Update LinkedIn profile",
    description: "Refresh work experience and add recent projects",
    dueDate: undefined,
    bucketId: "when-available",
  },
  {
    id: "11",
    title: "Learn new design patterns",
    description:
      "Study advanced software design patterns and implement examples",
    dueDate: undefined,
    bucketId: "when-available",
  },
  {
    id: "12",
    title: "Declutter home office",
    description: "Organize workspace and donate unused items",
    dueDate: undefined,
    bucketId: "when-available",
  },
];

const mockSteps: Record<string, Step[]> = {
  "1": [
    {
      id: "s1-1",
      text: "Review client requirements document",
      completed: true,
      createdAt: "2025-09-15T10:00:00Z",
      completedAt: "2025-09-16T14:30:00Z",
      taskId: "1",
    },
    {
      id: "s1-2",
      text: "Draft project timeline and milestones",
      completed: true,
      createdAt: "2025-09-15T10:00:00Z",
      completedAt: "2025-09-17T11:45:00Z",
      taskId: "1",
    },
    {
      id: "s1-3",
      text: "Create budget breakdown and pricing",
      completed: false,
      createdAt: "2025-09-15T10:00:00Z",
      taskId: "1",
    },
    {
      id: "s1-4",
      text: "Write executive summary",
      completed: false,
      createdAt: "2025-09-15T10:00:00Z",
      taskId: "1",
    },
    {
      id: "s1-5",
      text: "Format and proofread final document",
      completed: false,
      createdAt: "2025-09-15T10:00:00Z",
      taskId: "1",
    },
  ],
  "2": [
    {
      id: "s2-1",
      text: "Collect Q3 expense receipts",
      completed: true,
      createdAt: "2025-09-10T09:00:00Z",
      completedAt: "2025-09-12T16:00:00Z",
      taskId: "2",
    },
    {
      id: "s2-2",
      text: "Categorize business expenses",
      completed: false,
      createdAt: "2025-09-10T09:00:00Z",
      taskId: "2",
    },
    {
      id: "s2-3",
      text: "Fill out tax forms",
      completed: false,
      createdAt: "2025-09-10T09:00:00Z",
      taskId: "2",
    },
  ],
  "4": [
    {
      id: "s4-1",
      text: "Gather Q4 performance data",
      completed: true,
      createdAt: "2025-09-01T08:00:00Z",
      completedAt: "2025-09-05T17:30:00Z",
      taskId: "4",
    },
    {
      id: "s4-2",
      text: "Create slide outline",
      completed: true,
      createdAt: "2025-09-01T08:00:00Z",
      completedAt: "2025-09-08T12:15:00Z",
      taskId: "4",
    },
    {
      id: "s4-3",
      text: "Design charts and visualizations",
      completed: false,
      createdAt: "2025-09-01T08:00:00Z",
      taskId: "4",
    },
    {
      id: "s4-4",
      text: "Practice presentation timing",
      completed: false,
      createdAt: "2025-09-01T08:00:00Z",
      taskId: "4",
    },
  ],
  "5": [
    {
      id: "s5-1",
      text: "Audit existing documentation",
      completed: true,
      createdAt: "2025-08-20T10:00:00Z",
      completedAt: "2025-08-25T15:00:00Z",
      taskId: "5",
    },
    {
      id: "s5-2",
      text: "Update API documentation",
      completed: false,
      createdAt: "2025-08-20T10:00:00Z",
      taskId: "5",
    },
    {
      id: "s5-3",
      text: "Revise setup instructions",
      completed: false,
      createdAt: "2025-08-20T10:00:00Z",
      taskId: "5",
    },
  ],
  "8": [
    {
      id: "s8-1",
      text: "Create folder structure on cloud storage",
      completed: false,
      createdAt: "2025-08-15T14:00:00Z",
      taskId: "8",
    },
    {
      id: "s8-2",
      text: "Sort photos by year and event",
      completed: false,
      createdAt: "2025-08-15T14:00:00Z",
      taskId: "8",
    },
    {
      id: "s8-3",
      text: "Delete duplicates and blurry photos",
      completed: false,
      createdAt: "2025-08-15T14:00:00Z",
      taskId: "8",
    },
  ],
  "9": [
    {
      id: "s9-1",
      text: "Read chapters 1-3",
      completed: true,
      createdAt: "2025-08-01T19:00:00Z",
      completedAt: "2025-08-10T21:30:00Z",
      taskId: "9",
    },
    {
      id: "s9-2",
      text: "Read chapters 4-6",
      completed: true,
      createdAt: "2025-08-01T19:00:00Z",
      completedAt: "2025-08-20T20:15:00Z",
      taskId: "9",
    },
    {
      id: "s9-3",
      text: "Take notes on key concepts",
      completed: false,
      createdAt: "2025-08-01T19:00:00Z",
      taskId: "9",
    },
    {
      id: "s9-4",
      text: "Write summary of main ideas",
      completed: false,
      createdAt: "2025-08-01T19:00:00Z",
      taskId: "9",
    },
  ],
  "11": [
    {
      id: "s11-1",
      text: "Research factory pattern examples",
      completed: true,
      createdAt: "2025-07-15T16:00:00Z",
      completedAt: "2025-07-20T18:45:00Z",
      taskId: "11",
    },
    {
      id: "s11-2",
      text: "Implement observer pattern demo",
      completed: false,
      createdAt: "2025-07-15T16:00:00Z",
      taskId: "11",
    },
    {
      id: "s11-3",
      text: "Study strategy pattern use cases",
      completed: false,
      createdAt: "2025-07-15T16:00:00Z",
      taskId: "11",
    },
  ],
};

export const getTaskSteps = (taskId: string): Step[] => {
  return mockSteps[taskId] || [];
};

export const getAllSteps = (): Step[] => {
  return Object.values(mockSteps).flat();
};

// Mock sessions data
export const mockSessions: Session[] = [
  // Completed sessions
  {
    id: 1,
    stepId: "s1-1",
    taskId: "1",
    startedAt: "2025-09-16T09:00:00Z",
    endedAt: "2025-09-16T14:30:00Z",
    wasCompleted: true,
    endingNote:
      "Thoroughly reviewed requirements. Found some clarifications needed but overall clear scope.",
    pinnedNoteIds: new Set(["note-1", "note-2"]),
  },
  {
    id: 2,
    stepId: "s1-2",
    taskId: "1",
    startedAt: "2025-09-17T08:30:00Z",
    endedAt: "2025-09-17T11:45:00Z",
    wasCompleted: true,
    endingNote:
      "Created detailed timeline with buffer time for potential delays.",
    pinnedNoteIds: new Set(["note-3"]),
  },
  {
    id: 3,
    stepId: "s4-1",
    taskId: "4",
    startedAt: "2025-09-05T13:00:00Z",
    endedAt: "2025-09-05T17:30:00Z",
    wasCompleted: true,
    endingNote:
      "Collected all performance metrics. Data looks promising for Q4 presentation.",
    pinnedNoteIds: new Set(["note-4"]),
  },
  {
    id: 4,
    stepId: "s4-2",
    taskId: "4",
    startedAt: "2025-09-08T10:00:00Z",
    endedAt: "2025-09-08T12:15:00Z",
    wasCompleted: true,
    pinnedNoteIds: new Set(),
  },
  {
    id: 5,
    stepId: "s9-1",
    taskId: "9",
    startedAt: "2025-08-10T20:00:00Z",
    endedAt: "2025-08-10T21:30:00Z",
    wasCompleted: true,
    endingNote: "Great insights on habit formation. Taking notes as I read.",
    pinnedNoteIds: new Set(["note-5"]),
  },
  {
    id: 6,
    stepId: "s9-2",
    taskId: "9",
    startedAt: "2025-08-20T19:30:00Z",
    endedAt: "2025-08-20T20:15:00Z",
    wasCompleted: true,
    pinnedNoteIds: new Set(),
  },
  {
    id: 7,
    stepId: "s2-1",
    taskId: "2",
    startedAt: "2025-09-12T14:00:00Z",
    endedAt: "2025-09-12T16:00:00Z",
    wasCompleted: true,
    endingNote:
      "Found all receipts. Organized them by category for easier processing.",
    pinnedNoteIds: new Set(),
  },
  {
    id: 8,
    stepId: "s5-1",
    taskId: "5",
    startedAt: "2025-08-25T09:00:00Z",
    endedAt: "2025-08-25T15:00:00Z",
    wasCompleted: true,
    endingNote:
      "Documentation audit complete. Found several outdated sections that need updating.",
    pinnedNoteIds: new Set(["note-7"]),
  },
  {
    id: 9,
    stepId: "s11-1",
    taskId: "11",
    startedAt: "2025-07-20T17:00:00Z",
    endedAt: "2025-07-20T18:45:00Z",
    wasCompleted: true,
    pinnedNoteIds: new Set(["note-8"]),
  },

  // Incomplete session (abandoned)
  {
    id: 10,
    stepId: "s1-3",
    taskId: "1",
    startedAt: "2025-09-18T14:00:00Z",
    endedAt: "2025-09-18T15:15:00Z",
    wasCompleted: false,
    endingNote:
      "Need to get more accurate cost estimates from vendors before finalizing budget.",
    pinnedNoteIds: new Set(["note-6"]),
  },

  // Currently active session (no endedAt)
  {
    id: 11,
    stepId: "s1-3",
    taskId: "1",
    startedAt: "2025-09-20T10:00:00Z",
    wasCompleted: false,
    pinnedNoteIds: new Set(["note-11", "note-12"]),
  },
];

// Mock session notes
export const mockSessionNotes: SessionNote[] = [
  {
    id: "note-1",
    content:
      "Client specifically mentioned they want to see ROI projections for the first 6 months. Need to factor this into the proposal structure.",
    timestamp: "2025-09-16T11:30:00Z",
    sessionId: 1,
    stepId: "s1-1",
    taskId: "1",
    stepName: "Review client requirements document",
    createdAt: new Date("2025-09-16T11:30:00Z"),
  },
  {
    id: "note-2",
    content:
      "Requirements document mentions integration with their existing CRM system - need to research their current tech stack.",
    timestamp: "2025-09-16T13:45:00Z",
    sessionId: 1,
    stepId: "s1-1",
    taskId: "1",
    stepName: "Review client requirements document",
    createdAt: new Date("2025-09-16T13:45:00Z"),
  },
  {
    id: "note-3",
    content:
      "Added 2-week buffer to development phase timeline to account for potential integration complexities.",
    timestamp: "2025-09-17T10:20:00Z",
    sessionId: 2,
    stepId: "s1-2",
    taskId: "1",
    stepName: "Draft project timeline and milestones",
    createdAt: new Date("2025-09-17T10:20:00Z"),
  },
  {
    id: "note-4",
    content:
      "Customer satisfaction scores increased by 15% this quarter - great data point for the presentation.",
    timestamp: "2025-09-05T15:00:00Z",
    sessionId: 3,
    stepId: "s4-1",
    taskId: "4",
    stepName: "Gather Q4 performance data",
    createdAt: new Date("2025-09-05T15:00:00Z"),
  },
  {
    id: "note-5",
    content:
      "The habit loop concept is fascinating - cue, routine, reward. Can apply this to improving my own productivity habits.",
    timestamp: "2025-08-10T21:00:00Z",
    sessionId: 5,
    stepId: "s9-1",
    taskId: "9",
    stepName: "Read chapters 1-3",
    createdAt: new Date("2025-08-10T21:00:00Z"),
  },
  {
    id: "note-6",
    content:
      "Need to contact three different vendors for accurate pricing on the database components. Current estimates might be too low.",
    timestamp: "2025-09-18T14:45:00Z",
    sessionId: 10,
    stepId: "s1-3",
    taskId: "1",
    stepName: "Create budget breakdown and pricing",
    createdAt: new Date("2025-09-18T14:45:00Z"),
  },
  {
    id: "note-7",
    content:
      "API documentation is severely outdated - many endpoints have changed since v2.0 release.",
    timestamp: "2025-08-25T12:30:00Z",
    sessionId: 8,
    stepId: "s5-1",
    taskId: "5",
    stepName: "Audit existing documentation",
    createdAt: new Date("2025-08-25T12:30:00Z"),
  },
  {
    id: "note-8",
    content:
      "Factory pattern is really useful for creating different types of database connections. Implemented a simple example with MySQL and PostgreSQL.",
    timestamp: "2025-07-20T18:30:00Z",
    sessionId: 9,
    stepId: "s11-1",
    taskId: "11",
    stepName: "Research factory pattern examples",
    createdAt: new Date("2025-07-20T18:30:00Z"),
  },

  // Notes for currently active session (session 11)
  {
    id: "note-9",
    content:
      "Got quotes from TechSolutions Inc: $45k for database infrastructure, $22k for API development. This is 20% higher than initial estimate.",
    timestamp: "2025-09-20T10:15:00Z",
    sessionId: 11,
    stepId: "s1-3",
    taskId: "1",
    stepName: "Create budget breakdown and pricing",
    createdAt: new Date("2025-09-20T10:15:00Z"),
  },
  {
    id: "note-10",
    content:
      "CloudHost pricing: $8k setup + $1.2k/month hosting. Need to factor in at least 12 months for realistic total cost.",
    timestamp: "2025-09-20T10:32:00Z",
    sessionId: 11,
    stepId: "s1-3",
    taskId: "1",
    stepName: "Create budget breakdown and pricing",
    createdAt: new Date("2025-09-20T10:32:00Z"),
  },
  {
    id: "note-11",
    content:
      "Important: Client has strict security requirements for payment processing. This might require additional PCI compliance costs (~$5k).",
    timestamp: "2025-09-20T11:05:00Z",
    sessionId: 11,
    stepId: "s1-3",
    taskId: "1",
    stepName: "Create budget breakdown and pricing",
    createdAt: new Date("2025-09-20T11:05:00Z"),
  },
  {
    id: "note-12",
    content:
      "Breaking down costs: Development (40%), Infrastructure (25%), Security & Compliance (15%), Testing & QA (10%), Project Management (10%).",
    timestamp: "2025-09-20T11:18:00Z",
    sessionId: 11,
    stepId: "s1-3",
    taskId: "1",
    stepName: "Create budget breakdown and pricing",
    createdAt: new Date("2025-09-20T11:18:00Z"),
  },
  {
    id: "note-13",
    content:
      "Remember to add 15% contingency buffer to the final quote. Better to overestimate and deliver under budget than the reverse.",
    timestamp: "2025-09-20T11:25:00Z",
    sessionId: 11,
    stepId: "s1-3",
    taskId: "1",
    stepName: "Create budget breakdown and pricing",
    createdAt: new Date("2025-09-20T11:25:00Z"),
  },
];

export const getSessionsForTask = (taskId: string): Session[] => {
  return mockSessions.filter((session) => session.taskId === taskId);
};

export const getSessionsForStep = (stepId: string): Session[] => {
  return mockSessions.filter((session) => session.stepId === stepId);
};

export const getNotesForSession = (sessionId: number): SessionNote[] => {
  return mockSessionNotes.filter((note) => note.sessionId === sessionId);
};

export const getNotesForStep = (stepId: string): SessionNote[] => {
  return mockSessionNotes.filter((note) => note.stepId === stepId);
};

export const getNotesForTask = (taskId: string): SessionNote[] => {
  return mockSessionNotes.filter((note) => note.taskId === taskId);
};

export const getCurrentSession = (): Session | null => {
  return mockSessions.find((session) => !session.endedAt) || null;
};

export const getSessionById = (sessionId: SessionIdType): Session | null => {
  return mockSessions.find((session) => session.id === sessionId) || null;
};
