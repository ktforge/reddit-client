import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CommunityList from './CommunityList.jsx';

describe('CommunityList', () => {
  it('marks the active community', () => {
    render(<CommunityList active="gaming" onSelect={() => {}} />);
    expect(screen.getByRole('button', { name: 'c/gaming' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('button', { name: 'c/pics' })).not.toHaveAttribute('aria-current');
  });

  it('passes the community name up when clicked', async () => {
    const onSelect = vi.fn();
    render(<CommunityList active={null} onSelect={onSelect} />);

    await userEvent.click(screen.getByRole('button', { name: 'c/technology' }));
    await userEvent.click(screen.getByRole('button', { name: 'Home (Hot)' }));

    expect(onSelect).toHaveBeenNthCalledWith(1, 'technology');
    expect(onSelect).toHaveBeenNthCalledWith(2, null);
  });
});
