const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ArrowLeft, Plus, Loader2, Trash2, TreePine, Pencil, Camera, CalendarDays, Bell, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const CATEGORIES = [
  "Latifoglie (Decidui)",
  "Conifere",
  "Tropicali / da Interno",
  "Bonsai da Fiore / Frutto",
];

const STYLES = [
  "Stile eretto formale (Chokkan)",
  "Stile eretto informale (Moyogi)",
  "Stile inclinato (Shakan)",
  "Stile a semi-cascata (Han-Kengai)",
  "Stile a cascata (Kengai)",
  "Stile a spirale (Bankan)",
  "Stile a bosco (Yose-Ue)",
  "Stile a zattera (Ikadabuki)",
  "Stile a scopa rovesciata (Hokidachi)",
  "Stile su roccia (Sekijoju / Ishitsuki)",
  "Stile spazzato dal vento (Fukinagashi)",
  "Stile a doppio tronco (Sokan)",
  "Stile literato (Bunjingi)",
  "Stile a radice esposta (Negari)",
];

const SIZES = [
  "Mame / Shito (Miniatura) — < 7-10 cm",
  "Shohin (Piccolo) — 10-25 cm",
  "Kifu (Medio-piccolo) — 20-40 cm",
  "Chuhin / Chu (Medio) — 35-70 cm",
  "Omono / Dai (Grande) — 70-120 cm",
  "Imperial / Bonju (Molto Grande) — > 120 cm",
];
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { motion } from "framer-motion";
import WorkLogForm from "../components/WorkLogForm";
import AddReminderForm from "../components/AddReminderForm";
import AddPhotoForm from "../components/AddPhotoForm";
import WorkLogTimeline from "../components/WorkLogTimeline";
import PhotoGallery from "../components/PhotoGallery";
import ReminderItem from "../components/ReminderItem";

export default function BonsaiDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bonsai, setBonsai] = useState(null);
  const [workLogs, setWorkLogs] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showWorkLogForm, setShowWorkLogForm] = useState(false);
  const [showReminderForm, setShowReminderForm] = useState(false);
  const [showPhotoForm, setShowPhotoForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [editSaving, setEditSaving] = useState(false);

  const loadAll = async () => {
    const [b, w, r, p] = await Promise.all([
      db.entities.Bonsai.filter({ id }),
      db.entities.WorkLog.filter({ bonsai_id: id }, "-date"),
      db.entities.Reminder.filter({ bonsai_id: id }, "due_date"),
      db.entities.BonsaiPhoto.filter({ bonsai_id: id }, "-date"),
    ]);
    setBonsai(b[0] || null);
    setWorkLogs(w);
    setReminders(r);
    setPhotos(p);
    setLoading(false);
  };

  useEffect(() => { loadAll(); }, [id]);

  const openEdit = () => {
    setEditForm({
      name: bonsai.name || "",
      species: bonsai.species || "",
      category: bonsai.category || "",
      style: bonsai.style || "",
      size: bonsai.size || "",
      acquisition_date: bonsai.acquisition_date || "",
      notes: bonsai.notes || "",
    });
    setShowEditForm(true);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setEditSaving(true);
    await db.entities.Bonsai.update(id, editForm);
    setEditSaving(false);
    setShowEditForm(false);
    loadAll();
  };

  const handleDelete = async () => {
    await Promise.all([
      db.entities.Bonsai.delete(id),
      ...workLogs.map((w) => db.entities.WorkLog.delete(w.id)),
      ...reminders.map((r) => db.entities.Reminder.delete(r.id)),
      ...photos.map((p) => db.entities.BonsaiPhoto.delete(p.id)),
    ]);
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!bonsai) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">Bonsai non trovato</p>
        <Button variant="ghost" onClick={() => navigate("/")} className="mt-4">Torna alla home</Button>
      </div>
    );
  }

  const pendingReminders = reminders.filter((r) => !r.completed);
  const completedReminders = reminders.filter((r) => r.completed);

  return (
    <div className="space-y-6 pb-20 sm:pb-8">
      {/* Back */}
      <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="gap-1.5 -ml-2">
        <ArrowLeft className="h-4 w-4" />
        Indietro
      </Button>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row gap-5"
      >
        <div className="w-full sm:w-48 aspect-[4/3] sm:aspect-square rounded-xl bg-muted overflow-hidden shrink-0">
          {bonsai.photo_url ? (
            <img src={bonsai.photo_url} alt={bonsai.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <TreePine className="h-12 w-12 text-muted-foreground/30" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="font-heading text-2xl font-bold">{bonsai.name}</h1>
              <p className="text-muted-foreground mt-0.5">{bonsai.species}</p>
            </div>
            <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={openEdit}>
              <Pencil className="h-4 w-4" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Elimina bonsai</AlertDialogTitle>
                  <AlertDialogDescription>
                    Sei sicuro di voler eliminare {bonsai.name}? Questa azione non può essere annullata.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annulla</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Elimina
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {bonsai.style && (
              <span className="px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-medium">
                {bonsai.style}
              </span>
            )}
            {bonsai.size && (
              <span className="px-2.5 py-1 rounded-md bg-muted text-muted-foreground text-xs">
                {bonsai.size}
              </span>
            )}
            {bonsai.acquisition_date && (
              <span className="px-2.5 py-1 rounded-md bg-muted text-muted-foreground text-xs">
                Acquisito il {format(new Date(bonsai.acquisition_date), "d MMMM yyyy", { locale: it })}
              </span>
            )}
          </div>
          {bonsai.notes && (
            <p className="text-sm text-muted-foreground mt-3">{bonsai.notes}</p>
          )}
        </div>
      </motion.div>

      {/* Tabs */}
      <Tabs defaultValue="work" className="w-full">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="work" className="gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Lavorazioni</span>
            <span className="sm:hidden">Lavori</span>
          </TabsTrigger>
          <TabsTrigger value="reminders" className="gap-1.5">
            <Bell className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Promemoria</span>
            <span className="sm:hidden">Prom.</span>
            {pendingReminders.length > 0 && (
              <span className="ml-1 h-4.5 min-w-[18px] px-1 rounded-full bg-accent text-accent-foreground text-[10px] font-bold flex items-center justify-center">
                {pendingReminders.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="photos" className="gap-1.5">
            <Camera className="h-3.5 w-3.5" />
            Foto
            {photos.length > 0 && (
              <span className="ml-1 text-[10px] text-muted-foreground">{photos.length}</span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="work" className="mt-4 space-y-4">
          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={() => setShowWorkLogForm(true)} className="gap-1.5">
              <Plus className="h-3.5 w-3.5" />
              Registra lavorazione
            </Button>
          </div>
          <WorkLogTimeline logs={workLogs} />
        </TabsContent>

        <TabsContent value="reminders" className="mt-4 space-y-4">
          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={() => setShowReminderForm(true)} className="gap-1.5">
              <Plus className="h-3.5 w-3.5" />
              Nuovo promemoria
            </Button>
          </div>
          {pendingReminders.length > 0 && (
            <div className="space-y-2">
              {pendingReminders.map((r) => (
                <ReminderItem key={r.id} reminder={r} onUpdate={loadAll} />
              ))}
            </div>
          )}
          {completedReminders.length > 0 && (
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Completati</p>
              <div className="space-y-2">
                {completedReminders.map((r) => (
                  <ReminderItem key={r.id} reminder={r} onUpdate={loadAll} />
                ))}
              </div>
            </div>
          )}
          {reminders.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Bell className="h-10 w-10 mx-auto mb-3 opacity-40" />
              <p className="text-sm">Nessun promemoria</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="photos" className="mt-4 space-y-4">
          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={() => setShowPhotoForm(true)} className="gap-1.5">
              <Plus className="h-3.5 w-3.5" />
              Aggiungi foto
            </Button>
          </div>
          <PhotoGallery photos={photos} />
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <Dialog open={showWorkLogForm} onOpenChange={setShowWorkLogForm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading">Registra lavorazione</DialogTitle>
          </DialogHeader>
          <WorkLogForm
            bonsaiId={id}
            onSuccess={() => { setShowWorkLogForm(false); loadAll(); }}
            onCancel={() => setShowWorkLogForm(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showReminderForm} onOpenChange={setShowReminderForm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading">Nuovo promemoria</DialogTitle>
          </DialogHeader>
          <AddReminderForm
            bonsaiId={id}
            onSuccess={() => { setShowReminderForm(false); loadAll(); }}
            onCancel={() => setShowReminderForm(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showPhotoForm} onOpenChange={setShowPhotoForm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading">Aggiungi foto</DialogTitle>
          </DialogHeader>
          <AddPhotoForm
            bonsaiId={id}
            onSuccess={() => { setShowPhotoForm(false); loadAll(); }}
            onCancel={() => setShowPhotoForm(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showEditForm} onOpenChange={setShowEditForm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading">Modifica bonsai</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEdit} className="space-y-4">
            <div className="space-y-2">
              <Label>Nome *</Label>
              <Input value={editForm.name || ""} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Specie *</Label>
              <Input value={editForm.species || ""} onChange={(e) => setEditForm({ ...editForm, species: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Categoria</Label>
              <Select value={editForm.category || ""} onValueChange={(v) => setEditForm({ ...editForm, category: v })}>
                <SelectTrigger><SelectValue placeholder="Seleziona categoria..." /></SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Stile</Label>
              <Select value={editForm.style || ""} onValueChange={(v) => setEditForm({ ...editForm, style: v })}>
                <SelectTrigger><SelectValue placeholder="Seleziona stile..." /></SelectTrigger>
                <SelectContent>
                  {STYLES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Dimensione</Label>
              <Select value={editForm.size || ""} onValueChange={(v) => setEditForm({ ...editForm, size: v })}>
                <SelectTrigger><SelectValue placeholder="Seleziona dimensione..." /></SelectTrigger>
                <SelectContent>
                  {SIZES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Data acquisizione</Label>
              <Input type="date" value={editForm.acquisition_date || ""} onChange={(e) => setEditForm({ ...editForm, acquisition_date: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Note</Label>
              <Textarea value={editForm.notes || ""} onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })} rows={2} />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="ghost" onClick={() => setShowEditForm(false)}>Annulla</Button>
              <Button type="submit" disabled={!editForm.name || !editForm.species || editSaving}>
                {editSaving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                <Save className="h-4 w-4 mr-2" />
                Salva
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}