import create from 'zustand'
import { persist } from "zustand/middleware"
import { Course } from './models/course'
import { AdvisorMap } from './models/advisor'
import { ImportTupel, transform } from './models/import_data'

export type AppState = {
  courses: Course[];
  cantons: string[];
  advisors: AdvisorMap;
  amountPerParticipant: number;
  year: number;
  importData: (value: ImportTupel[]) => void;
  setYear: (value: number) => void;
  setAmountPerParticipant: (value: number) => void;
}

export const defaultState = { cantons: [], courses: [], advisors: {}, amountPerParticipant: 25.0, year: (new Date()).getFullYear() }

export const useStore = create<AppState>(persist(
  (set) => ({
    ...defaultState,
    importData: (value: ImportTupel[]) => set((state) => ({ ...state, ...transform(value) })),
    setYear: (value: number) => set((state) => ({ ...state, year: value })),
    setAmountPerParticipant: (value: number) => set((state) => ({ ...state, amountPerParticipant: value }))
  }),
  {
    name: "bsv-pdf-storage",
    getStorage: () => sessionStorage,
  }
))
