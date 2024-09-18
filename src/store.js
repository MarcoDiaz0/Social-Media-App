import { create } from "zustand";

export const useStore = create((set) => ({
  postsData: [],
  setPostsData: (allposts) => set((lastValue) => ({postsData:[...lastValue.items,allposts]})),
}));
