import { Group } from '@mantine/core';
import React, { useState } from 'react';
import MenuBar, { IMenuBar } from './MenuBar';
import './TitleBar.scss';

export interface TitleBarProps {
  items: IMenuBar[];
  handleItemClick: (ids: string[]) => void;
}

const TitleBar: React.FC<TitleBarProps> = ({ items, handleItemClick }) => {
  const [hoveredMenu, setHoveredMenu] = useState<string>();
  const hideHoveredMenu = () => setHoveredMenu(undefined);

  const handleItemClickAndHide = (ids: string[]) => {
    handleItemClick(ids);
    setHoveredMenu(undefined);
  };

  return (
    <header data-tauri-drag-region className="title-bar">
      <Group className="menu-bars" spacing={0}>
        {items.map((item) => (
          <MenuBar
            key={item.name}
            {...item}
            hoveredMenu={hoveredMenu}
            setHoveredMenu={setHoveredMenu}
            handleItemClick={handleItemClickAndHide}
          />
        ))}
      </Group>
      {hoveredMenu && (
        <div
          className="overlay"
          onClick={hideHoveredMenu}
          data-testid="overlay"
        />
      )}
    </header>
  );
};

export default TitleBar;
