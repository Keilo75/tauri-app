import clsx from 'clsx';
import React, { useState } from 'react';
import MenuItem, { IMenuItem } from './MenuItem';

interface MenuListProps {
  menu: IMenuItem[];
  position: 'bottom' | 'side';
}

const MenuList: React.FC<MenuListProps> = ({ menu, position }) => {
  const [hoveredSubMenu, setHoveredSubMenu] = useState<string>();

  return (
    <ul className={clsx('menu-list', `menu-list-${position}`)}>
      {menu.map((item) => (
        <MenuItem
          {...item}
          hoveredSubMenu={hoveredSubMenu}
          setHoveredSubMenu={setHoveredSubMenu}
        />
      ))}
    </ul>
  );
};

export default MenuList;
