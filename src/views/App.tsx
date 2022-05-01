import { AppShell, Header, MantineProvider, Modal } from '@mantine/core';
import TitleBar from '../components/TitleBar/TitleBar';
import { IMenuBar } from '../components/TitleBar/MenuBar';
import OptionsModal from '../components/OptionsModal/OptionsModal';
import { useDisclosure } from '@mantine/hooks';

function App() {
  const [optionsModalOpened, optionsModalHandler] = useDisclosure(true);

  const items: IMenuBar[] = [
    { name: 'File', menu: [{ name: 'Options', id: 'options' }] },
  ];

  const handleItemClick = (ids: string[]) => {
    const actions: Record<string, (args: string[]) => void> = {
      options: () => optionsModalHandler.open(),
    };

    actions[ids[0]](ids.slice(1));
  };

  return (
    <MantineProvider
      withGlobalStyles
      withCSSVariables
      withNormalizeCSS
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
      <Modal
        opened={optionsModalOpened}
        onClose={optionsModalHandler.close}
        closeButtonLabel="Close"
      >
        <OptionsModal />
      </Modal>
    </MantineProvider>
  );
}

export default App;
