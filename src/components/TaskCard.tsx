import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown, Play, Calendar } from "lucide-react";
import type { Task } from "@/types/tasks";

const TaskCard: React.FC<{
  task: Task;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onSelect?: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
  showActions?: boolean;
}> = ({
  task,
  onMoveUp,
  onMoveDown,
  onSelect,
  canMoveUp,
  canMoveDown,
  showActions = true,
}) => {
  return (
    <Card className="group hover:shadow-sm transition-all duration-200 border-gray-200">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-gray-900 mb-1 line-clamp-1">
              {task.title}
            </h4>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
              {task.description}
            </p>
            {task.dueDate && (
              <div className="flex items-center text-xs text-gray-500">
                <Calendar className="w-3 h-3 mr-1" />
                {new Date(task.dueDate).toLocaleDateString()}
              </div>
            )}
          </div>

          {showActions && (
            <div className="flex flex-col ml-2 gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="sm"
                onClick={onMoveUp}
                disabled={!canMoveUp}
                className="h-6 w-6 p-0 hover:bg-gray-100"
              >
                <ChevronUp className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onMoveDown}
                disabled={!canMoveDown}
                className="h-6 w-6 p-0 hover:bg-gray-100"
              >
                <ChevronDown className="w-3 h-3" />
              </Button>
            </div>
          )}
        </div>

        {onSelect && (
          <Button
            className="w-full mt-3 bg-gray-900 hover:bg-gray-800 text-white"
            onClick={onSelect}
          >
            <Play className="w-4 h-4 mr-2" />
            Focus on this task
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskCard;
