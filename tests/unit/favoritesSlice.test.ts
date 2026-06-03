import favoritesReducer, { addFavorite, removeFavorite, clearFavorites } from '@/store/slices/favoritesSlice';

describe('favoritesSlice', () => {
  const initialState = { items: [], loading: false, error: null };

  it('adds a favorite', () => {
    const next = favoritesReducer(initialState, addFavorite({ id: 'a1', title: 'Test' } as any));
    expect(next.items).toHaveLength(1);
    expect(next.items[0].id).toBe('a1');
  });

  it('removes a favorite', () => {
    const state = { ...initialState, items: [{ id: 'a1', title: 'Test' }] } as any;
    const next = favoritesReducer(state, removeFavorite('a1'));
    expect(next.items).toHaveLength(0);
  });

  it('clears favorites', () => {
    const state = { ...initialState, items: [{ id: 'a1', title: 'x' }] } as any;
    const next = favoritesReducer(state, clearFavorites());
    expect(next.items).toHaveLength(0);
  });
});
