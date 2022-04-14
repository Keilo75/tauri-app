import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IMenuBar } from '../../components/TitleBar/MenuBar';
import TitleBar, { TitleBarProps } from '../../components/TitleBar/TitleBar';

const mockItems: IMenuBar[] = [
  {
    name: 'Bar 1',
    menu: [
      {
        name: 'Item 1',
        menu: [
          { name: 'Item 1.1', menu: [{ name: 'Item 1.1.1' }] },
          { name: 'Item 1.2', menu: [{ name: 'Item 1.2.1' }] },
          { name: 'Item 1.3' },
        ],
      },
      { divider: true },
      {
        name: 'Item 2',
        menu: [{ name: 'Item 2.1' }, { name: 'Item 2.2' }],
      },
      { name: 'Item 3', disabled: true },
    ],
  },
  { name: 'Bar 2', menu: [{ name: 'Item 1' }, { name: 'Item 2' }] },
];

const defaultProps: TitleBarProps = {
  items: mockItems,
  handleItemClick: () => {},
};

describe('Title Bar', () => {
  it('renders', () => {
    render(<TitleBar {...defaultProps} />);
  });

  it('shows and hides the overlay', async () => {
    const user = userEvent.setup();
    render(<TitleBar {...defaultProps} />);

    expect(screen.queryByTestId('overlay')).not.toBeInTheDocument();
    await user.click(screen.getByRole('menuitem', { name: /bar 1/i }));

    const overlay = screen.getByTestId('overlay');
    expect(overlay).toBeInTheDocument();
    await user.click(overlay);

    expect(overlay).not.toBeInTheDocument();
  });

  it('only has one open menu at a time', () => {});

  it('calls handleItemClick with the correct ids', () => {});

  it('supports multi level menus', () => {});

  it('closes submenu on mouse leave', () => {});

  it('does not call handleItemClick on disabled menu items', () => {});

  it('does not call handleItemClick on menu items with a submenu', () => {});

  it('supports dividers', () => {});
});
