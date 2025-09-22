import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import TaskCard from "@/components/TaskCard";
import type { Task } from "@/types";

const BucketSection: React.FC<{
  title: string;
  tasks: Task[];
  limit?: number;
  onAddTask?: () => void;
  children?: React.ReactNode;
}> = ({ title, tasks, limit, onAddTask, children }) => {
  const remainingSlots = limit ? limit - tasks.length : 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          {limit && (
            <Badge variant="secondary" className="text-xs">
              {tasks.length}/{limit}
            </Badge>
          )}
        </div>
        {onAddTask && (
          <Button variant="outline" size="sm" onClick={onAddTask}>
            <Plus className="w-4 h-4" />
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {children}
        {tasks.map((task, index) => (
          <TaskCard
            key={task.id}
            task={task}
            canMoveUp={index > 0}
            canMoveDown={index < tasks.length - 1}
            onMoveUp={() => {
              /* TODO: Implement move up logic */
            }}
            onMoveDown={() => {
              /* TODO: Implement move down logic */
            }}
            onSelect={
              title === "Time-Sensitive"
                ? () => {
                    /* TODO: Implement select logic */
                  }
                : undefined
            }
          />
        ))}

        {limit && remainingSlots > 0 && (
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-500">
              {remainingSlots} slot{remainingSlots > 1 ? "s" : ""} available
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BucketSection;
