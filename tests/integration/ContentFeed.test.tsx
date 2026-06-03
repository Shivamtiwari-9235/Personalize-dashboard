import React from 'react';
import { renderWithProviders, screen, waitFor } from '../test-utils';
import ContentFeed from '@/components/feed/ContentFeed';

// Mock the infinite scroll hook to trigger onLoadMore immediately
jest.mock('@/hooks/useInfiniteScroll', () => ({
  useInfiniteScroll: ({ onLoadMore }: any) => {
    // trigger onLoadMore on next tick to simulate intersection
    setTimeout(() => onLoadMore && onLoadMore(), 0);
    return { current: null };
  },
}));

describe('ContentFeed integration', () => {
  it('renders content from Redux and does not show spinner when loaded', () => {
    const preloadedState = {
      userPreferences: { darkMode: false, selectedCategories: ['general'], searchQuery: '', itemsPerPage: 10, language: 'en' },
      content: {
        newsArticles: [{ id: 'n1', title: 'News 1', description: 'd', type: 'news' }],
        recommendations: [{ id: 'r1', title: 'Rec 1', description: 'd', type: 'recommendation' }],
        socialPosts: [{ id: 's1', title: 'Social 1', description: 'd', type: 'social' }],
        trending: [],
        loading: false,
        error: null,
        currentPage: 1,
      },
      favorites: { items: [], loading: false, error: null },
    };

    renderWithProviders(<ContentFeed />, { preloadedState });

    expect(screen.getByText(/Your personalized feed/i)).toBeInTheDocument();
    // card titles should be present
    expect(screen.getByText('News 1')).toBeInTheDocument();
    expect(screen.getByText('Rec 1')).toBeInTheDocument();
    expect(screen.getByText('Social 1')).toBeInTheDocument();
  });

  it('shows spinner when loading initial content', () => {
    const preloadedState = {
      userPreferences: { darkMode: false, selectedCategories: ['general'], searchQuery: '', itemsPerPage: 10, language: 'en' },
      content: { newsArticles: [], recommendations: [], socialPosts: [], trending: [], loading: true, error: null, currentPage: 1 },
      favorites: { items: [], loading: false, error: null },
    };

    const { container } = renderWithProviders(<ContentFeed />, { preloadedState });
    // LoadingSpinner has element with class animate-spin
    expect(container.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('dispatches load-more via infinite scroll hook', async () => {
    const preloadedState = {
      userPreferences: { darkMode: false, selectedCategories: ['general'], searchQuery: '', itemsPerPage: 10, language: 'en' },
      content: { newsArticles: [], recommendations: [], socialPosts: [], trending: [], loading: false, error: null, currentPage: 1 },
      favorites: { items: [], loading: false, error: null },
    };

    const store = (await import('../test-utils')).createTestStore(preloadedState);
    const spy = jest.spyOn(store, 'dispatch');

    renderWithProviders(<ContentFeed />, { store });

    await waitFor(() => {
      expect(spy).toHaveBeenCalled();
    });
  });
});
