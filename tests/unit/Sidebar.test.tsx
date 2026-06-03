import React from 'react';
import { renderWithProviders, screen } from '../test-utils';
import Sidebar from '@/components/common/Sidebar';

describe('Sidebar navigation', () => {
  it('renders navigation links with correct hrefs', () => {
    renderWithProviders(<Sidebar />);

    const feedLink = screen.getByText('Feed').closest('a');
    expect(feedLink).toHaveAttribute('href', '/dashboard/feed');

    const trendingLink = screen.getByText('Trending').closest('a');
    expect(trendingLink).toHaveAttribute('href', '/dashboard/trending');

    const favoritesLink = screen.getByText('Favorites').closest('a');
    expect(favoritesLink).toHaveAttribute('href', '/dashboard/favorites');
  });
});
