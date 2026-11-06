import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../test/renderWithProviders.jsx';
import PostCard from './PostCard.jsx';
import { mockPosts } from '../data/mockPosts.js';

const imagePost = mockPosts[0]; // has an image
const textPost = mockPosts[1]; // text only, body has **bold** markdown

describe('PostCard', () => {
  it('shows the title as a link to the post page', () => {
    renderWithProviders(<PostCard postView={imagePost} />);
    const link = screen.getByRole('link', { name: imagePost.post.name });
    expect(link).toHaveAttribute('href', `/post/${imagePost.post.id}`);
  });

  it('shows the community and a shortened score', () => {
    renderWithProviders(<PostCard postView={imagePost} />);
    expect(screen.getByText('c/pics')).toBeInTheDocument();
    expect(screen.getAllByText(/1\.2k/).length).toBeGreaterThan(0);
  });

  it('shows a plain text preview in the feed', () => {
    renderWithProviders(<PostCard postView={textPost} />);
    expect(screen.getByText(/Hot-swap is a plus/)).toBeInTheDocument();
    expect(screen.queryByText(/\*\*/)).not.toBeInTheDocument();
  });

  it('renders markdown and drops the link on the full post', () => {
    renderWithProviders(<PostCard postView={textPost} full />);
    expect(screen.getByText('Hot-swap').tagName).toBe('STRONG');
    expect(screen.queryByRole('link', { name: textPost.post.name })).not.toBeInTheDocument();
  });
});
