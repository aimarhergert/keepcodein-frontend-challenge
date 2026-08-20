import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './app/store';

test('renders the landing page with all main sections', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(screen.getByRole("heading", { name: /why choose us/i })).toBeInTheDocument();
  expect(screen.getAllByText(/Case Studies/i).length).toBeGreaterThan(0);
  expect(screen.getByText(/Drop Us Your Message/i)).toBeInTheDocument();
});
