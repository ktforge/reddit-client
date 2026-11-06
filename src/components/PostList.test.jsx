import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../test/renderWithProviders.jsx';
import PostList from './PostList.jsx';
import { mockPosts } from '../data/mockPosts.js';

describe('PostList', () => {
  it('shows skeletons while loading', () => {
    renderWithProviders(<PostList posts={[]} status="loading" />);
    expect(screen.getByLabelText('Loading posts')).toHaveAttribute('aria-busy', 'true');
  });

  it('shows an error with a working retry button', async () => {
    const onRetry = vi.fn();
    renderWithProviders(<PostList posts={[]} status="failed" onRetry={onRetry} onHome={() => {}} />);

    expect(screen.getByRole('alert')).toHaveTextContent("Couldn't load posts");
    await userEvent.click(screen.getByRole('button', { name: 'Try again' }));
    expect(onRetry).toHaveBeenCalledOnce();
  });

  it('shows the empty message when nothing came back', () => {
    renderWithProviders(
      <PostList posts={[]} status="succeeded" emptyTitle="No posts in c/news yet" onHome={() => {}} />,
    );
    expect(screen.getByText('No posts in c/news yet')).toBeInTheDocument();
  });

  it('shows one card per post', () => {
    renderWithProviders(<PostList posts={mockPosts} status="succeeded" />);
    expect(screen.getAllByRole('article')).toHaveLength(mockPosts.length);
  });
});
