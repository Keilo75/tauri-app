import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { defaultAppStore } from '../../lib/app-store/app-store';
import AppStoreProvider from './AppStore';
import { getAppStore } from '../../lib/invoke';

vi.mock('../../lib/invoke', () => ({ getAppStore: vi.fn() }));

describe('App Store', () => {
  it('renders no children at first', () => {
    vi.mocked(getAppStore).mockReturnValue(
      new Promise((resolve) => resolve(defaultAppStore))
    );

    render(<AppStoreProvider>some text</AppStoreProvider>);

    expect(screen.queryByText('some text')).not.toBeInTheDocument();
  });

  it('loads the app store from disk', async () => {
    vi.mocked(getAppStore).mockReturnValue(
      new Promise((resolve) => resolve(defaultAppStore))
    );

    render(<AppStoreProvider>some text</AppStoreProvider>);

    await waitFor(() => {
      expect(screen.getByText('some text')).toBeInTheDocument();
    });
  });

  it('falls back to default app store if nothing is saved on disk', async () => {
    vi.mocked(getAppStore).mockRejectedValue(undefined);

    render(<AppStoreProvider>some text</AppStoreProvider>);

    await waitFor(() => {
      expect(screen.getByText('some text')).toBeInTheDocument();
    });
  });
});
