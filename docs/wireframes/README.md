# Wireframes

Data comes from the Lemmy API (lemmy.world), since Reddit closed its free API. Communities (c/) take the place of subreddits.

| File | Shows |
|---|---|
| 01-desktop-home | Home feed: header with search, post cards, community sidebar |
| 02-desktop-post-detail | Post detail page with nested comments |
| 03-states | Loading skeleton, error with Try again, no search results |
| 04-mobile-home | Mobile feed with community dropdown |
| 05-mobile-menu | Mobile community menu (slide-out drawer) |
| 06-user-flow | How users move between screens and states |
| 07-palette | Colors and type |

## Components

- `Header`: logo, `SearchBar`, mobile menu button
- `SearchBar`: waits until typing stops, then searches
- `CommunityList`: sidebar on desktop, drawer on mobile
- `PostList` and `PostCard`: feed of posts (votes, title, media, author, time, comments count)
- `PostDetail`: full post plus `CommentList` and `Comment` (Markdown, indented replies)
- `Skeleton`: loading placeholders
- `ErrorMessage`: error text with Try again and Back to Home
- `EmptyState`: no results with Clear search

## Screen sizes

- Desktop (1024px and up): feed plus sidebar
- Tablet (640 to 1023px): feed only, sidebar becomes the drawer
- Mobile (under 640px): full-width cards, search and menu icons in the header

## Colors

Accent #FF6B35, Accent light #FFE8DE, Background #F6F7F8, Surface #FFFFFF, Border #D0D4D9, Text #1C1C1C, Muted #6B7280, Error #DC2626
