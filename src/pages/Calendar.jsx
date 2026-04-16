const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState, useEffect, useMemo } from "react";

import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, addMonths, subMonths, getDay } from "date-fns";
import { it } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const WORK_COLORS = {
  "Rinvaso": "bg-amber-500",
  "Applicazione filo": "bg-blue-500",
  "Concimatura": "bg-green-500",
  "Potatura di formazione": "bg-rose-500",
  "Potatura di mantenimento": "bg-pink-500",
  "Rimozione filo": "bg-indigo-500",
  "Shari e Jin": "bg-orange-500",
  "Margotta": "bg-teal-500",
  "Trattamento antiparassitari/funghi": "bg-yellow-600",
  "Altro": "bg-gray-500",
};

const DAYS = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [workLogs, setWorkLogs] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [bonsais, setBonsais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);

  const reload = async () => {
    const [w, r, b] = await Promise.all([
      db.entities.WorkLog.list("-date", 500),
      db.entities.Reminder.list("due_date", 500),
      db.entities.Bonsai.list(),
    ]);
    setWorkLogs(w);
    setReminders(r);
    setBonsais(b);
    setLoading(false);
  };

  const deleteLog = async (id) => {
    await db.entities.WorkLog.delete(id);
    reload();
  };

  const deleteReminder = async (id) => {
    await db.entities.Reminder.delete(id);
    reload();
  };

  useEffect(() => {
    reload();
    setLoading(false);
  }, []);

  const bonsaiMap = useMemo(() => {
    const m = {};
    bonsais.forEach((b) => (m[b.id] = b));
    return m;
  }, [bonsais]);

  const days = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  // Get the weekday of the first day (0=Mon in our display)
  const startDayOffset = useMemo(() => {
    const d = getDay(days[0]); // 0=Sun
    return d === 0 ? 6 : d - 1; // convert to Mon=0
  }, [days]);

  const getEventsForDay = (day) => {
    const logs = workLogs.filter((w) => isSameDay(new Date(w.date), day));
    const rems = reminders.filter((r) => isSameDay(new Date(r.due_date), day));
    return { logs, reminders: rems };
  };

  const selectedEvents = selectedDate ? getEventsForDay(selectedDate) : null;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20 sm:pb-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading text-3xl font-bold tracking-tight">Calendario</h1>
        <p className="text-muted-foreground mt-1">Tutte le lavorazioni e i promemoria</p>
      </motion.div>

      {/* Month nav */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="font-heading text-lg font-semibold capitalize">
          {format(currentMonth, "MMMM yyyy", { locale: it })}
        </h2>
        <Button variant="ghost" size="icon" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Calendar grid */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="grid grid-cols-7">
          {DAYS.map((d) => (
            <div key={d} className="p-2 text-center text-xs font-medium text-muted-foreground border-b border-border">
              {d}
            </div>
          ))}
          {Array.from({ length: startDayOffset }).map((_, i) => (
            <div key={`empty-${i}`} className="p-2 min-h-[70px] sm:min-h-[90px] border-b border-r border-border bg-muted/30" />
          ))}
          {days.map((day) => {
            const events = getEventsForDay(day);
            const hasEvents = events.logs.length > 0 || events.reminders.length > 0;
            const isToday = isSameDay(day, new Date());
            const isSelected = selectedDate && isSameDay(day, selectedDate);

            return (
              <button
                key={day.toISOString()}
                onClick={() => setSelectedDate(day)}
                className={`p-1.5 sm:p-2 min-h-[70px] sm:min-h-[90px] border-b border-r border-border text-left transition-colors hover:bg-muted/50 ${
                  isSelected ? "bg-primary/5 ring-1 ring-primary/20" : ""
                }`}
              >
                <span
                  className={`inline-flex items-center justify-center h-6 w-6 rounded-full text-xs font-medium ${
                    isToday ? "bg-primary text-primary-foreground" : ""
                  }`}
                >
                  {format(day, "d")}
                </span>
                {hasEvents && (
                  <div className="flex flex-wrap gap-0.5 mt-1">
                    {events.logs.slice(0, 3).map((log) => (
                      <div
                        key={log.id}
                        className={`h-1.5 w-1.5 rounded-full ${WORK_COLORS[log.work_type] || "bg-gray-500"}`}
                      />
                    ))}
                    {events.reminders.slice(0, 3).map((rem) => (
                      <div
                        key={rem.id}
                        className={`h-1.5 w-1.5 rounded-full ring-1 ring-current ${
                          rem.completed ? "bg-muted-foreground/30" : "bg-accent"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected day detail */}
      {selectedDate && selectedEvents && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl border border-border p-4 space-y-3"
        >
          <h3 className="font-heading font-semibold capitalize">
            {format(selectedDate, "EEEE d MMMM yyyy", { locale: it })}
          </h3>
          {selectedEvents.logs.length === 0 && selectedEvents.reminders.length === 0 && (
            <p className="text-sm text-muted-foreground">Nessun evento per questa data</p>
          )}
          {selectedEvents.logs.map((log) => (
            <div key={log.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/50">
              <div className={`h-2.5 w-2.5 rounded-full shrink-0 ${WORK_COLORS[log.work_type] || "bg-gray-500"}`} />
              <div className="flex-1">
                <p className="text-sm font-medium">{log.work_type}</p>
                <p className="text-xs text-muted-foreground">{bonsaiMap[log.bonsai_id]?.name || "Bonsai"}</p>
                {log.notes && <p className="text-xs text-muted-foreground mt-0.5">{log.notes}</p>}
              </div>
              <span className="text-[10px] font-medium px-2 py-0.5 bg-secondary rounded-md text-secondary-foreground">Fatto</span>
              <button onClick={() => deleteLog(log.id)} className="text-muted-foreground hover:text-destructive transition-colors ml-1">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          {selectedEvents.reminders.map((rem) => (
            <div key={rem.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/50">
              <div className={`h-2.5 w-2.5 rounded-full shrink-0 ${rem.completed ? "bg-muted-foreground/40" : "bg-accent"}`} />
              <div className="flex-1">
                <p className={`text-sm font-medium ${rem.completed ? "line-through opacity-60" : ""}`}>{rem.work_type}</p>
                <p className="text-xs text-muted-foreground">{bonsaiMap[rem.bonsai_id]?.name || "Bonsai"}</p>
                {rem.notes && <p className="text-xs text-muted-foreground mt-0.5">{rem.notes}</p>}
              </div>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${
                rem.completed ? "bg-muted text-muted-foreground" : "bg-accent/10 text-accent"
              }`}>{rem.completed ? "Completato" : "Da fare"}</span>
              <button onClick={() => deleteReminder(rem.id)} className="text-muted-foreground hover:text-destructive transition-colors ml-1">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </motion.div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap gap-3">
        {Object.entries(WORK_COLORS).map(([type, color]) => (
          <div key={type} className="flex items-center gap-1.5">
            <div className={`h-2 w-2 rounded-full ${color}`} />
            <span className="text-[10px] text-muted-foreground">{type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}