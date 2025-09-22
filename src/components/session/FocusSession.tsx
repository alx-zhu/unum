// src/components/FocusSession.tsx
import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Clock, CheckCircle2, Pause } from "lucide-react";
import type { Step } from "@/types";
import { mockTasks, getNotesForStep, getCurrentSession } from "@/lib/constants";
import { motion } from "framer-motion";
import type { SessionNote } from "@/types";
import SessionNotes from "./SessionNotesV2";

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
  // Find the task that corresponds to this step
  const task = useMemo(() => {
    return mockTasks.find((t) => t.id === step.taskId);
  }, [step.taskId]);

  // Get the current session
  const currentSession = getCurrentSession();
  console.log("Current session:", currentSession);

  // Initialize notes with existing notes for this step
  const [notes, setNotes] = useState<SessionNote[]>(() => {
    const existingNotes = getNotesForStep(step.id);
    return existingNotes.length > 0 ? existingNotes : [];
  });

  const handleCreateNote = (content: string) => {
    const newNote: SessionNote = {
      id: `note-${Date.now()}`,
      content,
      timestamp: new Date().toISOString(),
      sessionId: currentSession?.id || Date.now(),
      stepId: step.id,
      taskId: step.taskId,
      stepName: step.text,
      createdAt: new Date(),
    };

    setNotes((prev) => [newNote, ...prev]);

    // TODO: Save to your backend/storage
    console.log("Creating note:", newNote);
  };

  const handleUpdateNote = (
    id: string,
    updates: { content?: string; title?: string }
  ) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? { ...note, ...updates, timestamp: new Date().toISOString() }
          : note
      )
    );

    // TODO: Save to your backend/storage
    console.log("Updating note:", id, updates);
  };

  const handleCompleteStep = () => {
    // Save notes before closing
    onNextStep();
  };

  const handlePauseSession = () => {
    // Save notes before closing
    onClose();
  };

  // If task is not found, show error state
  if (!task) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card>
          <CardContent className="p-6">
            <p className="text-red-600">
              Error: Task not found for step {step.id}
            </p>
            <Button onClick={onClose} className="mt-4">
              Close
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
          notes={notes}
          sessionId={currentSession?.id || 0}
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
