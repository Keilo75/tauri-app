import { Text } from '@mantine/core';
import React from 'react';
import { IMenuItem } from './MenuItem';
import MenuList from './MenuList';

export interface IMenuBar {
  name: string;
  menu: IMenuItem[];
}

export interface MenuBarProps extends IMenuBar {
  hoveredMenu: string | undefined;
  setHoveredMenu: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const MenuBar: React.FC<MenuBarProps> = ({
  name,
  menu,
  hoveredMenu,
  setHoveredMenu,
}) => {
  const toggleMenu = () =>
    setHoveredMenu((prev) => (prev === undefined ? name : undefined));

  const openMenu = () => hoveredMenu !== undefined && setHoveredMenu(name);

  return (
    <div className="menu-bar">
      <button
        className="title-bar-button"
        onClick={toggleMenu}
        onMouseEnter={openMenu}
      >
        <Text>{name}</Text>
      </button>
      {hoveredMenu === name && <MenuList menu={menu} position="bottom" />}
    </div>
  );
};

export default MenuBar;