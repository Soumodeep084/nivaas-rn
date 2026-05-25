import { create } from "zustand";

interface UserStore {
    isAdmin: boolean;
    setIsAdmin: (value: boolean) => void;
}

export const useUserStore = create<UserStore>((set) => ({
    isAdmin: false,
    setIsAdmin: (value) => set({ isAdmin: value }),
}));



/*

In this file, we define a Zustand store for managing user-related state, specifically whether the user has admin privileges.

1. We define a TypeScript interface `UserStore` that describes the shape of our store, which includes an `isAdmin` boolean and a `setIsAdmin` function to update that state.
2. We use the `create` function from Zustand to create the store. The initial state is set with `isAdmin` as `false`, and the `setIsAdmin` function updates the state when called.


*/