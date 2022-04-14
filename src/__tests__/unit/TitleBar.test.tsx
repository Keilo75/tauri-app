import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IMenuBar } from '../../components/TitleBar/MenuBar';
import TitleBar, { TitleBarProps } from '../../components/TitleBar/TitleBar';

import { appWindow } from '@tauri-apps/api/window';
vi.mock('@tauri-apps/api/window');

const mockItems: IMenuBar[] = [
  {
    name: 'Bar 1',
    menu: [
      {
        name: 'Item 1',
        id: 'item-1',
        menu: [
          {
            name: 'Item 1.1',
            id: 'item-1-1',
            menu: [{ name: 'Item 1.1.1', id: 'item-1-1-1' }],
          },
          {
            name: 'Item 1.2',
            id: 'item-1-2',
            menu: [{ name: 'Item 1.2.1', id: 'item1-2-1' }],
          },
          { name: 'Item 1.3', id: 'item-1-3' },
        ],
      },
      { divider: true },
      {
        name: 'Item 2',
        id: 'item-2',
        menu: [
          { name: 'Item 2.1', id: 'item-2-1' },
          { name: 'Item 2.2', id: 'item-2-2' },
        ],
      },
      { name: 'Item 3', id: 'item-3' },
      { name: 'Item 4', id: 'item-4', disabled: true },
    ],
  },
  {
    name: 'Bar 2',
    menu: [
      { name: 'Item 1', id: 'item-1' },
      { name: 'Item 2', id: 'item-2' },
    ],
  },
];

const defaultProps: TitleBarProps = {
  items: mockItems,
  handleItemClick: () => {},
};

describe('Title Bar', () => {
  it('renders', () => {
    render(<TitleBar {...defaultProps} />);
  });
});

describe('Menu Bars', () => {
  it('shows and hides the overlay', async () => {
    const user = userEvent.setup();
    render(<TitleBar {...defaultProps} />);

    expect(screen.queryByTestId('overlay')).not.toBeInTheDocument();
    await user.click(screen.getByRole('menuitem', { name: 'Bar 1' }));

    const overlay = screen.getByTestId('overlay');
    expect(overlay).toBeInTheDocument();
    await user.click(overlay);

    expect(overlay).not.toBeInTheDocument();
  });

  it('toggles menu on menu bar click', async () => {
    const user = userEvent.setup();
    render(<TitleBar {...defaultProps} />);

    await user.click(screen.getByRole('menuitem', { name: 'Bar 1' }));
    expect(screen.getByRole('menu')).toBeInTheDocument();

    await user.click(screen.getByRole('menuitem', { name: 'Bar 1' }));
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('only has one open menu at a time', async () => {
    const user = userEvent.setup();
    render(<TitleBar {...defaultProps} />);

    await user.click(screen.getByRole('menuitem', { name: 'Bar 1' }));
    expect(screen.getByRole('menu')).toBeInTheDocument();

    await user.hover(screen.getByRole('menuitem', { name: 'Bar 2' }));
    expect(screen.getAllByRole('menu')).toHaveLength(1);
  });

  it('supports multi level menus', async () => {
    const user = userEvent.setup();
    render(<TitleBar {...defaultProps} />);

    await user.click(screen.getByRole('menuitem', { name: 'Bar 1' }));
    await user.hover(screen.getByRole('menuitem', { name: 'Item 1' }));
    await user.hover(screen.getByRole('menuitem', { name: 'Item 1.1' }));
    expect(screen.getAllByRole('menu')).toHaveLength(3);
  });

  it('closes submenu on mouse leave', async () => {
    const user = userEvent.setup();
    render(<TitleBar {...defaultProps} />);

    await user.click(screen.getByRole('menuitem', { name: 'Bar 1' }));
    await user.hover(screen.getByRole('menuitem', { name: 'Item 1' }));
    expect(screen.getAllByRole('menu')).toHaveLength(2);

    await user.hover(screen.getByRole('menuitem', { name: 'Item 2' }));
    expect(screen.getAllByRole('menu')).toHaveLength(2);
  });

  it('calls handleItemClick with the correct ids', async () => {
    const user = userEvent.setup();
    const mockHandleItemClick = vi.fn();
    render(
      <TitleBar {...defaultProps} handleItemClick={mockHandleItemClick} />
    );

    await user.click(screen.getByRole('menuitem', { name: 'Bar 1' }));
    await user.click(screen.getByRole('menuitem', { name: 'Item 3' }));
    expect(mockHandleItemClick).toHaveBeenLastCalledWith(['item-3']);

    await user.click(screen.getByRole('menuitem', { name: 'Bar 1' }));
    await user.hover(screen.getByRole('menuitem', { name: 'Item 1' }));
    await user.click(screen.getByRole('menuitem', { name: 'Item 1.3' }));
    expect(mockHandleItemClick).toHaveBeenLastCalledWith([
      'item-1',
      'item-1-3',
    ]);
  });

  it('does not call handleItemClick on menu items with a submenu', async () => {
    const user = userEvent.setup();
    const mockHandleItemClick = vi.fn();
    render(
      <TitleBar {...defaultProps} handleItemClick={mockHandleItemClick} />
    );

    await user.click(screen.getByRole('menuitem', { name: 'Bar 1' }));
    await user.click(screen.getByRole('menuitem', { name: 'Item 1' }));
    expect(mockHandleItemClick).not.toHaveBeenCalled();
  });

  it('does not call handleItemClick on disabled menu items', async () => {
    const user = userEvent.setup();
    const mockHandleItemClick = vi.fn();
    render(
      <TitleBar {...defaultProps} handleItemClick={mockHandleItemClick} />
    );

    await user.click(screen.getByRole('menuitem', { name: 'Bar 1' }));
    await user.click(screen.getByRole('menuitem', { name: 'Item 4' }));
    expect(mockHandleItemClick).not.toHaveBeenCalled();
  });

  it('closes menu on item click', async () => {
    const user = userEvent.setup();
    render(<TitleBar {...defaultProps} />);

    await user.click(screen.getByRole('menuitem', { name: 'Bar 1' }));
    await user.click(screen.getByRole('menuitem', { name: 'Item 3' }));
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('supports dividers', async () => {
    const user = userEvent.setup();
    render(<TitleBar {...defaultProps} />);

    await user.click(screen.getByRole('menuitem', { name: 'Bar 1' }));
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });
});

describe('Window Control Buttons', () => {
  it.each(['minimize', 'toggleMaximize', 'close'])(
    'handle %s window control button',
    async (windowControl) => {
      const user = userEvent.setup();
      render(<TitleBar {...defaultProps} />);

      await user.click(screen.getByLabelText(windowControl));
      // @ts-expect-error
      expect(appWindow[windowControl]).toHaveBeenCalled();
    }
  );
});
