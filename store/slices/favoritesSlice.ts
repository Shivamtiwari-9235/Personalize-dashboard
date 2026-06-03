import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoriteItem {
  id: string;
  title: string;
  description?: string;
  image?: string;
  url?: string;
  category?: string;
  type?: string;
}

interface FavoritesState {
  items: FavoriteItem[];
  loading: boolean;
  error: string | null;
}

const initialState: FavoritesState = {
  items: [],
  loading: false,
  error: null,
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<FavoriteItem>) => {
      const exists = state.items.some((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setFavorites: (state, action: PayloadAction<FavoriteItem[]>) => {
      state.items = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearFavorites: (state) => {
      state.items = [];
    },
  },
});

export const {
  addFavorite,
  removeFavorite,
  setFavorites,
  setLoading,
  setError,
  clearFavorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
