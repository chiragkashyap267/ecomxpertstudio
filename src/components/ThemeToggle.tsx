"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-9 w-9 rounded-full bg-slate-900/5" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-slate-900/10 bg-white/50 text-slate-900 transition-colors hover:bg-slate-900/5 dark:border-white/10 dark:bg-slate-900/50 dark:text-white dark:hover:bg-white/10"
      aria-label="Toggle theme"
    >
      <Sun className="h-4 w-4 scale-100 transition-transform dark:scale-0" />
      <Moon className="absolute h-4 w-4 scale-0 transition-transform dark:scale-100" />
    </button>
  );
}
