import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import userPreferencesReducer from "./slices/userPreferencesSlice";
import contentReducer from "./slices/contentSlice";
import favoritesReducer from "./slices/favoritesSlice";

const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: string) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

const persistConfig = {
  key: "userPreferences",
  storage,
  whitelist: ["darkMode", "selectedCategories", "searchQuery"],
};

const persistedUserPreferencesReducer = persistReducer(
  persistConfig,
  userPreferencesReducer
);

export const store = configureStore({
  reducer: {
    userPreferences: persistedUserPreferencesReducer,
    content: contentReducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
