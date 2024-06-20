import { create } from "zustand";

export interface UserStore {
  user: any | null;
  setUser: (user: any) => void;
  removeUser: () => void;
}

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const useUserStore = create<UserStore>()((set) => ({
  user: getUserFromLocalStorage(),
  setUser: (user) => set({ user }),
  removeUser: () => set({ user: null }),
}));
