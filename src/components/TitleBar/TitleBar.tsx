import { Button, Group, Text } from '@mantine/core';
import React, { useState } from 'react';
import MenuBar, { IMenuBar, MenuBarProps } from './MenuBar';
import './TitleBar.scss';

interface TitleBarProps {
  items: IMenuBar[];
}

const TitleBar: React.FC<TitleBarProps> = ({ items }) => {
  const [hoveredMenu, setHoveredMenu] = useState<string>();
  const hideHoveredMenu = () => setHoveredMenu(undefined);

  return (
    <header data-tauri-drag-region className="title-bar">
      <Group className="menu-bars" spacing={0}>
        {items.map((item) => (
          <MenuBar
            key={item.name}
            {...item}
            hoveredMenu={hoveredMenu}
            setHoveredMenu={setHoveredMenu}
          />
        ))}
      </Group>
      {hoveredMenu && <div className="overlay" onClick={hideHoveredMenu} />}
    </header>
  );
};

export default TitleBar;
