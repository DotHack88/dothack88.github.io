const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState, useEffect, useMemo } from "react";

import { Loader2, Bell, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { isPast, isToday } from "date-fns";
import ReminderItem from "../components/ReminderItem";
import PullToRefresh from "../components/PullToRefresh";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Reminders() {
  const [reminders, setReminders] = useState([]);
  const [bonsais, setBonsais] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    const [r, b] = await Promise.all([
      db.entities.Reminder.list("due_date", 500),
      db.entities.Bonsai.list(),
    ]);
    setReminders(r);
    setBonsais(b);
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const bonsaiMap = useMemo(() => {
    const m = {};
    bonsais.forEach((b) => (m[b.id] = b));
    return m;
  }, [bonsais]);

  const pending = reminders.filter((r) => !r.completed);
  const completed = reminders.filter((r) => r.completed);
  const overdue = pending.filter((r) => isPast(new Date(r.due_date)) && !isToday(new Date(r.due_date)));
  const upcoming = pending.filter((r) => !isPast(new Date(r.due_date)) || isToday(new Date(r.due_date)));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <PullToRefresh onRefresh={loadData}>
    <div className="space-y-6 pb-20 sm:pb-8 overscroll-contain">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading text-3xl font-bold tracking-tight">Promemoria</h1>
        <p className="text-muted-foreground mt-1">
          {pending.length} {pending.length === 1 ? "promemoria attivo" : "promemoria attivi"}
        </p>
      </motion.div>

      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending" className="gap-1.5">
            <Bell className="h-3.5 w-3.5" />
            Da fare ({pending.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Completati ({completed.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-4 space-y-5">
          {overdue.length > 0 && (
            <div>
              <p className="text-xs font-medium text-destructive uppercase tracking-wider mb-2">In ritardo</p>
              <div className="space-y-2">
                {overdue.map((r) => (
                  <ReminderItem key={r.id} reminder={r} bonsaiName={bonsaiMap[r.bonsai_id]?.name} onUpdate={loadData} />
                ))}
              </div>
            </div>
          )}
          {upcoming.length > 0 && (
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Prossimi</p>
              <div className="space-y-2">
                {upcoming.map((r) => (
                  <ReminderItem key={r.id} reminder={r} bonsaiName={bonsaiMap[r.bonsai_id]?.name} onUpdate={loadData} />
                ))}
              </div>
            </div>
          )}
          {pending.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <Bell className="h-10 w-10 mx-auto mb-3 opacity-40" />
              <p className="text-sm">Nessun promemoria attivo</p>
              <p className="text-xs mt-1">Vai nella scheda di un bonsai per aggiungerne uno</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="mt-4">
          {completed.length > 0 ? (
            <div className="space-y-2">
              {completed.map((r) => (
                <ReminderItem key={r.id} reminder={r} bonsaiName={bonsaiMap[r.bonsai_id]?.name} onUpdate={loadData} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              <CheckCircle2 className="h-10 w-10 mx-auto mb-3 opacity-40" />
              <p className="text-sm">Nessun promemoria completato</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
    </PullToRefresh>
  );
}