import { IconSettings, TablerIcon } from '@tabler/icons';
import React from 'react';

interface SidebarItemProps {
  label: string;
  type: 'settings';
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, type }) => {
  const icons: Record<SidebarItemProps['type'], TablerIcon> = {
    settings: IconSettings,
  };
  const Icon = icons[type];

  return (
    <li className="sidebar-item">
      <Icon size="16" /> {label}
    </li>
  );
};

export default SidebarItem;
