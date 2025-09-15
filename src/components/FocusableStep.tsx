// src/components/FocusableStep.tsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, CheckCircle2, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Step } from "@/types/tasks";

interface FocusableStepProps {
  step: Step;
  isNext: boolean; // First incomplete step
  onFocus: (stepId: string) => void;
  onToggleComplete: (stepId: string) => void;
  onEdit: (stepId: string) => void;
  onDelete: (stepId: string) => void;
  className?: string;
}

const FocusableStep: React.FC<FocusableStepProps> = ({
  step,
  isNext,
  onFocus,
  onToggleComplete,
  onEdit,
  onDelete,
  className,
}) => {
  return (
    <Card
      className={cn(
        "group/step transition-all duration-200 py-3 gap-0",
        {
          // Next step (primary focus) - matches your app's aesthetic
          "border-gray-900 shadow-sm": isNext && !step.completed,
          // Regular incomplete steps
          "bg-gray-50 border-0 shadow-none hover:border-gray-300 hover:shadow-sm":
            !isNext && !step.completed,
          // Completed steps
          "border-gray-100 bg-gray-50 opacity-75 border-none shadow-none":
            step.completed,
        },
        className
      )}
    >
      <CardContent className="px-3">
        <div className="flex items-start gap-3">
          {/* Status indicator */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToggleComplete(step.id)}
            className={cn(
              "w-5 h-5 p-0 rounded border-2 transition-colors mt-0.5 shrink-0 hover:bg-transparent",
              {
                "border-gray-900 bg-gray-900 text-white hover:bg-gray-800":
                  step.completed,
                "border-gray-300 hover:border-gray-400": !step.completed,
              }
            )}
          >
            {step.completed && <CheckCircle2 className="w-3 h-3" />}
          </Button>

          {/* Step content */}
          <div className="flex-1 min-w-0">
            <p
              className={cn("text-sm font-medium leading-relaxed", {
                "text-gray-900": !step.completed,
                "text-gray-500 line-through": step.completed,
              })}
            >
              {step.text}
            </p>

            {/* Next step indicator */}
            {isNext && !step.completed && (
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className="text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  Next action
                </Badge>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            {!step.completed && (
              <Button
                variant={isNext ? "default" : "ghost"}
                size="sm"
                onClick={() => onFocus(step.id)}
                className={cn(
                  "opacity-0 group-hover/step:opacity-100 transition-opacity shrink-0",
                  {
                    "opacity-100 bg-gray-900 hover:bg-gray-800 text-white":
                      isNext,
                  }
                )}
              >
                <Play className="w-3 h-3 mr-1" />
                {isNext ? "Focus" : "Work on"}
              </Button>
            )}

            <div
              className={cn(
                "flex items-center border-l border-gray-200 pl-2 group-hover/step:opacity-100 transition-opacity",
                {
                  "opacity-0": !isNext || step.completed,
                }
              )}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(step.id)}
                className="h-7 w-7 hover:bg-gray-100"
                title="Edit step"
              >
                <Pencil className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(step.id)}
                className="h-7 w-7 hover:bg-red-50 hover:text-red-600"
                title="Delete step"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FocusableStep;
