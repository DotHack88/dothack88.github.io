import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Loader2, ArrowDown } from "lucide-react";

const THRESHOLD = 72;

export default function PullToRefresh({ onRefresh, children }) {
  const [refreshing, setRefreshing] = useState(false);
  const [pulled, setPulled] = useState(false);
  const startY = useRef(null);
  const y = useMotionValue(0);
  const opacity = useTransform(y, [0, THRESHOLD], [0, 1]);
  const rotate = useTransform(y, [0, THRESHOLD], [0, 180]);
  const containerRef = useRef(null);

  const handleTouchStart = (e) => {
    if (containerRef.current?.scrollTop > 0) return;
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    if (startY.current === null || refreshing) return;
    const delta = e.touches[0].clientY - startY.current;
    if (delta < 0) return;
    const clamped = Math.min(delta * 0.5, THRESHOLD + 20);
    y.set(clamped);
    setPulled(clamped >= THRESHOLD);
  };

  const handleTouchEnd = async () => {
    if (startY.current === null) return;
    startY.current = null;
    if (pulled) {
      setRefreshing(true);
      y.set(THRESHOLD);
      await onRefresh?.();
      setRefreshing(false);
    }
    y.set(0);
    setPulled(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative overflow-y-auto overscroll-contain"
      style={{ WebkitOverflowScrolling: "touch" }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull indicator */}
      <motion.div
        style={{ height: y, opacity }}
        className="flex items-center justify-center overflow-hidden"
      >
        {refreshing ? (
          <Loader2 className="h-5 w-5 text-primary animate-spin" />
        ) : (
          <motion.div style={{ rotate }}>
            <ArrowDown className="h-5 w-5 text-muted-foreground" />
          </motion.div>
        )}
      </motion.div>

      <motion.div style={{ y: 0 }}>
        {children}
      </motion.div>
    </div>
  );
}