import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../views/App';

describe('App', () => {
  it('renders', () => {
    render(<App />);
  });

  it('opens and closes the options modal', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('menuitem', { name: 'File' }));
    await user.click(screen.getByRole('menuitem', { name: 'Options' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
