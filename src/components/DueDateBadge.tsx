import {
  formatDistanceToNow,
  isPast,
  isToday,
  isTomorrow,
  isFuture,
  parseISO,
  isValid,
} from "date-fns";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";

interface DueDateInfo {
  date: Date;
  label: string;
  severity: "overdue" | "today" | "tomorrow" | "soon" | "normal";
}

function getDueDateInfo(dueDate: string): DueDateInfo | null {
  if (!dueDate) return null;

  const date = parseISO(dueDate);
  if (!isValid(date)) return null;

  const label = formatDistanceToNow(date, {
    addSuffix: true,
    includeSeconds: false,
  });

  let severity: DueDateInfo["severity"];
  if (isPast(date) && !isToday(date)) {
    severity = "overdue";
  } else if (isToday(date)) {
    severity = "today";
  } else if (isTomorrow(date)) {
    severity = "tomorrow";
  } else if (
    isFuture(date) &&
    date.getTime() - new Date().getTime() <= 7 * 24 * 60 * 60 * 1000
  ) {
    severity = "soon";
  } else {
    severity = "normal";
  }

  return {
    date,
    label,
    severity,
  };
}

function getDueDateClasses(severity: DueDateInfo["severity"]): string {
  // const baseClasses = "px-2 py-1";
  const baseClasses = "cursor-default";

  switch (severity) {
    case "overdue":
      return `${baseClasses} bg-red-100 text-red-700 border border-red-200 hover:bg-red-200`;
    case "today":
      return `${baseClasses} bg-orange-100 text-orange-700 border border-orange-200 hover:bg-orange-200`;
    case "tomorrow":
      return `${baseClasses} bg-yellow-100 text-yellow-700 border border-yellow-200 hover:bg-yellow-200`;
    case "soon":
      return `${baseClasses} bg-blue-100 text-blue-700 border border-blue-200 hover:bg-blue-200`;
    case "normal":
    default:
      return `${baseClasses} bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200`;
  }
}

interface DueDateBadgeProps {
  dueDate: string;
  className?: string;
}

export function DueDateBadge({ dueDate, className = "" }: DueDateBadgeProps) {
  const dueDateInfo = getDueDateInfo(dueDate);
  if (!dueDateInfo) return null;

  return (
    <Badge
      className={cn(getDueDateClasses(dueDateInfo.severity), className)}
      title={`Due: ${dueDateInfo.label}`}
    >
      <Calendar className="w-4 h-4 mr-1" /> {dueDateInfo.label}
    </Badge>
  );
}
