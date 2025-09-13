import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Play } from "lucide-react";
import BucketSection from "@/components/BucketSection";
import TaskFocus from "@/components/TaskFocus";
import { mockTasks, mockCurrentTask, mockSteps } from "@/lib/constants";

export default function App() {
  const [currentView, setCurrentView] = useState<"buckets" | "focus">(
    "buckets"
  );
  const [tasks] = useState(mockTasks); // TODO: Connect to Redux store
  const [focusedTask] = useState(mockCurrentTask); // TODO: Connect to Redux store
  const [steps] = useState(mockSteps); // TODO: Connect to Redux store

  // TODO: Implement handlers
  const handleSelectTask = () => {
    setCurrentView("focus");
  };

  const handleCloseFocus = () => {
    setCurrentView("buckets");
  };

  const handleNextStep = () => {
    // TODO: Connect to Redux to update step completion
    console.log("Complete current step");
  };

  const handleCompleteTask = () => {
    // TODO: Connect to Redux to mark task complete and return to buckets
    setCurrentView("buckets");
  };

  if (currentView === "focus") {
    return (
      <TaskFocus
        task={focusedTask}
        steps={steps}
        onClose={handleCloseFocus}
        onNextStep={handleNextStep}
        onCompleteTask={handleCompleteTask}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            The ONE Thing
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Focus your energy on what matters most. Prioritize your tasks and
            work on your single most important action.
          </p>
        </div>

        <div className="space-y-8">
          <BucketSection
            title="Time-Sensitive"
            tasks={tasks.timeSensitive}
            limit={3}
            onAddTask={() => {
              /* TODO: Implement add task logic */
            }}
          />

          <Separator />

          <BucketSection
            title="Important"
            tasks={tasks.important}
            limit={5}
            onAddTask={() => {
              /* TODO: Implement add task logic */
            }}
          />

          <Separator />

          <BucketSection
            title="When Available"
            tasks={tasks.whenAvailable}
            onAddTask={() => {
              /* TODO: Implement add task logic */
            }}
          />
        </div>

        {tasks.timeSensitive.length > 0 && (
          <div className="fixed bottom-6 right-6">
            <Button
              size="lg"
              onClick={handleSelectTask}
              className="bg-gray-900 hover:bg-gray-800 text-white shadow-lg"
            >
              <Play className="w-5 h-5 mr-2" />
              Start working
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
