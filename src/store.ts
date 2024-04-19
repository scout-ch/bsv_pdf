import create from "zustand";
import { persist } from "zustand/middleware";
import { Course } from "./models/course";
import { ImportTupel, transform } from "./models/import_data";

export type AppState = {
  courses: Course[];
  cantons: string[];
  amountPerParticipant: number;
  fixcostsPerParticipant: number;
  year: number;
  footer: string;
  signature: string;
  importData: (value: ImportTupel[]) => void;
  setYear: (value: number) => void;
  setAmountPerParticipant: (value: number) => void;
  setFixcostsPerParticipant: (value: number) => void;
  setFooter: (value: string) => void;
  setSignature: (value: Blob) => void;
};

export const defaultState = {
  cantons: [],
  courses: [],
  advisors: {},
  signature: "",
  fixcostsPerParticipant: 50.0,
  amountPerParticipant: 25.0,
  year: new Date().getFullYear(),
  footer: `Celia Roduner / Aurea
Assistenz Ausbildung und Betreuung
Direktwahl: +41 31 328 05 59
E-Mail: celia.roduner@pbs.ch`,
};

export const useStore = create<AppState>(
  persist(
    (set, get) => ({
      ...defaultState,
      importData: (value: ImportTupel[]) => set((state) => ({ ...state, ...transform(value) })),
      setYear: (value: number) => set((state) => ({ ...state, year: value })),
      setAmountPerParticipant: (value: number) => set((state) => ({ ...state, amountPerParticipant: value })),
      setFixcostsPerParticipant: (value: number) => set((state) => ({ ...state, fixcostsPerParticipant: value })),
      setFooter: (value: string) => set((state) => ({ ...state, footer: value })),
      setSignature: async (file: Blob) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64 = event?.target?.result?.toString() || "";
          set((state) => ({ ...state, signature: base64 }));
        };
        reader.readAsDataURL(file);
      },
    }),
    {
      name: "bsv-pdf-storage",
      getStorage: () => sessionStorage,
    }
  )
);
