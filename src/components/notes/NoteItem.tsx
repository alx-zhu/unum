// src/components/notes/NoteItem.tsx
import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import type { SessionNote } from "@/types/notes";

interface NoteItemProps {
  note: SessionNote;
  onUpdate: (id: string, content: string) => void;
  isOtherTask?: boolean;
}

const NoteItem: React.FC<NoteItemProps> = ({
  note,
  onUpdate,
  isOtherTask = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(note.content);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleClick = () => {
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (content.trim() !== note.content) {
      onUpdate(note.id, content.trim());
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      handleBlur();
    }
    if (event.key === "Escape") {
      setContent(note.content);
      setIsEditing(false);
    }
  };

  const autoResizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  };

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
      autoResizeTextarea();
    }
  }, [isEditing]);

  return (
    <div
      className={cn(
        "rounded-md border p-3 mb-2 cursor-text transition-all duration-150",
        "hover:border-gray-300 hover:bg-white hover:shadow-sm",
        isOtherTask
          ? "bg-gray-100 border-gray-100 opacity-70 hover:opacity-100"
          : "bg-gray-50 border-gray-200",
        isEditing &&
          "border-gray-900 bg-white shadow-sm ring-1 ring-gray-900 opacity-100"
      )}
      onClick={handleClick}
    >
      <div className="flex items-center gap-2 mb-1.5 text-xs text-gray-500">
        <span>{note.timestamp}</span>
        {note.stepName && (
          <>
            <span>•</span>
            <span>{note.stepName}</span>
          </>
        )}
      </div>

      {isEditing ? (
        <Textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            autoResizeTextarea();
          }}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="text-sm text-gray-700 leading-relaxed min-h-5 resize-none border-0 p-0 shadow-none focus-visible:ring-0"
        />
      ) : (
        <div
          className={cn(
            "text-sm text-gray-700 leading-relaxed min-h-5 transition-all duration-300 ease-in-out overflow-hidden",
            "line-clamp-2 max-h-10"
          )}
        >
          {content || "Click to add a note..."}
        </div>
      )}
    </div>
  );
};

export default NoteItem;
