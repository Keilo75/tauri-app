import { Divider, Text } from '@mantine/core';
import clsx from 'clsx';
import React, { useState } from 'react';
import { ChevronRight } from 'tabler-icons-react';
import MenuList from './MenuList';

export interface IMenuItem {
  name?: string;
  id?: string;
  menu?: IMenuItem[];
  disabled?: boolean;
  divider?: boolean;
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
  setHoveredSubMenu,
  handleItemClick,
}) => {
  const handleMouseEnter = () => {
    setHoveredSubMenu(name);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!id || menu) return;
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
        disabled && 'menu-disabled'
      )}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
    >
      {divider && <Divider />}
      <Text className={clsx(disabled && 'disabled-text')}>{name}</Text>
      {menu && (
        <>
          <ChevronRight size={18} />
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
