import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardTitle,
  CardHeader,
  CardFooter,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUp,
  ArrowDown,
  Play,
  Plus,
  Calendar,
  MoreHorizontal,
  Edit3,
  Trash2,
  List,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { DueDateBadge } from "./DueDateBadge";

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate?: string;
}

interface TaskStep {
  id: string;
  text: string;
  completed: boolean;
}

interface TaskCardProps {
  task: Task;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onSelect?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
  showActions?: boolean;
}

// Static sample steps - TODO: Connect to Redux store
const getTaskSteps = (taskId: string): TaskStep[] => {
  const stepSamples: Record<string, TaskStep[]> = {
    "1": [
      {
        id: "s1-1",
        text: "Create folder structure on cloud storage",
        completed: false,
      },
      { id: "s1-2", text: "Sort photos by year and event", completed: false },
      {
        id: "s1-3",
        text: "Delete duplicates and blurry photos",
        completed: false,
      },
    ],
    "2": [
      { id: "s2-1", text: "Read chapters 1-3", completed: true },
      { id: "s2-2", text: "Take notes on key concepts", completed: false },
      { id: "s2-3", text: "Write summary of main ideas", completed: false },
    ],
    "4": [
      { id: "s4-1", text: "Gather Q4 performance data", completed: true },
      { id: "s4-2", text: "Create slide outline", completed: false },
      {
        id: "s4-3",
        text: "Design charts and visualizations",
        completed: false,
      },
      { id: "s4-4", text: "Practice presentation timing", completed: false },
    ],
    "6": [
      {
        id: "s6-1",
        text: "Review client requirements document",
        completed: true,
      },
      {
        id: "s6-2",
        text: "Draft project timeline and milestones",
        completed: true,
      },
      {
        id: "s6-3",
        text: "Create budget breakdown and pricing",
        completed: false,
      },
      { id: "s6-4", text: "Write executive summary", completed: false },
      {
        id: "s6-5",
        text: "Format and proofread final document",
        completed: false,
      },
    ],
  };

  return stepSamples[taskId] || [];
};

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onMoveUp,
  onMoveDown,
  onSelect,
  onEdit,
  onDelete,
  canMoveUp,
  canMoveDown,
  showActions = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showActionsMenu, setShowActionsMenu] = useState(false);
  const [newStep, setNewStep] = useState("");

  const taskSteps = getTaskSteps(task.id);
  const completedSteps = taskSteps.filter((step) => step.completed).length;
  const hasSteps = taskSteps.length > 0;

  const handleAddStep = () => {
    if (newStep.trim()) {
      // TODO: Connect to Redux store to add step
      console.log("Adding step to task", task.id, ":", newStep);
      setNewStep("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddStep();
    } else if (e.key === "Escape") {
      setNewStep("");
    }
  };

  const toggleStepCompletion = (stepId: string) => {
    // TODO: Connect to Redux store to toggle step completion
    console.log("Toggling step completion:", stepId);
  };

  const handleEdit = () => {
    setShowActionsMenu(false);
    onEdit?.();
  };

  const handleDelete = () => {
    setShowActionsMenu(false);
    onDelete?.();
  };

  return (
    <Card className="group hover:shadow-sm transition-all duration-200 border-gray-200 relative pb-0 gap-0">
      <CardHeader className="pb-4">
        <CardTitle className="font-medium text-gray-900 line-clamp-1 flex-1">
          {task.title}
        </CardTitle>
        {task.description && (
          <CardDescription className="text-sm text-gray-600 line-clamp-2 my-1">
            {task.description}
          </CardDescription>
        )}
        <div className="flex items-center gap-2 mt-1">
          {task.dueDate && <DueDateBadge dueDate={task.dueDate} />}
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              key={`${task.id}-expandable-content`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: [0.4, 0.0, 0.2, 1],
              }}
              className="overflow-hidden"
            >
              <div className="border-t border-gray-200 p-4 bg-gray-50">
                <motion.div
                  className="space-y-3"
                  initial={{ y: -10 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.1, duration: 0.2 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-700 uppercase tracking-wide">
                      Steps
                    </span>
                    {hasSteps && (
                      <Badge variant="secondary" className="text-xs">
                        {completedSteps}/{taskSteps.length}
                      </Badge>
                    )}
                  </div>

                  {/* Existing Steps */}
                  {hasSteps && (
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.15, duration: 0.2 }}
                    >
                      {taskSteps.map((step, index) => (
                        <motion.div
                          key={step.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.2 + index * 0.05,
                            duration: 0.2,
                          }}
                          className={cn(
                            "flex items-start gap-2 text-sm group/step cursor-pointer rounded p-2 hover:bg-gray-100 transition-colors duration-150",
                            {
                              "text-gray-500": step.completed,
                              "text-gray-700": !step.completed,
                            }
                          )}
                          onClick={() => toggleStepCompletion(step.id)}
                        >
                          <div
                            className={cn(
                              "w-4 h-4 rounded border mt-0.5 flex items-center justify-center text-xs shrink-0 transition-colors",
                              {
                                "bg-green-600 border-green-600 text-white":
                                  step.completed,
                                "border-gray-300 hover:border-gray-400":
                                  !step.completed,
                              }
                            )}
                          >
                            {step.completed && "✓"}
                          </div>
                          <span
                            className={`flex-1 leading-relaxed ${
                              step.completed ? "line-through" : ""
                            }`}
                          >
                            {step.text}
                          </span>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {/* Add New Step */}
                  <motion.div
                    className="flex gap-2 mt-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.2 }}
                  >
                    <input
                      type="text"
                      placeholder="Add a step..."
                      value={newStep}
                      onChange={(e) => setNewStep(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-1 text-sm px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent placeholder-gray-400 bg-white"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleAddStep}
                      disabled={!newStep.trim()}
                      className="h-8 px-2 hover:bg-gray-100 disabled:opacity-40"
                      aria-label="Add step"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>

      <CardFooter className="p-0">
        {hasSteps && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full h-10 text-xs text-gray-600 hover:text-gray-800 hover:bg-gray-50 border-t border-gray-100 rounded-none rounded-b-lg"
          >
            <List className="w-3 h-3 mr-1" />
            <span>{isExpanded ? "Hide steps" : "Show steps"}</span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowDown className="w-3 h-3 ml-1" />
            </motion.div>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
