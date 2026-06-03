import React from 'react';
import { renderWithProviders, screen, fireEvent } from '../test-utils';
import ContentFeed from '@/components/feed/ContentFeed';

describe('ContentFeed error and empty states', () => {
  it('renders error message when content.error is set', () => {
    const preloadedState = {
      userPreferences: { darkMode: false, selectedCategories: ['general'], searchQuery: '', itemsPerPage: 10, language: 'en' },
      content: { newsArticles: [], recommendations: [], socialPosts: [], trending: [], loading: false, error: 'Unable to fetch', currentPage: 1 },
      favorites: { items: [], loading: false, error: null },
    };

    renderWithProviders(<ContentFeed />, { preloadedState });
    expect(screen.getByText('Unable to fetch')).toBeInTheDocument();
  });

  it('shows no articles when search yields no results', () => {
    const preloadedState = {
      userPreferences: { darkMode: false, selectedCategories: ['general'], searchQuery: '', itemsPerPage: 10, language: 'en' },
      content: {
        newsArticles: [{ id: 'n1', title: 'News 1', type: 'news', description: 'd' }],
        recommendations: [],
        socialPosts: [],
        trending: [],
        loading: false,
        error: null,
        currentPage: 1,
      },
      favorites: { items: [], loading: false, error: null },
    };

    renderWithProviders(<ContentFeed />, { preloadedState });
    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: 'zzz-not-found' } });

    // there should be no article cards rendered after filtering
    const articles = screen.queryAllByRole('article');
    expect(articles).toHaveLength(0);
  });
});
