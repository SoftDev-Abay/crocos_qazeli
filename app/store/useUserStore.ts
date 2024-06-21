import { create } from "zustand";
import { IUser } from "../constants/UserTypes";
import { persist } from "zustand/middleware";

export interface IUseUsers {
  currentUser: IUser | null;
  setCurrentUser: Function;
  getCurrentUser: Function;
}

export const UseUserStore = create<IUseUsers>()(
  persist(
    (set) => ({
      currentUser: null,
      setCurrentUser: (currentUser: IUser) => set(() => ({ currentUser })),
      getCurrentUser: () => {},
      // ProfileServices.getProfile()
      //   .then((res) =>
      //     set(() => ({
      //       currentUser: res.data.data,
      //     }))
      //   )
      //   .catch((err) => {
      //     console.log(err);
      //   });
      // },
    }),
    { name: "UserData" }
  )
);
