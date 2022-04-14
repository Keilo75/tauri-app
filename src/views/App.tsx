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
          menu: [
            { name: 'Project 1' },
            { name: 'Project 2' },
            { divider: true },
            { name: 'Clear recently opened' },
          ],
        },
        { divider: true },
        { name: 'Save' },
        { divider: true },
        { name: 'Exit' },
      ],
    },
    { name: 'View', menu: [{ name: 'Reload' }] },
  ];

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
            <TitleBar items={items} />
          </Header>
        }
      >
        <div>hi</div>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
