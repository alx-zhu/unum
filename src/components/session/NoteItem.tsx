// src/components/notes/NoteItem.tsx
import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pin, PinOff } from "lucide-react";
import type { SessionNote } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

interface NoteItemProps {
  note: SessionNote;
  onUpdate: (id: string, updates: { content?: string; title?: string }) => void;
  onPin?: (id: string) => void;
  onUnpin?: (id: string) => void;
  isPinned?: boolean;
  isOtherTask?: boolean;
  showPin?: boolean;
}

const NoteItem: React.FC<NoteItemProps> = ({
  note,
  onUpdate,
  onPin,
  onUnpin,
  isPinned = false,
  isOtherTask = false,
  showPin = true,
}) => {
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [content, setContent] = useState(note.content);
  const [title, setTitle] = useState(note.title || "");

  const contentTextareaRef = useRef<HTMLTextAreaElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);

  const hasTitle = Boolean(note.title?.trim());
  const isEditing = isEditingContent || isEditingTitle;

  // Handle content editing
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isEditingContent && !isEditingTitle) {
      setIsEditingContent(true);
    }
  };

  // Handle title editing
  const handleTitleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isEditingTitle && !isEditingContent) {
      setIsEditingTitle(true);
    }
  };

  // Handle pin toggle
  const handlePinToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPinned) {
      onUnpin?.(note.id);
    } else {
      onPin?.(note.id);
    }
  };

  // Save content
  const saveContent = () => {
    setIsEditingContent(false);
    if (content.trim() !== note.content) {
      onUpdate(note.id, { content: content.trim() });
    }
  };

  // Save title
  const saveTitle = () => {
    setIsEditingTitle(false);
    const trimmedTitle = title.trim();
    if (trimmedTitle !== note.title) {
      onUpdate(note.id, { title: trimmedTitle || undefined });
    }
  };

  // Cancel content editing
  const cancelContentEdit = () => {
    setContent(note.content);
    setIsEditingContent(false);
  };

  // Cancel title editing
  const cancelTitleEdit = () => {
    setTitle(note.title || "");
    setIsEditingTitle(false);
  };

  // Keyboard handlers
  const handleContentKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      saveContent();
    }
    if (event.key === "Escape") {
      event.preventDefault();
      cancelContentEdit();
    }
  };

  const handleTitleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      saveTitle();
    }
    if (event.key === "Escape") {
      event.preventDefault();
      cancelTitleEdit();
    }
  };

  // Auto-resize textarea
  const autoResizeTextarea = () => {
    const textarea = contentTextareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = Math.max(textarea.scrollHeight, 60) + "px";
    }
  };

  // Focus effects
  useEffect(() => {
    if (isEditingContent && contentTextareaRef.current) {
      contentTextareaRef.current.focus();
      contentTextareaRef.current.select();
      autoResizeTextarea();
    }
  }, [isEditingContent]);

  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus();
      titleInputRef.current.select();
    }
  }, [isEditingTitle]);

  return (
    <Card
      className={cn(
        "group relative rounded-md border transition-all duration-150 cursor-pointer",
        "hover:border-gray-300 hover:shadow-sm hover:-translate-y-0.5 gap-0 p-3",

        // Base styling based on context
        isPinned && "border-amber-200 bg-amber-50 hover:border-amber-300",
        !isPinned &&
          isOtherTask &&
          "bg-gray-50 border-gray-200 opacity-85 hover:opacity-100 hover:bg-white",
        !isPinned && !isOtherTask && "bg-white border-gray-200",

        // Editing state
        isEditing &&
          "border-gray-900 shadow-md ring-1 ring-gray-900/10 -translate-y-0.5"
      )}
    >
      {/* Pin Button */}
      {showPin && (
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "absolute top-2 right-2 h-6 w-6 p-0 opacity-0 transition-opacity",
            "group-hover:opacity-100 hover:bg-gray-100",
            isPinned &&
              "opacity-100 text-amber-600 hover:text-amber-700 hover:bg-amber-100",
            isEditing && "opacity-100"
          )}
          onClick={handlePinToggle}
        >
          {isPinned ? (
            <PinOff className="h-3 w-3" />
          ) : (
            <Pin className="h-3 w-3" />
          )}
        </Button>
      )}

      <CardHeader
        className={cn(
          "transition-all duration-200 ease-out p-0",
          hasTitle || isEditing
            ? "max-h-8 opacity-100"
            : "max-h-0 opacity-0 group-hover:max-h-8 group-hover:opacity-100"
        )}
      >
        {isEditingTitle ? (
          <Input
            ref={titleInputRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={saveTitle}
            onKeyDown={handleTitleKeyDown}
            placeholder="Add title..."
            className="h-6 text-sm font-medium border-0 p-0 shadow-none focus-visible:ring-0  rounded"
          />
        ) : (
          <div
            onClick={handleTitleClick}
            className={cn(
              "text-sm font-medium cursor-text rounded px-1 py-0.5 -mx-1 transition-colors",
              isPinned ? "hover:bg-amber-200" : "hover:bg-gray-100",
              hasTitle ? "text-gray-900" : "text-gray-400 italic"
            )}
          >
            {hasTitle ? note.title : "Add title..."}
          </div>
        )}
      </CardHeader>

      <CardContent className="p-0">
        {/* Content */}
        {isEditingContent ? (
          <Textarea
            ref={contentTextareaRef}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              autoResizeTextarea();
            }}
            onBlur={saveContent}
            onKeyDown={handleContentKeyDown}
            placeholder="Add your note..."
            className="text-sm leading-relaxed resize-none border-0 p-0 shadow-none focus-visible:ring-0 min-h-[3rem]"
          />
        ) : (
          <div
            onClick={handleContentClick}
            className={cn(
              "text-sm text-gray-700 leading-relaxed cursor-text rounded px-1 py-0.5 -mx-1 transition-colors",
              isPinned ? "hover:bg-amber-200" : "hover:bg-gray-100",
              // Line clamping for preview
              !isEditing && "line-clamp-3"
            )}
          >
            {content || "Click to add content..."}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col p-0 mt-2">
        <span className="text-xs text-gray-500 text-right w-full truncate">
          {note.stepName && note.stepName}
        </span>
        <span className="text-xs text-gray-400 text-right italic w-full truncate">
          {note.createdAt
            ? `${formatDistanceToNow(new Date(note.createdAt), {
                addSuffix: true,
              })}`
            : "Just now"}
        </span>
      </CardFooter>
    </Card>
  );
};

export default NoteItem;
