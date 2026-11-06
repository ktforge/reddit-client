import { test, expect } from '@playwright/test';
import { useFakeApi } from './fakeApi.js';

// picks a community from the sidebar on desktop or the drawer on phones
async function pickCommunity(page, isMobile, name) {
  if (isMobile) {
    await page.getByRole('button', { name: 'Open communities menu' }).click();
  }
  // only one of the two lists is visible at a time, so filter to the visible one
  await page.getByRole('button', { name, exact: true }).filter({ visible: true }).click();
}

test.describe('feed', () => {
  test('loads posts on the home page', async ({ page }) => {
    await useFakeApi(page);
    await page.goto('/');

    await expect(page.getByRole('article')).toHaveCount(3);
    await expect(page.getByText('Sunrise over the Blue Ridge Mountains')).toBeVisible();
  });

  test('filters by community', async ({ page, isMobile }) => {
    await useFakeApi(page);
    await page.goto('/');

    await pickCommunity(page, isMobile, 'c/gaming');

    await expect(page.getByRole('article')).toHaveCount(1);
    await expect(page.getByText('Finally finished my first full playthrough')).toBeVisible();
  });

  test('shows an empty message for a community with no posts', async ({ page, isMobile }) => {
    await useFakeApi(page);
    await page.goto('/');

    await pickCommunity(page, isMobile, 'c/news');

    await expect(page.getByText('No posts in c/news yet')).toBeVisible();
  });
});

test.describe('search', () => {
  test('finds matching posts and clears back to the feed', async ({ page }) => {
    await useFakeApi(page);
    await page.goto('/');

    await page.getByRole('searchbox', { name: 'Search posts' }).fill('keyboard');

    await expect(page.getByText('Results for')).toBeVisible();
    await expect(page.getByRole('article')).toHaveCount(1);

    await page.getByRole('button', { name: 'Clear search' }).click();
    await expect(page.getByRole('article')).toHaveCount(3);
  });

  test('shows a message when nothing matches', async ({ page }) => {
    await useFakeApi(page);
    await page.goto('/');

    await page.getByRole('searchbox', { name: 'Search posts' }).fill('zzzz');

    await expect(page.getByText('No posts match "zzzz"')).toBeVisible();
  });
});

test.describe('post page', () => {
  test('opens a post with its nested comments', async ({ page }) => {
    await useFakeApi(page);
    await page.goto('/');

    await page.getByRole('link', { name: 'Sunrise over the Blue Ridge Mountains' }).click();

    await expect(page).toHaveURL(/\/post\/1$/);
    await expect(page.getByText('Gorgeous shot. What camera did you use?')).toBeVisible();
    // markdown in the reply renders as bold text
    await expect(page.locator('.comment strong', { hasText: 'No edits.' })).toBeVisible();

    await page.getByRole('link', { name: '← Back to posts' }).click();
    await expect(page.getByRole('article')).toHaveCount(3);
  });

  test('shows not found for a bad link', async ({ page }) => {
    await useFakeApi(page);
    await page.goto('/post/999');

    await expect(page.getByText('Post not found')).toBeVisible();
  });
});

test.describe('errors', () => {
  test('recovers from a rate limit with try again', async ({ page }) => {
    await useFakeApi(page, { failFirst: 1 });
    await page.goto('/');

    await expect(page.getByRole('alert')).toContainText("Couldn't load posts");
    await page.getByRole('button', { name: 'Try again' }).click();

    await expect(page.getByRole('article')).toHaveCount(3);
  });
});

test.describe('mobile menu', () => {
  test('opens and closes the community drawer', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'the drawer only exists on small screens');
    await useFakeApi(page);
    await page.goto('/');

    await page.getByRole('button', { name: 'Open communities menu' }).click();
    const close = page.getByRole('button', { name: 'Close menu' });
    await expect(close).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(close).toBeHidden();
  });
});
