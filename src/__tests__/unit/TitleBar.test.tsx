import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import TitleBar from '../../components/TitleBar/TitleBar';

describe('Title Bar', () => {
  it('renders', () => {
    render(<TitleBar />);
  });
});
