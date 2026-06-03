import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { PreloadedState } from 'redux';
import userPreferencesReducer from '@/store/slices/userPreferencesSlice';
import contentReducer from '@/store/slices/contentSlice';
import favoritesReducer from '@/store/slices/favoritesSlice';

export function createTestStore(preloadedState?: PreloadedState<any>) {
  return configureStore({
    reducer: {
      userPreferences: userPreferencesReducer,
      content: contentReducer,
      favorites: favoritesReducer,
    } as const,
    preloadedState,
  });
}

export function renderWithProviders(ui: React.ReactElement, { preloadedState, store = createTestStore(preloadedState) }: any = {}) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}

export * from '@testing-library/react';
