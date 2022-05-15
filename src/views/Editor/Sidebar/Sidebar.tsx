import { Paper } from '@mantine/core';
import clsx from 'clsx';
import React from 'react';
import { useDragArea } from '../../../hooks/useDragArea';
import './Sidebar.scss';

const Sidebar: React.FC = () => {
  const { dragAreaRef, dragAreaActive, dragAreaWidth, resizableRef } =
    useDragArea(200, {
      minWidth: 150,
    });

  return (
    <Paper
      className="sidebar"
      withBorder
      style={{ width: dragAreaWidth }}
      ref={resizableRef}
    >
      {dragAreaWidth}
      <div
        className={clsx('drag-area', dragAreaActive && 'drag-area-active')}
        ref={dragAreaRef}
      />
    </Paper>
  );
};

export default Sidebar;
