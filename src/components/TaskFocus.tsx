import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import type { Task, Step } from "@/types/tasks";

const TaskFocus: React.FC<{
  task: Task;
  steps: Step[];
  onClose: () => void;
  onNextStep: () => void;
  onCompleteTask: () => void;
}> = ({ task, steps, onClose, onNextStep, onCompleteTask }) => {
  const [showQuickAdd, setShowQuickAdd] = useState(true);
  const currentStep = steps.find((step) => !step.completed);
  const completedSteps = steps.filter((step) => step.completed).length;
  const progress = (completedSteps / steps.length) * 100;

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-auto">
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={onClose}>
            ← Back to tasks
          </Button>
          <div className="text-sm text-gray-500">
            Step {completedSteps + 1} of {steps.length}
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Your ONE Thing
          </h1>
          <Card className="p-6 bg-gray-50 border-gray-200">
            <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
            <p className="text-gray-600">{task.description}</p>
            {task.dueDate && (
              <div className="flex items-center justify-center text-sm text-gray-500 mt-3">
                <Calendar className="w-4 h-4 mr-1" />
                Due {new Date(task.dueDate).toLocaleDateString()}
              </div>
            )}
          </Card>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm text-gray-500">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gray-900 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <h3 className="font-semibold text-gray-900">Steps</h3>
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-start gap-3 p-3 rounded-lg ${
                step.completed
                  ? "bg-green-50 border border-green-200"
                  : index === completedSteps
                  ? "bg-blue-50 border border-blue-200"
                  : "bg-gray-50 border border-gray-200"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                  step.completed
                    ? "bg-green-600 text-white"
                    : index === completedSteps
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                {step.completed ? "✓" : index + 1}
              </div>
              <span
                className={`flex-1 ${
                  step.completed
                    ? "text-green-800"
                    : index === completedSteps
                    ? "text-blue-800 font-medium"
                    : "text-gray-600"
                }`}
              >
                {step.text}
              </span>
            </div>
          ))}
        </div>

        {currentStep ? (
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-4 text-gray-900">
              Next Action:
            </h4>
            <Card className="p-4 mb-6 bg-blue-50 border-blue-200">
              <p className="text-blue-800 font-medium">{currentStep.text}</p>
            </Card>
            <Button
              size="lg"
              onClick={onNextStep}
              className="bg-gray-900 hover:bg-gray-800 text-white"
            >
              Complete this step
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-4 text-green-800">
              All steps completed!
            </h4>
            <Button
              size="lg"
              onClick={onCompleteTask}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Mark task as complete
            </Button>
          </div>
        )}

        {/* Quick Add Urgent Task Modal */}
        {showQuickAdd && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
            <Card className="w-full max-w-md mx-4">
              <CardHeader>
                <CardTitle>Add Urgent Task</CardTitle>
                <p className="text-sm text-gray-600">
                  This will be added to your Time-Sensitive bucket
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <input
                  type="text"
                  placeholder="Task title"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
                <textarea
                  placeholder="Description (optional)"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
                />
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowQuickAdd(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      // TODO: Add task to Redux store
                      setShowQuickAdd(false);
                    }}
                    className="flex-1 bg-gray-900 hover:bg-gray-800 text-white"
                  >
                    Add Task
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskFocus;
