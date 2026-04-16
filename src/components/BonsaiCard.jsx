import { Link } from "react-router-dom";
import { TreePine, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function BonsaiCard({ bonsai, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Link
        to={`/bonsai/${bonsai.id}`}
        className="group block bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
      >
        <div className="aspect-[4/3] bg-muted relative overflow-hidden">
          {bonsai.photo_url ? (
            <img
              src={bonsai.photo_url}
              alt={bonsai.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <TreePine className="h-12 w-12 text-muted-foreground/30" />
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading text-lg font-semibold">{bonsai.name}</h3>
              <p className="text-sm text-muted-foreground mt-0.5">{bonsai.species}</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
          </div>
          {bonsai.style && (
            <span className="inline-block mt-2.5 px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-medium">
              {bonsai.style}
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  );
}