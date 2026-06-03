import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserPreferencesState {
  darkMode: boolean;
  selectedCategories: string[];
  searchQuery: string;
  itemsPerPage: number;
  language: string;
}

const initialState: UserPreferencesState = {
  darkMode: false,
  selectedCategories: ["general", "technology", "business"],
  searchQuery: "",
  itemsPerPage: 10,
  language: "en",
};

const userPreferencesSlice = createSlice({
  name: "userPreferences",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
    setSelectedCategories: (state, action: PayloadAction<string[]>) => {
      state.selectedCategories = action.payload;
    },
    addCategory: (state, action: PayloadAction<string>) => {
      if (!state.selectedCategories.includes(action.payload)) {
        state.selectedCategories.push(action.payload);
      }
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategories = state.selectedCategories.filter(
        (cat) => cat !== action.payload
      );
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
});

export const {
  toggleDarkMode,
  setDarkMode,
  setSelectedCategories,
  addCategory,
  removeCategory,
  setSearchQuery,
  setItemsPerPage,
  setLanguage,
} = userPreferencesSlice.actions;

export default userPreferencesSlice.reducer;
