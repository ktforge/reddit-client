import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// unmounts whatever a test rendered so tests don't leak into each other
afterEach(() => {
  cleanup();
});
