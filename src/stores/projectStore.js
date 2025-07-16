import { create } from 'zustand';

// projects array length is 2, so Math.floor(2 / 2) = 1
const useProjectStore = create((set) => ({
  currentProject: 1, // Default to middle project like the original atom
  setCurrentProject: (project) => set({ currentProject: project }),
}));

export default useProjectStore;