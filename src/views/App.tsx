import { AppShell, Header, MantineProvider, Modal } from '@mantine/core';
import TitleBar from '../components/TitleBar/TitleBar';
import { IMenuBar } from '../components/TitleBar/MenuBar';
import SettingsModal from '../components/SettingsModal/SettingsModal';
import { useDidUpdate, useDisclosure } from '@mantine/hooks';
import { useContext, useEffect } from 'react';
import { AppStoreContext } from '../store/AppStore';
import { AppSettings, setAppStore } from '../api/app-store/app-store';

function App() {
  const { appStore, dispatch } = useContext(AppStoreContext);
  const handleSettingsChange = (newSettings: AppSettings) =>
    dispatch({ type: 'set', payload: { settings: newSettings } });

  useEffect(() => {
    document.body.classList.toggle(
      'dark-theme',
      appStore.settings['general.colorScheme'] === 'dark'
    );
  }, [appStore]);

  useDidUpdate(() => {
    setAppStore(appStore);
  }, [appStore]);

  const [settingsModalOpened, settingsModalHandler] = useDisclosure(false);

  const items: IMenuBar[] = [
    { name: 'File', menu: [{ name: 'Settings', id: 'settings' }] },
  ];

  const handleItemClick = (ids: string[]) => {
    const actions: Record<string, (args: string[]) => void> = {
      settings: () => settingsModalHandler.open(),
    };

    actions[ids[0]](ids.slice(1));
  };

  return (
    <MantineProvider
      withGlobalStyles
      withCSSVariables
      withNormalizeCSS
      theme={{ colorScheme: appStore.settings['general.colorScheme'] }}
    >
      <AppShell
        header={
          <Header height={30}>
            <TitleBar items={items} handleItemClick={handleItemClick} />
          </Header>
        }
      >
        <div></div>
      </AppShell>
      <Modal
        opened={settingsModalOpened}
        onClose={settingsModalHandler.close}
        withCloseButton={false}
        size="xl"
        centered
      >
        <SettingsModal
          settings={appStore.settings}
          onSettingsChange={handleSettingsChange}
          close={settingsModalHandler.close}
        />
      </Modal>
    </MantineProvider>
  );
}

export default App;
