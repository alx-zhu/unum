import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Play } from "lucide-react";
import BucketSection from "@/components/BucketSection";
import FocusSession from "./components/FocusSession";
import { mockTasks, getTaskSteps } from "@/lib/constants";

export default function App() {
  const [currentView, setCurrentView] = useState<"buckets" | "focus">(
    "buckets"
  );
  const [tasks] = useState(mockTasks); // TODO: Connect to Redux store

  const handleCloseFocus = () => {
    setCurrentView("buckets");
  };

  if (currentView === "focus") {
    return (
      <FocusSession
        onExit={handleCloseFocus}
        step={getTaskSteps("1")[0]}
        onComplete={() => console.log("Complete current step")}
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
            tasks={tasks.filter((t) => t.bucketId === "time-sensitive")}
            limit={3}
            onAddTask={() => {
              /* TODO: Implement add task logic */
            }}
          />

          <Separator />

          <BucketSection
            title="Important"
            tasks={tasks.filter((t) => t.bucketId === "important")}
            limit={5}
            onAddTask={() => {
              /* TODO: Implement add task logic */
            }}
          />

          <Separator />

          <BucketSection
            title="When Available"
            tasks={tasks.filter((t) => t.bucketId === "when-available")}
            onAddTask={() => {
              /* TODO: Implement add task logic */
            }}
          />
        </div>

        <div className="fixed bottom-6 right-6">
          <Button
            size="lg"
            onClick={() => setCurrentView("focus")}
            className="bg-gray-900 hover:bg-gray-800 text-white shadow-lg"
          >
            <Play className="w-5 h-5 mr-2" />
            Start working
          </Button>
        </div>
      </div>
    </div>
  );
}
