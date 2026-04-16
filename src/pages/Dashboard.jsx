const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState, useEffect, useMemo } from "react";

import { Link } from "react-router-dom";
import { Plus, TreePine, Loader2, Bell, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import BonsaiCard from "../components/BonsaiCard";
import ReminderItem from "../components/ReminderItem";
import PullToRefresh from "../components/PullToRefresh";
import { isPast, isToday, addDays } from "date-fns";

const CATEGORIES = [
  "Latifoglie (Decidui)",
  "Conifere",
  "Tropicali / da Interno",
  "Bonsai da Fiore / Frutto",
];

const CATEGORY_EXAMPLES = {
  "Latifoglie (Decidui)": "es. Acero, Olmo cinese, Faggio, Melo",
  "Conifere": "es. Pino, Ginepro, Larice, Abete",
  "Tropicali / da Interno": "es. Ficus, Serissa, Podocarpus",
  "Bonsai da Fiore / Frutto": "es. Azalea, Melograno, Ciliegio",
};

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

export default function Dashboard() {
  const [bonsais, setBonsais] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", species: "", category: "", style: "", size: "", notes: "", photo_url: "" });
  const [photoFile, setPhotoFile] = useState(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const filteredBonsais = useMemo(() => {
    return bonsais.filter((b) => {
      const q = search.toLowerCase();
      const matchesSearch = !q || [b.name, b.species, b.category, b.acquisition_date].some((v) => v?.toLowerCase().includes(q));
      const matchesCategory = !categoryFilter || b.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [bonsais, search, categoryFilter]);

  const loadData = async () => {
    const [b, r] = await Promise.all([
      db.entities.Bonsai.list("-created_date"),
      db.entities.Reminder.filter({ completed: false }, "due_date", 10),
    ]);
    setBonsais(b);
    setReminders(r);
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const urgentReminders = reminders.filter(
    (r) => isPast(new Date(r.due_date)) || isToday(new Date(r.due_date)) || new Date(r.due_date) <= addDays(new Date(), 7)
  );

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.name || !form.species) return;
    setSaving(true);
    // Optimistic: add immediately with placeholder photo
    const optimistic = { id: `optimistic-${Date.now()}`, ...form, photo_url: "" };
    setBonsais((prev) => [optimistic, ...prev]);
    setShowAdd(false);
    setForm({ name: "", species: "", category: "", style: "", size: "", notes: "", photo_url: "" });
    setPhotoFile(null);
    let photoUrl = "";
    if (photoFile) {
      const { file_url } = await db.integrations.Core.UploadFile({ file: photoFile });
      photoUrl = file_url;
    }
    await db.entities.Bonsai.create({ ...optimistic, photo_url: photoUrl });
    setSaving(false);
    loadData();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <PullToRefresh onRefresh={loadData}>
    <div className="space-y-8 pb-20 sm:pb-8 overscroll-contain">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-end justify-between"
      >
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight">I miei Bonsai</h1>
          <p className="text-muted-foreground mt-1">
            {bonsais.length} {bonsais.length === 1 ? "pianta" : "piante"} nella tua collezione
          </p>
        </div>
        <Button onClick={() => setShowAdd(true)} size="sm" className="gap-1.5">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Aggiungi</span>
        </Button>
      </motion.div>

      {/* Urgent reminders */}
      {urgentReminders.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Bell className="h-4 w-4 text-accent" />
            <h2 className="font-heading text-lg font-semibold">Promemoria urgenti</h2>
          </div>
          <div className="space-y-2">
            {urgentReminders.slice(0, 3).map((r) => {
              const b = bonsais.find((b) => b.id === r.bonsai_id);
              return (
                <ReminderItem
                  key={r.id}
                  reminder={r}
                  bonsaiName={b?.name}
                  onUpdate={loadData}
                />
              );
            })}
            {urgentReminders.length > 3 && (
              <Link to="/promemoria" className="text-sm text-primary font-medium hover:underline">
                Vedi tutti i promemoria →
              </Link>
            )}
          </div>
        </motion.div>
      )}

      {/* Category tabs */}
      {bonsais.length > 0 && (
        <div className="space-y-3">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <button
              onClick={() => setCategoryFilter("")}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                categoryFilter === ""
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-secondary"
              }`}
            >
              Tutti ({bonsais.length})
            </button>
            {CATEGORIES.map((cat) => {
              const count = bonsais.filter((b) => b.category === cat).length;
              if (!count) return null;
              return (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(categoryFilter === cat ? "" : cat)}
                  className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    categoryFilter === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input
              className="flex h-9 w-full rounded-md border border-input bg-transparent pl-9 pr-8 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              placeholder="Cerca per nome, specie..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Bonsai grid */}
      {bonsais.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="h-20 w-20 rounded-2xl bg-muted flex items-center justify-center mb-4">
            <TreePine className="h-10 w-10 text-muted-foreground/40" />
          </div>
          <h2 className="font-heading text-xl font-semibold mb-1">Nessun bonsai ancora</h2>
          <p className="text-muted-foreground text-sm mb-4">Aggiungi il tuo primo bonsai per iniziare</p>
          <Button onClick={() => setShowAdd(true)} className="gap-1.5">
            <Plus className="h-4 w-4" />
            Aggiungi bonsai
          </Button>
        </div>
      ) : filteredBonsais.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <Search className="h-10 w-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">Nessun risultato trovato</p>
        </div>
      ) : (
        <div className="space-y-8">
          {CATEGORIES.map((cat) => {
            const items = filteredBonsais.filter((b) => b.category === cat);
            if (!items.length) return null;
            return (
              <div key={cat}>
                <div className="flex items-center gap-2 mb-3">
                  <h2 className="font-heading text-lg font-semibold">{cat}</h2>
                  <span className="text-xs text-muted-foreground">({items.length})</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((b, i) => <BonsaiCard key={b.id} bonsai={b} index={i} />)}
                </div>
              </div>
            );
          })}
          {/* Uncategorized */}
          {(() => {
            const items = filteredBonsais.filter((b) => !b.category);
            if (!items.length) return null;
            return (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <h2 className="font-heading text-lg font-semibold text-muted-foreground">Senza categoria</h2>
                  <span className="text-xs text-muted-foreground">({items.length})</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((b, i) => <BonsaiCard key={b.id} bonsai={b} index={i} />)}
                </div>
              </div>
            );
          })()}
        </div>
      )}

    </div>
    {/* Add dialog */}
    <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading">Nuovo Bonsai</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="space-y-2">
              <Label>Nome *</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Es. Pino bianco" />
            </div>
            <div className="space-y-2">
              <Label>Specie *</Label>
              <Input value={form.species} onChange={(e) => setForm({ ...form, species: e.target.value })} placeholder="Es. Pinus parviflora" />
            </div>
            <div className="space-y-2">
              <Label>Categoria</Label>
              <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                <SelectTrigger><SelectValue placeholder="Seleziona categoria..." /></SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      <span>{c}</span>
                      <span className="text-muted-foreground text-xs ml-1">{CATEGORY_EXAMPLES[c]}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Stile</Label>
              <Select value={form.style} onValueChange={(v) => setForm({ ...form, style: v })}>
                <SelectTrigger><SelectValue placeholder="Seleziona stile..." /></SelectTrigger>
                <SelectContent>
                  {STYLES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Dimensione</Label>
              <Select value={form.size} onValueChange={(v) => setForm({ ...form, size: v })}>
                <SelectTrigger><SelectValue placeholder="Seleziona dimensione..." /></SelectTrigger>
                <SelectContent>
                  {SIZES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Foto</Label>
              <Input type="file" accept="image/*" onChange={(e) => setPhotoFile(e.target.files?.[0] || null)} />
            </div>
            <div className="space-y-2">
              <Label>Note</Label>
              <Textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Note sulla pianta..." rows={2} />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="ghost" onClick={() => setShowAdd(false)}>Annulla</Button>
              <Button type="submit" disabled={!form.name || !form.species || saving}>
                {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Aggiungi
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </PullToRefresh>
  );
}