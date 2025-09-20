// src/components/FocusSession.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Clock, CheckCircle2, Pause } from "lucide-react";
import type { Task, Step } from "@/types/tasks";
import { mockTasks } from "@/lib/constants";
import { motion } from "framer-motion";
import type { SessionNote } from "@/types/notes";
import SessionNotes from "./notes/SessionNotes";

interface FocusSessionProps {
  step: Step;
  onClose: () => void;
  onNextStep: () => void;
  onCompleteTask: () => void;
}

const FocusSession: React.FC<FocusSessionProps> = ({
  step,
  onClose,
  onNextStep,
  onCompleteTask,
}) => {
  const task: Task = mockTasks[5];
  const [notes, setNotes] = useState<SessionNote[]>([
    // Mock data - replace with your actual data source
    {
      id: "n1",
      content:
        "Competitor A charges $99/month but lacks advanced analytics. This could be our key differentiator. Recommend highlighting this in our pricing page. How can we best showcase our analytics features?",
      timestamp: "2 minutes ago",
      stepId: step.id, // Assuming step has an id property
      createdAt: new Date(Date.now() - 2 * 60 * 1000),
    },
    {
      id: "n2",
      content:
        "Found pricing page: https://competitor-a.com/pricing - need to analyze their tiers",
      timestamp: "5 minutes ago",
      stepId: step.id,
      createdAt: new Date(Date.now() - 5 * 60 * 1000),
    },
    {
      id: "n3",
      content:
        "Client mentioned they want aggressive timeline. Need to factor this into pricing strategy.",
      timestamp: "Yesterday",
      stepId: "s6-1", // Different step ID
      stepName: "Client Discovery",
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    },
  ]);

  // Add these handler functions:
  const handleCreateNote = (content: string) => {
    const newNote: SessionNote = {
      id: `note-${Date.now()}`,
      content,
      timestamp: "Just now",
      stepId: step.id, // Current step ID
      createdAt: new Date(),
    };

    setNotes((prev) => [newNote, ...prev]);

    // TODO: Save to your backend/storage
    console.log("Creating note:", newNote);
  };

  const handleUpdateNote = (id: string, content: string) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, content, timestamp: "Just updated" } : note
      )
    );

    // TODO: Save to your backend/storage
    console.log("Updating note:", id, content);
  };

  const handleCompleteStep = () => {
    // Save notes before closing
    onNextStep();
  };

  const handlePauseSession = () => {
    // Save notes before closing
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
        <SessionNotes
          currentStepId={step.id} // Assuming step has an id property
          currentStepName={step.text}
          notes={notes}
          onCreateNote={handleCreateNote}
          onUpdateNote={handleUpdateNote}
        />

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
