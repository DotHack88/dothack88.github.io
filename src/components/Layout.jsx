import { Outlet, Link, useLocation } from "react-router-dom";
import { TreePine, Home, CalendarDays, Bell, Settings } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const navItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/calendario", icon: CalendarDays, label: "Calendario" },
  { path: "/promemoria", icon: Bell, label: "Promemoria" },
  { path: "/impostazioni", icon: Settings, label: "Impostazioni" },
];

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: -20 },
};

const pageTransition = { duration: 0.2, ease: "easeInOut" };

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with safe area */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border safe-top">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
              <TreePine className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-heading text-xl font-semibold tracking-tight">Bonsai</span>
          </Link>
          <nav className="hidden sm:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all select-none ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Content with page transitions */}
      <main className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="in"
            exit="out"
            transition={pageTransition}
            className="max-w-5xl mx-auto px-4 py-6"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile bottom nav with safe area */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-t border-border safe-bottom">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                replace={isActive}
                className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg transition-all select-none ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}