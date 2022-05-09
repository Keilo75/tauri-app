import { render } from '@testing-library/react';
import App from './App';

vi.mock('@tauri-apps/api');

describe('App', () => {
  it('renders', () => {
    render(<App />);
  });
});
