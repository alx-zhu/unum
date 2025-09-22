// src/components/notes/QuickNoteInput.tsx
import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface QuickNoteInputProps {
  ref: React.RefObject<HTMLTextAreaElement | null>;
  onSave: (content: string) => void;
  onInputChange: (hasContent: boolean) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

const QuickNoteInput: React.FC<QuickNoteInputProps> = ({
  ref,
  onSave,
  onInputChange,
  placeholder = "Capture a quick thought...",
  autoFocus = false,
}) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    if (autoFocus && ref.current) {
      ref.current.focus();
    }
  }, [autoFocus, ref]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      handleSave();
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = event.target.value;
    setContent(newContent);
    onInputChange(newContent.trim().length > 0);

    // Auto-resize
    const textarea = event.target;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 80)}px`;
  };

  const handleSave = () => {
    const trimmedContent = content.trim();
    if (trimmedContent) {
      onSave(trimmedContent);
      setContent("");
      onInputChange(false);

      // Reset height
      if (ref.current) {
        ref.current.style.height = "auto";
      }
    }
  };

  return (
    <div className="space-y-2">
      <Textarea
        ref={ref}
        value={content}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={1}
        className={cn(
          "min-h-10 resize-none transition-all duration-200",
          "bg-gray-50 border-gray-200 focus:bg-white focus:border-gray-900",
          "focus:ring-2 focus:ring-gray-900/10"
        )}
      />
      <div className="flex items-center gap-4 text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs font-medium">
            ⌘
          </kbd>
          <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs font-medium">
            ↵
          </kbd>
          <span>to save</span>
        </div>
        <div className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs font-medium">
            ⌘
          </kbd>
          <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs font-medium">
            K
          </kbd>
          <span>to focus</span>
        </div>
      </div>
    </div>
  );
};

export default QuickNoteInput;
