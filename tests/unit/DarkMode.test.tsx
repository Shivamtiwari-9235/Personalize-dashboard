import React from 'react';
import { renderWithProviders, screen, fireEvent } from '../test-utils';
import DarkModeToggle from '@/components/common/DarkModeToggle';
import ThemeManager from '@/components/common/ThemeManager';
import { toggleDarkMode } from '@/store/slices/userPreferencesSlice';

describe('Dark mode behavior', () => {
  it('toggles redux state and document class', () => {
    const { store } = renderWithProviders(
      <>
        <ThemeManager />
        <DarkModeToggle />
      </>
    );

    const btn = screen.getByRole('button', { name: /toggle dark mode/i });
    // initial state false
    expect(store.getState().userPreferences.darkMode).toBe(false);
    fireEvent.click(btn);
    expect(store.getState().userPreferences.darkMode).toBe(true);
    // ThemeManager effect should add class
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    // toggle back
    fireEvent.click(btn);
    expect(store.getState().userPreferences.darkMode).toBe(false);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
