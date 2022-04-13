import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import App from '../../views/App';

describe('App', () => {
  it('renders', () => {
    render(<App />);
  });
});
