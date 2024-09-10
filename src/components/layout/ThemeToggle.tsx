"use client";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const THEME_TITLES = [
    "light",
    "dark",
    // , "system"
  ];

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => {
        setTheme(THEME_TITLES.filter((item) => item !== theme)[0]);
      }}
      className="size-12 p-0 m-0 rounded-xl border-foreground/40"
    >
      <Sun className="size-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 stroke-foreground/70" />
      <Moon className="absolute size-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 stroke-foreground/70" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
