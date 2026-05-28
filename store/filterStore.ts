import { create } from "zustand";

export type PropertyType = "apartment" | "house" | "villa" | "studio" | null;

interface FilterState {
    search: string;
    type: PropertyType;
    bedrooms: number | null;
    minPrice: number | null;
    maxPrice: number | null;

    setSearch: (value: string) => void;
    setType: (value: PropertyType) => void;
    setBedrooms: (value: number | null) => void;
    setMinPrice: (value: number | null) => void;
    setMaxPrice: (value: number | null) => void;
    resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
    search: "",
    type: null,
    bedrooms: null,
    minPrice: null,
    maxPrice: null,

    setSearch: (value) => set({ search: value }),
    setType: (value) => set({ type: value }),
    setBedrooms: (value) => set({ bedrooms: value }),
    setMinPrice: (value) => set({ minPrice: value }),
    setMaxPrice: (value) => set({ maxPrice: value }),
    resetFilters: () =>
        set({
            search: "",
            type: null,
            bedrooms: null,
            minPrice: null,
            maxPrice: null,
        }),
}));


/*

In this file, we define a Zustand store for managing the state of property filters in our application.

1. We define a TypeScript type `PropertyType` that lists the possible types of properties, including `null` for no selection.
2. We define a TypeScript interface `FilterState` that describes the shape of our filter state, which includes the current search query, selected property type, number of bedrooms, minimum price, and maximum price. It also includes functions to update each of these pieces of state and a function to reset all filters to their default values.
3. We use the `create` function from Zustand to create the store. The initial state is set with default values (empty search, no type selected, etc.), and the functions are defined to update the state when called.


*/