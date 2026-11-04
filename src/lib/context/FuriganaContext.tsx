"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type FuriganaMode = "learning" | "exam";

interface FuriganaContextType {
  mode: FuriganaMode;
  setMode: (mode: FuriganaMode) => void;
  toggleMode: () => void;
  isExamMode: boolean;
}

const FuriganaContext = createContext<FuriganaContextType | undefined>(undefined);

export function FuriganaProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<FuriganaMode>("learning");

  useEffect(() => {
    const saved = localStorage.getItem("rakib_furigana_mode") as FuriganaMode | null;
    if (saved === "learning" || saved === "exam") {
      setModeState(saved);
    }
  }, []);

  const setMode = (newMode: FuriganaMode) => {
    setModeState(newMode);
    localStorage.setItem("rakib_furigana_mode", newMode);
  };

  const toggleMode = () => {
    setMode(mode === "learning" ? "exam" : "learning");
  };

  return (
    <FuriganaContext.Provider
      value={{
        mode,
        setMode,
        toggleMode,
        isExamMode: mode === "exam",
      }}
    >
      {children}
    </FuriganaContext.Provider>
  );
}

export function useFurigana() {
  const context = useContext(FuriganaContext);
  if (!context) {
    throw new Error("useFurigana must be used within a FuriganaProvider");
  }
  return context;
}
