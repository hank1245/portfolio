import { create } from "zustand";

const useProjectStore = create((set) => ({
  currentProject: 1,
  setCurrentProject: (project) => set({ currentProject: project }),
}));

export default useProjectStore;
