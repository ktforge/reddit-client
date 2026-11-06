import { describe, it, expect } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../test/renderWithProviders.jsx';
import SearchBar from './SearchBar.jsx';

describe('SearchBar', () => {
  it('saves the term to redux once typing stops', async () => {
    const { store } = renderWithProviders(<SearchBar />);

    await userEvent.type(screen.getByRole('searchbox', { name: 'Search posts' }), 'keyboard');

    // nothing yet, the debounce is still waiting
    expect(store.getState().posts.searchTerm).toBe('');
    await waitFor(() => expect(store.getState().posts.searchTerm).toBe('keyboard'));
  });

  it('searches right away on enter', async () => {
    const { store } = renderWithProviders(<SearchBar />);

    await userEvent.type(screen.getByRole('searchbox'), 'linux{Enter}');

    expect(store.getState().posts.searchTerm).toBe('linux');
  });

  it('skips one letter searches', async () => {
    const { store } = renderWithProviders(<SearchBar />);

    await userEvent.type(screen.getByRole('searchbox'), 'a');
    await new Promise((r) => setTimeout(r, 700)); // longer than the debounce

    expect(store.getState().posts.searchTerm).toBe('');
  });
});
