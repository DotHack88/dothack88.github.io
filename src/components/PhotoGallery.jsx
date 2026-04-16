import { format } from "date-fns";
import { it } from "date-fns/locale";
import { X, Camera } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PhotoGallery({ photos }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  if (!photos?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
        <Camera className="h-10 w-10 mb-3 opacity-40" />
        <p className="text-sm">Nessuna foto ancora</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {photos.map((photo, i) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04 }}
            className="group relative aspect-square rounded-xl overflow-hidden bg-muted cursor-pointer"
            onClick={() => setSelectedPhoto(photo)}
          >
            <img
              src={photo.photo_url}
              alt={photo.caption || "Bonsai"}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2.5 pt-8">
              <p className="text-white text-xs font-medium">
                {format(new Date(photo.date), "d MMM yyyy", { locale: it })}
              </p>
              {photo.caption && (
                <p className="text-white/80 text-[10px] mt-0.5 line-clamp-1">{photo.caption}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              className="absolute top-4 right-4 text-white/80 hover:text-white"
              onClick={() => setSelectedPhoto(null)}
            >
              <X className="h-6 w-6" />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedPhoto.photo_url}
                alt={selectedPhoto.caption || "Bonsai"}
                className="w-full rounded-xl"
              />
              <div className="mt-3 text-center">
                <p className="text-white text-sm">
                  {format(new Date(selectedPhoto.date), "d MMMM yyyy", { locale: it })}
                </p>
                {selectedPhoto.caption && (
                  <p className="text-white/70 text-sm mt-1">{selectedPhoto.caption}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}