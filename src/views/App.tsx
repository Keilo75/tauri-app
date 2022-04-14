import { useEffect, useState } from 'react';
import { AppShell, Header, MantineProvider, Navbar } from '@mantine/core';
import TitleBar from '../components/TitleBar/TitleBar';
import MenuBar, { IMenuBar } from '../components/TitleBar/MenuBar';

function App() {
  const items: IMenuBar[] = [
    {
      name: 'File',
      menu: [
        {
          name: 'Open recent',
          id: 'open-recent',
          menu: [
            { name: 'Project 1' },
            { name: 'Project 2' },
            { divider: true },
            { name: 'Clear recently opened', id: 'clear-open-recent' },
          ],
        },
        { divider: true },
        { name: 'Save', id: 'save' },
        { divider: true },
        { name: 'Exit', id: 'exit' },
      ],
    },
    { name: 'View', menu: [{ name: 'Reload' }] },
  ];

  const handleItemClick = (ids: string[]) => {
    console.log(ids);
  };

  return (
    <MantineProvider
      withNormalizeCSS
      withGlobalStyles
      withCSSVariables
      theme={{ colorScheme: 'dark' }}
    >
      <AppShell
        header={
          <Header height={30}>
            <TitleBar items={items} handleItemClick={handleItemClick} />
          </Header>
        }
      >
        <div>hi</div>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
