import { useCallback, useEffect, useState } from "react";

function useSystemThemeDefault() {
  const [pref, setPref] = useState("light");

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (!mq) return;
    const apply = () => setPref(mq.matches ? "dark" : "light");
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  return pref;
}

export function useLocalTheme() {
  const system = useSystemThemeDefault();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const syncTheme = () => {
      const saved = window.localStorage.getItem("px_theme");
      const next = saved || system;
      setTheme(next);
      document.documentElement.setAttribute("data-theme", next);
    };

    syncTheme();
    window.addEventListener("storage", syncTheme);
    window.addEventListener("px-theme-change", syncTheme);

    return () => {
      window.removeEventListener("storage", syncTheme);
      window.removeEventListener("px-theme-change", syncTheme);
    };
  }, [system]);

  const toggle = useCallback(() => {
    const current =
      window.localStorage.getItem("px_theme") ||
      (document.documentElement.getAttribute("data-theme") || system);
    const next = current === "dark" ? "light" : "dark";
    window.localStorage.setItem("px_theme", next);
    document.documentElement.setAttribute("data-theme", next);
    setTheme(next);
    window.dispatchEvent(new Event("px-theme-change"));
  }, [system]);

  return { theme, toggle };
}
