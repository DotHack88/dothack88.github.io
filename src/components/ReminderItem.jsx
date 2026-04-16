const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React from "react";
import { format, isPast, isToday } from "date-fns";
import { it } from "date-fns/locale";

import { CheckCircle2, Circle, Clock, AlertTriangle } from "lucide-react";

export default function ReminderItem({ reminder, bonsaiName, onUpdate }) {
  const [optimisticCompleted, setOptimisticCompleted] = React.useState(reminder.completed);
  const effectiveCompleted = optimisticCompleted;
  const isOverdue = isPast(new Date(reminder.due_date)) && !isToday(new Date(reminder.due_date)) && !effectiveCompleted;
  const isDueToday = isToday(new Date(reminder.due_date)) && !effectiveCompleted;

  const toggleComplete = async () => {
    const newVal = !optimisticCompleted;
    setOptimisticCompleted(newVal);
    await db.entities.Reminder.update(reminder.id, { completed: newVal });
    onUpdate?.();
  };

  return (
    <div
      className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all ${
        effectiveCompleted
          ? "bg-muted/30 border-border opacity-60"
          : isOverdue
          ? "bg-destructive/5 border-destructive/20"
          : isDueToday
          ? "bg-accent/10 border-accent/30"
          : "bg-card border-border"
      }`}
    >
      <button onClick={toggleComplete} className="mt-0.5 shrink-0 select-none">
        {effectiveCompleted ? (
          <CheckCircle2 className="h-5 w-5 text-primary" />
        ) : (
          <Circle className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
        )}
      </button>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium ${effectiveCompleted ? "line-through" : ""}`}>
          {reminder.work_type}
        </p>
        {bonsaiName && (
          <p className="text-xs text-muted-foreground mt-0.5">{bonsaiName}</p>
        )}
        {reminder.notes && (
          <p className="text-xs text-muted-foreground mt-1">{reminder.notes}</p>
        )}
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        {isOverdue && <AlertTriangle className="h-3.5 w-3.5 text-destructive" />}
        {isDueToday && <Clock className="h-3.5 w-3.5 text-accent" />}
        <span className={`text-xs font-medium ${
          isOverdue ? "text-destructive" : isDueToday ? "text-accent" : "text-muted-foreground"
        }`}>
          {format(new Date(reminder.due_date), "d MMM", { locale: it })}
        </span>
      </div>
    </div>
  );
}