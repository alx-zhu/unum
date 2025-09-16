// src/components/FocusSession.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  X,
  Clock,
  CheckCircle2,
  FileText,
  ChevronDown,
  ChevronUp,
  Pause,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Task, Step } from "@/types/tasks";
import { mockTasks } from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";

interface FocusSessionProps {
  step: Step;
  onClose: () => void;
  onNextStep: () => void;
  onCompleteTask: () => void;
}

interface FocusSessionNote {
  id: string;
  content: string;
  timestamp: string;
  stepId: string;
}

const FocusSession: React.FC<FocusSessionProps> = ({
  step,
  onClose,
  onNextStep,
  onCompleteTask,
}) => {
  const [currentNotes, setCurrentNotes] = useState("");
  const [showNotesArchive, setShowNotesArchive] = useState(false);
  const task: Task = mockTasks[5];

  // Mock previous notes data
  const previousNotes: FocusSessionNote[] = [
    {
      id: "n1",
      content:
        "Client mentioned they want the timeline to be more aggressive. Need to discuss resource allocation.",
      timestamp: "2 hours ago",
      stepId: "s6-1",
    },
    {
      id: "n2",
      content:
        "Found the template from last quarter's proposal. Can reuse the structure and update numbers.",
      timestamp: "Yesterday",
      stepId: "s6-2",
    },
  ];

  const handleCompleteStep = () => {
    // Save current notes before moving to next step
    if (currentNotes.trim()) {
      // TODO: Save notes to store
      console.log("Saving notes:", currentNotes);
    }
    onNextStep();
    setCurrentNotes(""); // Clear notes for next step
  };

  const handlePauseSession = () => {
    // Save current notes before pausing
    if (currentNotes.trim()) {
      // TODO: Save notes to store
      console.log("Saving notes:", currentNotes);
    }
    onClose();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-1 h-8 bg-gradient-to-b from-gray-900 to-gray-600 rounded-full"></div>
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <p className="text-sm font-medium text-gray-600">
                    Focus Session
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                >
                  <h1 className="text-lg font-semibold text-gray-900 line-clamp-1">
                    {task.title}
                  </h1>
                </motion.div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
              Exit Session
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="max-w-2xl mx-auto px-6 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeIn" }}
      >
        {/* Current Step */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center space-x-2 mb-2">
              <Badge
                variant="secondary"
                className="bg-blue-100 text-blue-700 border-blue-200"
              >
                <Clock className="w-3 h-3 mr-1" />
                Current Step
              </Badge>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 leading-tight">
              {step.text}
            </h2>
          </CardHeader>
        </Card>

        {/* Notes Section */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900">Session Notes</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNotesArchive(!showNotesArchive)}
                className="text-gray-500 hover:text-gray-700 text-xs"
              >
                <FileText className="w-3 h-3 mr-1" />
                Previous Notes
                {showNotesArchive ? (
                  <ChevronUp className="w-3 h-3 ml-1" />
                ) : (
                  <ChevronDown className="w-3 h-3 ml-1" />
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <textarea
              value={currentNotes}
              onChange={(e) => setCurrentNotes(e.target.value)}
              placeholder="Capture thoughts, insights, or obstacles as you work on this step..."
              className={cn(
                "w-full min-h-[120px] p-3 border border-gray-200 rounded-md",
                "text-sm leading-relaxed resize-none",
                "placeholder:text-gray-400 text-gray-900",
                "focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent",
                "transition-all duration-200"
              )}
            />

            {/* Notes Archive */}
            <AnimatePresence initial={false}>
              {showNotesArchive && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
                  className="overflow-hidden "
                >
                  <Separator className="my-6" />
                  <div className="space-y-3">
                    <h4 className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                      Previous Session Notes
                    </h4>
                    {previousNotes.length > 0 ? (
                      <div className="space-y-2">
                        {previousNotes.map((note, index) => (
                          <motion.div
                            key={note.id}
                            className="p-3 bg-gray-50 border border-gray-100 rounded-md"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: 0.15 + index * 0.05,
                              duration: 0.2,
                            }}
                          >
                            <div className="text-xs text-gray-500 mb-1">
                              {note.timestamp}
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed">
                              {note.content}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 text-center py-4">
                        No previous notes for this task
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center">
          <Button
            variant="outline"
            onClick={handlePauseSession}
            className="flex items-center"
          >
            <Pause className="w-4 h-4 mr-2" />
            Pause Session
          </Button>
          <Button
            onClick={handleCompleteStep}
            className="bg-gray-900 hover:bg-gray-800 text-white flex items-center"
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Complete Step
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default FocusSession;
