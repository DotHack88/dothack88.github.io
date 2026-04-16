const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

const WORK_TYPES = [
  "Rinvaso",
  "Applicazione filo",
  "Concimatura",
  "Potatura di formazione",
  "Potatura di mantenimento",
  "Rimozione filo",
  "Shari e Jin",
  "Margotta",
  "Trattamento antiparassitari/funghi",
  "Altro",
];

export default function WorkLogForm({ bonsaiId, onSuccess, onCancel }) {
  const [workType, setWorkType] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!workType || !date) return;
    setSaving(true);
    await db.entities.WorkLog.create({
      bonsai_id: bonsaiId,
      work_type: workType,
      date,
      notes,
    });
    setSaving(false);
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Tipo di lavorazione</Label>
        <Select value={workType} onValueChange={setWorkType}>
          <SelectTrigger><SelectValue placeholder="Seleziona..." /></SelectTrigger>
          <SelectContent>
            {WORK_TYPES.map((t) => (
              <SelectItem key={t} value={t}>{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Data</Label>
        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label>Note</Label>
        <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Note opzionali..." rows={3} />
      </div>
      <div className="flex gap-2 justify-end pt-2">
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>Annulla</Button>
        )}
        <Button type="submit" disabled={!workType || !date || saving}>
          {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          Salva
        </Button>
      </div>
    </form>
  );
}