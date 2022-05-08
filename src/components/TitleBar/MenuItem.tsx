import { Divider, Text } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons';
import clsx from 'clsx';
import React from 'react';
import { useLocation } from 'wouter';
import MenuList from './MenuList';

export interface IMenuItem {
  name?: string;
  id?: string;
  menu?: IMenuItem[];
  disabled?: boolean;
  divider?: boolean;
  editorOnly?: boolean;
}

interface MenuItemProps extends IMenuItem {
  hoveredSubMenu: string | undefined;
  setHoveredSubMenu: React.Dispatch<React.SetStateAction<string | undefined>>;
  handleItemClick: (id: string[]) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  name,
  id,
  menu,
  disabled,
  divider,
  hoveredSubMenu,
  editorOnly,
  setHoveredSubMenu,
  handleItemClick,
}) => {
  const [location] = useLocation();
  const isDisabled = disabled || (editorOnly && !location.includes('editor'));

  const handleMouseEnter = () => {
    setHoveredSubMenu(name);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!id || isDisabled || menu) return;
    e.stopPropagation();

    handleItemClick([id]);
  };

  const handleSubMenuClick = (ids: string[]) => {
    if (!id) return;

    handleItemClick([id, ...ids]);
  };

  return (
    <li
      className={clsx(
        'menu-item',
        divider && 'menu-divider',
        isDisabled && 'menu-disabled',
        name && hoveredSubMenu === name && 'menu-active'
      )}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      role="menuitem"
      aria-disabled={isDisabled}
    >
      {divider && <Divider role="separator" />}
      <Text className={clsx(isDisabled && 'disabled-text')}>{name}</Text>
      {menu && !isDisabled && (
        <>
          <IconChevronRight size={18} />
          {hoveredSubMenu === name && (
            <MenuList
              menu={menu}
              position="side"
              handleItemClick={handleSubMenuClick}
            />
          )}
        </>
      )}
    </li>
  );
};

export default MenuItem;
