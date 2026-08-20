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
  expect(screen.getByText(/Why Choose Us/i)).toBeInTheDocument();
  expect(screen.getAllByText(/Case Studies/i).length).toBeGreaterThan(0);
  expect(screen.getByText(/Drop Us Your Message/i)).toBeInTheDocument();
});
