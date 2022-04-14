import clsx from 'clsx';
import React, { useState } from 'react';
import MenuItem, { IMenuItem } from './MenuItem';

interface MenuListProps {
  menu: IMenuItem[];
  position: 'bottom' | 'side';
  handleItemClick: (ids: string[]) => void;
}

const MenuList: React.FC<MenuListProps> = ({
  menu,
  position,
  handleItemClick,
}) => {
  const [hoveredSubMenu, setHoveredSubMenu] = useState<string>();

  return (
    <ul className={clsx('menu-list', `menu-list-${position}`)}>
      {menu.map((item, index) => (
        <MenuItem
          key={index}
          {...item}
          hoveredSubMenu={hoveredSubMenu}
          setHoveredSubMenu={setHoveredSubMenu}
          handleItemClick={handleItemClick}
        />
      ))}
    </ul>
  );
};

export default MenuList;
