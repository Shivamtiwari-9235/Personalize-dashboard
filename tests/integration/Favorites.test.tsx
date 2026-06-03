import React from 'react';
import { renderWithProviders, screen, fireEvent } from '../test-utils';
import ContentFeed from '@/components/feed/ContentFeed';
import FavoritesPage from '@/app/dashboard/favorites/page';

describe('Favorites flow', () => {
  it('clicking Save adds item to favorites and Favorites page shows it', async () => {
    const preloadedState = {
      userPreferences: { darkMode: false, selectedCategories: ['general'], searchQuery: '', itemsPerPage: 10, language: 'en' },
      content: {
        newsArticles: [{ id: 'n1', title: 'News 1', description: 'd', type: 'news' }],
        recommendations: [],
        socialPosts: [],
        trending: [],
        loading: false,
        error: null,
        currentPage: 1,
      },
      favorites: { items: [], loading: false, error: null },
    };

    const { store } = renderWithProviders(<ContentFeed />, { preloadedState });
    const saveBtn = await screen.findByRole('button', { name: /save/i });
    fireEvent.click(saveBtn);

    const favs = store.getState().favorites.items;
    expect(favs).toHaveLength(1);

    // Render favorites page and ensure the item appears
    renderWithProviders(<FavoritesPage />, { preloadedState: { ...preloadedState, favorites: { items: favs, loading: false, error: null } } });
    expect(screen.getByText('News 1')).toBeInTheDocument();
  });
});
