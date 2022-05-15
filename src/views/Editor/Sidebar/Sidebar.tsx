import { Paper } from '@mantine/core';
import clsx from 'clsx';
import React from 'react';
import { useDragArea } from '../../../hooks/useDragArea';
import './Sidebar.scss';

const Sidebar: React.FC = () => {
  const { dragAreaRef, dragAreaHovered, dragAreaWidth, resizableRef } =
    useDragArea(250, {
      minWidth: 150,
    });

  return (
    <Paper
      className="sidebar"
      withBorder
      style={{ width: dragAreaWidth }}
      ref={resizableRef}
      role="navigation"
    >
      <div
        className={clsx('drag-area', dragAreaHovered && 'drag-area-active')}
        aria-hidden={!dragAreaHovered}
        ref={dragAreaRef}
        role="separator"
      />
    </Paper>
  );
};

export default Sidebar;
