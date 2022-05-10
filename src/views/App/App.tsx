import { AppShell, Header, MantineProvider, Modal } from '@mantine/core';
import TitleBar from '../../components/TitleBar/TitleBar';
import { IMenuBar } from '../../components/TitleBar/MenuBar';
import SettingsModal from '../../components/SettingsModal/SettingsModal';
import { useDisclosure, useWindowEvent } from '@mantine/hooks';
import { useContext, useEffect } from 'react';
import { AppStoreContext } from '../../store/AppStore/AppStore';
import { AppSettings } from '../../lib/app-store/app-store';
import NewProjectModal from '../../components/NewProjectModal/NewProjectModal';
import { canProjectBeLoaded, setAppStore } from '../../lib/invoke';
import Home from '../Home/Home';
import { Route, useLocation } from 'wouter';
import Editor from '../Editor/Editor';
import { dialog } from '@tauri-apps/api';

function App() {
  const { appStore, dispatch } = useContext(AppStoreContext);
  const [settingsModalOpened, settingsModalHandler] = useDisclosure(false);
  const [newProjectModalOpened, newProjectModalHandler] = useDisclosure(false);
  const [, setLocation] = useLocation();

  useWindowEvent('contextmenu', (e) => e.preventDefault());

  const handleSettingsChange = (newSettings: AppSettings) =>
    dispatch({ type: 'set-settings', payload: newSettings });
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
        { name: 'Open Project', id: 'open_project' },
        {
          name: 'Open Recent',
          id: 'open_recent',
          disabled: appStore.recentProjects.length === 0,
          menu: [
            ...appStore.recentProjects.map((project) => ({
              name: project.name,
              id: project.path,
            })),
            { divider: true },
            { name: 'Clear Recent', id: 'clear_recent' },
          ],
        },
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
      open_project: handleOpenProjectClick,
    };

    actions[ids[0]](ids.slice(1));
  };

  const handleOpenProjectClick = async () => {
    const selectedFile = await dialog.open({
      filters: [{ extensions: ['botlab'], name: 'Botlab' }],
    });
    if (!selectedFile || Array.isArray(selectedFile)) return;

    openProject(selectedFile);
  };

  const openProject = async (path: string) => {
    try {
      await canProjectBeLoaded(path);

      setLocation('/');
      setLocation(`/editor/${encodeURI(path)}`);
    } catch (err) {
      // TODO: Handle Error
    }
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
            handleOpenProjectClick={handleOpenProjectClick}
          />
        </Route>
        <Route path="/editor/:path">
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
          close={newProjectModalHandler.close}
          openProject={openProject}
        />
      </Modal>
    </MantineProvider>
  );
}

export default App;
