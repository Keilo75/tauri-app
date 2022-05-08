import { AppShell, Header, MantineProvider, Modal } from '@mantine/core';
import TitleBar from '../components/TitleBar/TitleBar';
import { IMenuBar } from '../components/TitleBar/MenuBar';
import SettingsModal from '../components/SettingsModal/SettingsModal';
import { useDisclosure, useWindowEvent } from '@mantine/hooks';
import { useContext, useEffect, useState } from 'react';
import { AppStoreContext } from '../store/AppStore';
import { AppSettings } from '../lib/app-store/app-store';
import NewProjectModal from '../components/NewProjectModal/NewProjectModal';
import { setAppStore } from '../lib/invoke';
import Home from './Home/Home';
import { Route, useLocation } from 'wouter';
import Editor from './Editor/Editor';

function App() {
  const { appStore, dispatch } = useContext(AppStoreContext);
  const [settingsModalOpened, settingsModalHandler] = useDisclosure(false);
  const [newProjectModalOpened, newProjectModalHandler] = useDisclosure(false);
  const [, setLocation] = useLocation();

  useWindowEvent('contextmenu', (e) => e.preventDefault());

  const handleSettingsChange = (newSettings: AppSettings) =>
    dispatch({ type: 'set', payload: { settings: newSettings } });
  useEffect(() => {
    setAppStore(appStore);

    document.body.classList.toggle(
      'dark-theme',
      appStore.settings['general.colorScheme'] === 'dark'
    );
  }, [appStore]);

  const items: IMenuBar[] = [
    {
      name: 'File',
      menu: [
        { name: 'New Project', id: 'new_project' },
        { divider: true },
        { name: 'Settings', id: 'settings' },
        { divider: true },
        { name: 'Close Editor', id: 'close_editor', editorOnly: true },
      ],
    },
  ];
  const handleItemClick = (ids: string[]) => {
    const actions: Record<string, (args: string[]) => void> = {
      settings: settingsModalHandler.open,
      new_project: newProjectModalHandler.open,
      close_editor: () => setLocation('/'),
    };

    actions[ids[0]](ids.slice(1));
  };

  return (
    <MantineProvider
      withGlobalStyles
      withCSSVariables
      withNormalizeCSS
      theme={{ colorScheme: appStore.settings['general.colorScheme'] }}
      defaultProps={{
        Tooltip: { withArrow: true, transition: 'pop' },
        Modal: { centered: true },
        Alert: { variant: 'outline' },
      }}
    >
      <AppShell
        classNames={{ main: 'main-app' }}
        header={
          <Header height={30}>
            <TitleBar items={items} handleItemClick={handleItemClick} />
          </Header>
        }
      >
        <Route path="/">
          <Home
            recentProjects={[]}
            openNewProjectModal={newProjectModalHandler.open}
          />
        </Route>
        <Route path="/editor/:name/:path">
          <Editor />
        </Route>
      </AppShell>
      <Modal
        opened={settingsModalOpened}
        onClose={settingsModalHandler.close}
        withCloseButton={false}
        size="xl"
      >
        <SettingsModal
          settings={appStore.settings}
          onSettingsChange={handleSettingsChange}
          close={settingsModalHandler.close}
        />
      </Modal>
      <Modal
        opened={newProjectModalOpened}
        onClose={newProjectModalHandler.close}
        title="New Project"
      >
        <NewProjectModal
          emptyFolderOnNewProject={
            appStore.settings['developer.emptyFolderOnNewProject']
          }
          close={newProjectModalHandler.close}
        />
      </Modal>
    </MantineProvider>
  );
}

export default App;
