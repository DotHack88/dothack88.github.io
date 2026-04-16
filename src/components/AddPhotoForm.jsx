const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Upload, ImagePlus } from "lucide-react";

export default function AddPhotoForm({ bonsaiId, onSuccess, onCancel }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [caption, setCaption] = useState("");
  const [saving, setSaving] = useState(false);

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !date) return;
    setSaving(true);
    // Optimistic: pass preview URL immediately so gallery updates at once
    const optimisticPhoto = {
      id: `optimistic-${Date.now()}`,
      bonsai_id: bonsaiId,
      photo_url: preview,
      date,
      caption,
    };
    onSuccess?.(optimisticPhoto);
    db.integrations.Core.UploadFile({ file }).then(({ file_url }) =>
      db.entities.BonsaiPhoto.create({
        bonsai_id: bonsaiId,
        photo_url: file_url,
        date,
        caption,
      })
    ).finally(() => setSaving(false));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Foto</Label>
        {preview ? (
          <div className="relative rounded-xl overflow-hidden aspect-video bg-muted">
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => { setFile(null); setPreview(null); }}
              className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-full px-2.5 py-1 text-xs font-medium hover:bg-background"
            >
              Cambia
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center gap-2 p-8 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors">
            <ImagePlus className="h-8 w-8 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Clicca per caricare una foto</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </label>
        )}
      </div>
      <div className="space-y-2">
        <Label>Data</Label>
        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label>Didascalia</Label>
        <Textarea value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Descrivi la foto..." rows={2} />
      </div>
      <div className="flex gap-2 justify-end pt-2">
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>Annulla</Button>
        )}
        <Button type="submit" disabled={!file || !date || saving}>
          {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          <Upload className="h-4 w-4 mr-2" />
          Carica foto
        </Button>
      </div>
    </form>
  );
}