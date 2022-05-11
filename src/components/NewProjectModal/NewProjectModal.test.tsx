import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewProjectModal, { NewProjectModalProps } from './NewProjectModal';
import { dialog, path } from '@tauri-apps/api';
import { validateProjectPath } from '../../lib/validater/project-path/project-path';

vi.mock('@tauri-apps/api', () => ({
  dialog: {
    open: vi.fn(),
  },
  path: { join: vi.fn() },
}));

vi.mock('../../lib/invoke', () => ({ saveProject: vi.fn() }));

vi.mock('../../lib/validater/project-path/project-path', () => ({
  validateProjectPath: vi.fn(),
}));

const defaultProps: NewProjectModalProps = {
  close: vi.fn(),
  openProject: vi.fn(),
};

describe('New Project Modal', () => {
  it('renders', () => {
    render(<NewProjectModal {...defaultProps} />);
  });

  it('closes the modal', async () => {
    const user = userEvent.setup();
    const close = vi.fn();
    render(<NewProjectModal {...defaultProps} close={close} />);

    await user.click(screen.getByRole('button', { name: /Cancel/ }));
    expect(close).toHaveBeenCalled();
  });

  it('shows errors on invalid inputs', async () => {
    vi.mocked(validateProjectPath).mockResolvedValue('error');

    const user = userEvent.setup();
    render(<NewProjectModal {...defaultProps} />);

    await user.click(screen.getByRole('button', { name: /Create/ }));
    expect(screen.getByLabelText('Project Name')).toHaveAttribute(
      'aria-invalid',
      'true'
    );
    expect(screen.getByLabelText('Project Path')).toHaveAttribute(
      'aria-invalid',
      'true'
    );
  });

  it('handles browse click', async () => {
    vi.mocked(dialog.open).mockResolvedValue('selected path');

    const user = userEvent.setup();
    render(<NewProjectModal {...defaultProps} />);

    await user.click(screen.getByLabelText('Browse'));
    expect(screen.getByLabelText('Project Path')).toHaveValue('selected path');
  });

  it('creates a new project', async () => {
    vi.mocked(path.join).mockResolvedValue('save path');

    const user = userEvent.setup();
    const close = vi.fn();
    const openProject = vi.fn();
    render(
      <NewProjectModal
        {...defaultProps}
        close={close}
        openProject={openProject}
      />
    );

    const projectNameInput = screen.getByLabelText('Project Name');
    const projectPathInput = screen.getByLabelText('Project Path');

    await user.type(projectNameInput, 'name');
    await user.type(projectPathInput, 'path');

    await user.click(screen.getByRole('button', { name: /Create/ }));

    expect(projectNameInput).toHaveAttribute('aria-invalid', 'false');
    expect(projectPathInput).toHaveAttribute('aria-invalid', 'false');

    expect(close).toHaveBeenCalled();
    expect(openProject).toHaveBeenCalledWith('save path');
  });
});
