import { Divider, Text } from '@mantine/core';
import clsx from 'clsx';
import React, { useState } from 'react';
import { ChevronRight } from 'tabler-icons-react';
import MenuList from './MenuList';

export interface IMenuItem {
  name?: string;
  menu?: IMenuItem[];
  disabled?: boolean;
  divider?: boolean;
}

interface MenuItemProps extends IMenuItem {
  hoveredSubMenu: string | undefined;
  setHoveredSubMenu: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const MenuItem: React.FC<MenuItemProps> = ({
  name,
  menu,
  disabled,
  divider,
  hoveredSubMenu,
  setHoveredSubMenu,
}) => {
  const handleMouseEnter = () => {
    setHoveredSubMenu(name);
  };

  return (
    <li
      className={clsx(
        'menu-item',
        divider && 'menu-divider',
        disabled && 'menu-disabled'
      )}
      onMouseEnter={handleMouseEnter}
    >
      {divider && <Divider />}
      <Text className={clsx(disabled && 'disabled-text')}>{name}</Text>
      {menu && (
        <>
          <ChevronRight size={18} />
          {hoveredSubMenu === name && <MenuList menu={menu} position="side" />}
        </>
      )}
    </li>
  );
};

export default MenuItem;
