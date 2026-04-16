import { format } from "date-fns";
import { it } from "date-fns/locale";
import { Scissors, Leaf, ArrowUpDown, Wrench, TreePine, Redo, Circle } from "lucide-react";

const WORK_ICONS = {
  "Rinvaso": ArrowUpDown,
  "Applicazione filo": Wrench,
  "Concimatura": Leaf,
  "Potatura di formazione": Scissors,
  "Potatura di mantenimento": Scissors,
  "Rimozione filo": Redo,
  "Shari e Jin": Scissors,
  "Margotta": Leaf,
  "Trattamento antiparassitari/funghi": Circle,
  "Altro": Circle,
};

const WORK_COLORS = {
  "Rinvaso": "bg-amber-100 text-amber-700",
  "Applicazione filo": "bg-blue-100 text-blue-700",
  "Concimatura": "bg-green-100 text-green-700",
  "Potatura di formazione": "bg-rose-100 text-rose-700",
  "Potatura di mantenimento": "bg-pink-100 text-pink-700",
  "Rimozione filo": "bg-indigo-100 text-indigo-700",
  "Shari e Jin": "bg-orange-100 text-orange-700",
  "Margotta": "bg-teal-100 text-teal-700",
  "Trattamento antiparassitari/funghi": "bg-yellow-100 text-yellow-700",
  "Altro": "bg-gray-100 text-gray-700",
};

export default function WorkLogTimeline({ logs }) {
  if (!logs?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
        <TreePine className="h-10 w-10 mb-3 opacity-40" />
        <p className="text-sm">Nessuna lavorazione registrata</p>
      </div>
    );
  }

  const sorted = [...logs].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="space-y-3">
      {sorted.map((log) => {
        const Icon = WORK_ICONS[log.work_type] || Circle;
        const colorClass = WORK_COLORS[log.work_type] || "bg-gray-100 text-gray-700";
        return (
          <div key={log.id} className="flex items-start gap-3 p-3 rounded-xl bg-muted/50">
            <div className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${colorClass}`}>
              <Icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium">{log.work_type}</p>
                <span className="text-xs text-muted-foreground shrink-0">
                  {format(new Date(log.date), "d MMM yyyy", { locale: it })}
                </span>
              </div>
              {log.notes && (
                <p className="text-xs text-muted-foreground mt-1">{log.notes}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}