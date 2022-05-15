import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Sidebar from './Sidebar';

describe('Sidebar', () => {
  it('renders', () => {
    render(<Sidebar />);
  });

  it('correctly shows and hides the drag area on hover', async () => {
    vi.useFakeTimers();

    const user = userEvent.setup();
    render(<Sidebar />);

    const dragArea = screen.getByRole('separator', { hidden: true });
    await user.hover(dragArea);
    expect(dragArea).toHaveAttribute('aria-hidden', 'true');
    await user.unhover(dragArea);

    await user.hover(dragArea);
    vi.runOnlyPendingTimers();
    expect(dragArea).toHaveAttribute('aria-hidden', 'false');
    await user.unhover(dragArea);
    expect(dragArea).toHaveAttribute('aria-hidden', 'true');

    vi.useRealTimers();
  });
});
