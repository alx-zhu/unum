import React, { useState } from "react";
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
          <CardDescription className="text-sm text-gray-600 line-clamp-2 mt-1">
            {task.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="p-0">
        {/* Focus Button */}

        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="space-y-3">
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
              <div className="space-y-2">
                {taskSteps.map((step) => (
                  <div
                    key={step.id}
                    className={cn(
                      "flex items-start gap-2 text-sm group/step cursor-pointer rounded p-2 hover:bg-white",
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
                      className={cn("flex-1 leading-relaxed", {
                        "line-through": step.completed,
                      })}
                    >
                      {step.text}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Add New Step */}
            <div className="flex gap-2 mt-3">
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
            </div>
          </div>
        </div>
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
            {isExpanded ? "Hide steps" : "Show steps"}
            <ArrowDown
              className={`w-3 h-3 ml-1 transition-transform duration-200 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
