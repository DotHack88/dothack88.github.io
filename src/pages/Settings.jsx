const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState } from "react";

import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Loader2, Trash2, LogOut, User, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const [deleting, setDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    setDeleting(true);
    // Delete all user's bonsai-related data
    const [bonsais, logs, reminders, photos] = await Promise.all([
      db.entities.Bonsai.list(),
      db.entities.WorkLog.list(),
      db.entities.Reminder.list(),
      db.entities.BonsaiPhoto.list(),
    ]);
    await Promise.all([
      ...bonsais.map((b) => db.entities.Bonsai.delete(b.id)),
      ...logs.map((l) => db.entities.WorkLog.delete(l.id)),
      ...reminders.map((r) => db.entities.Reminder.delete(r.id)),
      ...photos.map((p) => db.entities.BonsaiPhoto.delete(p.id)),
    ]);
    logout(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-20 sm:pb-8"
    >
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight">Impostazioni</h1>
        <p className="text-muted-foreground mt-1">Gestisci il tuo account</p>
      </div>

      {/* Profile info */}
      <div className="rounded-xl border border-border bg-card p-5 space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-sm">{user?.full_name || "Utente"}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="rounded-xl border border-border bg-card p-5 space-y-3">
        <h2 className="font-heading text-base font-semibold">Account</h2>

        <Button
          variant="outline"
          className="w-full justify-start gap-2 select-none"
          onClick={() => db.auth.redirectToLogin(window.location.href)}
        >
          <RefreshCw className="h-4 w-4" />
          Cambia account
        </Button>

        <Button
          variant="outline"
          className="w-full justify-start gap-2 select-none"
          onClick={() => logout(true)}
        >
          <LogOut className="h-4 w-4" />
          Esci dall'account
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start gap-2 text-destructive hover:text-destructive border-destructive/30 hover:bg-destructive/5 select-none"
            >
              <Trash2 className="h-4 w-4" />
              Elimina account e dati
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Sei sicuro?</AlertDialogTitle>
              <AlertDialogDescription>
                Questa azione eliminerà definitivamente tutti i tuoi bonsai, diari di lavoro, promemoria e foto. L'operazione non può essere annullata.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annulla</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteAccount}
                disabled={deleting}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {deleting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Elimina tutto
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </motion.div>
  );
}