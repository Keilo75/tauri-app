import { AppShell, Header, MantineProvider } from '@mantine/core';
import TitleBar from '../components/TitleBar/TitleBar';
import { IMenuBar } from '../components/TitleBar/MenuBar';

function App() {
  const items: IMenuBar[] = [
    {
      name: 'Bar 1',
      menu: [
        {
          name: 'Item 1',
          id: 'Item 1',
          menu: [
            { name: 'Item 1.1', menu: [{ name: 'Item 1.1.1' }] },
            { name: 'Item 1.2', menu: [{ name: 'Item 1.2.1' }] },
            { name: 'Item 1.3' },
          ],
        },
        { divider: true },
        {
          name: 'Item 2',
          menu: [{ name: 'Item 2.1' }, { name: 'Item 2.2' }],
        },
        { name: 'Item 3' },
        { name: 'Item 4', disabled: true },
      ],
    },
    { name: 'Bar 2', menu: [{ name: 'Item 1' }, { name: 'Item 2' }] },
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
