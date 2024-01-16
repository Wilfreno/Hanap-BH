"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Switch } from "./ui/switch";

export function ThemeToggler() {
  const [is_dark, setIsDark] = useState(true);
  const { setTheme, theme } = useTheme();
  useEffect(() => {
    setTheme(theme!);
  }, []);

  useEffect(() => {
    if (is_dark) setTheme("dark");
    else setTheme("light");
  }, [is_dark]);
  return (
    <div className="flex items-center justify-center py-3 space-x-5 md:py-2">
      <motion.label
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        key={theme}
        htmlFor="toggle"
        className="cursor-pointer"
      >
        {is_dark ? (
          <MoonIcon className="w-auto h-5" />
        ) : (
          <SunIcon className="w-auto h-5" />
        )}
      </motion.label>
      <Switch
        id="toggle"
        checked={!is_dark}
        onCheckedChange={() => setIsDark((prev) => !prev)}
      />
    </div>
  );
}
