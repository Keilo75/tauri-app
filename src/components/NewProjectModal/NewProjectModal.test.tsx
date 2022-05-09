import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewProjectModal, { NewProjectModalProps } from './NewProjectModal';

vi.mock('@tauri-apps/api', () => {
  return {
    dialog: { open: () => 'selected path' },
    path: { join: () => 'save path' },
  };
});

vi.mock('../../lib/invoke', () => ({
  saveProject: () => new Promise<void>((resolve) => resolve()),
}));

vi.mock('../../lib/validater/project-path/project-path', () => ({
  validateProjectPath: (path: string) => {
    if (path === 'path') return undefined;
    return 'error';
  },
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
    const user = userEvent.setup();
    render(<NewProjectModal {...defaultProps} />);

    await user.click(screen.getByLabelText('Browse'));
    expect(screen.getByLabelText('Project Path')).toHaveValue('selected path');
  });

  it('creates a new project', async () => {
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
