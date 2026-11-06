# Reddit Client: Project Plan

## What it is

A lightweight Reddit-style reader. It loads hot posts, lets you search and filter by community, and opens a post to show its comments.

## Data source

The Lemmy API (lemmy.world). Reddit shut off its free .json endpoints in 2026 and stopped accepting new API requests, so this app uses Lemmy, an open-source Reddit alternative with the same pieces: communities (c/) instead of subreddits, upvotes, Markdown comments, and search. No API key needed.

## Built with

- React (Vite), Redux Toolkit, React Router
- react-markdown for comments
- Vitest + React Testing Library (unit tests), Playwright (end-to-end tests)
- Netlify (hosting), GitHub (code and project board)

## Features (required only)

1. Home page loads hot posts
2. Search bar finds posts by keyword
3. Community sidebar filters posts (presets like c/technology, c/gaming, c/pics, c/news)
4. Clicking a post opens a detail page with its comments, Markdown formatted
5. Error message with a "Try again" button
6. Loading skeletons and small hover and fade animations
7. Responsive layout: sidebar collapses into a menu on mobile
8. Each result fetched once and saved in Redux, and searches wait until typing stops, to go easy on the API's rate limit

## Out of scope (Future work)

Logging in, voting, posting, dark mode, infinite scroll, custom domain, PWA.

## Timeline

| Week | Dates | Goal |
|---|---|---|
| 1 | Nov 6 to 12 | Plan, wireframes, test the Reddit fetch, Vite setup, GitHub repo and project board |
| 2 | Nov 13 to 19 | Build the components with sample data, add Redux slices |
| 3 | Nov 20 to 26 | Connect the Lemmy API, plus search, filter, the detail page, and error states |
| 4 | Nov 27 to Dec 3 | Styling, animations, mobile, tests, Lighthouse fixes |
| 5 | Dec 4 to 7 | Deploy to Netlify, finish the README, update the profile README |

Rule: if it isn't on the feature list, it goes under Future work.
