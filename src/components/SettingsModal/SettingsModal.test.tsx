import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { defaultAppSettings } from '../../lib/app-store/app-store';
import SettingsModal, { SettingsModalProps } from './SettingsModal';

const defaultProps: SettingsModalProps = {
  settings: defaultAppSettings,
  onSettingsChange: vi.fn(),
  close: vi.fn(),
};

describe('Settings Modal', () => {
  it('renders', () => {
    render(<SettingsModal {...defaultProps} />);
  });

  it('closes the modal', async () => {
    const user = userEvent.setup();
    const close = vi.fn();
    render(<SettingsModal {...defaultProps} close={close} />);

    await user.click(screen.getByLabelText('Close'));
    expect(close).toHaveBeenCalled();
  });

  it('updates the settings', async () => {
    const user = userEvent.setup();
    const onSettingsChange = vi.fn();
    render(
      <SettingsModal {...defaultProps} onSettingsChange={onSettingsChange} />
    );

    await user.click(screen.getByLabelText('Light'));
    expect(onSettingsChange).toHaveBeenCalled();
    expect(onSettingsChange.mock.calls[0][0]['general.colorScheme']).toEqual(
      'light'
    );
  });
});
