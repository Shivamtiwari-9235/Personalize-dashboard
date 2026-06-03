import reducer, { toggleDarkMode, setSelectedCategories, addCategory, removeCategory } from '@/store/slices/userPreferencesSlice';

describe('userPreferencesSlice', () => {
  const initial = { darkMode: false, selectedCategories: ['general'], searchQuery: '', itemsPerPage: 10, language: 'en' } as any;

  it('toggles dark mode', () => {
    const next = reducer(initial, toggleDarkMode());
    expect(next.darkMode).toBe(true);
  });

  it('sets selected categories', () => {
    const next = reducer(initial, setSelectedCategories(['tech']));
    expect(next.selectedCategories).toEqual(['tech']);
  });

  it('adds and removes a category', () => {
    const added = reducer(initial, addCategory('sports'));
    expect(added.selectedCategories).toContain('sports');
    const removed = reducer(added, removeCategory('sports'));
    expect(removed.selectedCategories).not.toContain('sports');
  });
});
