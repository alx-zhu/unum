// src/components/notes/NoteItem.tsx
import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
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
  const contentRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (isEditing && contentRef.current) {
      contentRef.current.focus();

      // Select all text
      const range = document.createRange();
      range.selectNodeContents(contentRef.current);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
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
      <div
        ref={contentRef}
        contentEditable={isEditing}
        suppressContentEditableWarning={true}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onInput={(e) => setContent(e.currentTarget.textContent || "")}
        className={cn(
          "text-sm text-gray-700 leading-relaxed min-h-5 outline-none",
          isEditing && "bg-white p-2 border border-gray-200 rounded"
        )}
      >
        {content}
      </div>
    </div>
  );
};

export default NoteItem;
