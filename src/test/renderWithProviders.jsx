import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { makeStore } from '../app/store.js';

// renders a component with a fresh redux store and a fake router, like the real app
export function renderWithProviders(ui, { route = '/', preloadedState, store } = {}) {
  const testStore = store ?? makeStore(preloadedState);
  const result = render(
    <Provider store={testStore}>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </Provider>,
  );
  return { store: testStore, ...result };
}
