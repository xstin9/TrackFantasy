import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Competition } from '../types';

interface AppState {
  selectedCompetition: Competition | null;
  setSelectedCompetition: (c: Competition | null) => void;
  draftAthleteIds: string[];
  toggleDraftAthlete: (id: string, price: number, budget: number, squadSize: number) => void;
  clearDraft: () => void;
  managerName: string;
  setManagerName: (name: string) => void;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [selectedCompetition, setSelectedCompetition] = useState<Competition | null>(null);
  const [draftAthleteIds, setDraftAthleteIds] = useState<string[]>([]);
  const [managerName, setManagerName] = useState('');

  function toggleDraftAthlete(id: string, price: number, budget: number, squadSize: number) {
    setDraftAthleteIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= squadSize) return prev; // squad full
      // Would exceed budget? use current prev prices via closure not available here,
      // so callers should also pass current spend check upstream (Draft.tsx enforces it).
      void price;
      void budget;
      return [...prev, id];
    });
  }

  function clearDraft() {
    setDraftAthleteIds([]);
  }

  return (
    <AppContext.Provider
      value={{
        selectedCompetition,
        setSelectedCompetition,
        draftAthleteIds,
        toggleDraftAthlete,
        clearDraft,
        managerName,
        setManagerName,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
