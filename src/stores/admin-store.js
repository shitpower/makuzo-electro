import { create } from "zustand";

export const useAdminStore = create((set) => ({
  activeLocale: "ru",
  activeSectionKey: "hero",
  isDirty: false,

  setActiveLocale: (activeLocale) => set({ activeLocale }),
  setActiveSectionKey: (activeSectionKey) => set({ activeSectionKey }),
  setIsDirty: (isDirty) => set({ isDirty }),
}));
