import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProjectInfo } from '../../models/project/project';
import Home, { HomeProps } from './Home';

const mockRecentProjects: ProjectInfo[] = Array(50)
  .fill(0)
  .map((_, index) => ({
    name: `Project ${index}`,
    path: `C:\\user\\path\\some\\project ${index}`,
    createdAt: Date.now(),
  }));

const defaultProps: HomeProps = {
  recentProjects: mockRecentProjects.slice(0, 5),
  openNewProjectModal: vi.fn(),
  handleOpenProjectClick: vi.fn(),
};

describe('Home', () => {
  it('renders', () => {
    render(<Home {...defaultProps} />);
  });

  it('shows a list of recent projects', () => {
    render(<Home {...defaultProps} />);

    Array(5)
      .fill(0)
      .map((_, index) => index)
      .forEach((index) => {
        expect(screen.getByText(`Project ${index}`)).toBeInTheDocument();
      });
  });

  it('shows if no recent projects are present', () => {
    render(<Home {...defaultProps} recentProjects={[]} />);

    expect(screen.getByText('No recent projects.')).toBeInTheDocument();
  });

  it('only shows the first 15 projects', () => {
    render(<Home {...defaultProps} recentProjects={mockRecentProjects} />);

    expect(screen.getAllByRole('link', { name: /Project \d+/ })).toHaveLength(
      15
    );
  });

  it('opens the new project modal', async () => {
    const user = userEvent.setup();
    const openNewProjectModal = vi.fn();

    render(
      <Home {...defaultProps} openNewProjectModal={openNewProjectModal} />
    );

    await user.click(screen.getByRole('link', { name: /New Project/ }));
    expect(openNewProjectModal).toHaveBeenCalled();
  });
});
