import { Group } from '@mantine/core';
import { appWindow } from '@tauri-apps/api/window';
import React, { useState } from 'react';
import MenuBar, { IMenuBar } from './MenuBar';
import './TitleBar.scss';

import { ReactComponent as Minimize } from '../../assets/images/minimize.svg';
import { ReactComponent as Maximize } from '../../assets/images/maximize.svg';
import { ReactComponent as Close } from '../../assets/images/close.svg';

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

  const handleMinimize = () => appWindow.minimize();
  const handleMaximize = () => appWindow.toggleMaximize();
  const handleClose = () => appWindow.close();

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
      <Group spacing={0}>
        <button className="title-bar-button" onClick={handleMinimize}>
          <Minimize />
        </button>
        <button className="title-bar-button" onClick={handleMaximize}>
          <Maximize />
        </button>
        <button
          className="title-bar-button title-bar-button-red"
          onClick={handleClose}
        >
          <Close />
        </button>
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
