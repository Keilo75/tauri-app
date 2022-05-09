import { invoke } from '@tauri-apps/api';
import { Project } from '../models/project/project';
import { AppStore } from './app-store/app-store';

export const getAppStore = async (): Promise<AppStore> => {
  const appStore: string = await invoke('get_app_store');
  return JSON.parse(appStore) as AppStore;
};

export const setAppStore = async (appStore: AppStore): Promise<void> => {
  await invoke('set_app_store', { appStore: JSON.stringify(appStore) });
};

export const isFolderEmpty = async (folder: string): Promise<boolean> => {
  return await invoke('is_folder_empty', { folder });
};

export const saveProject = async (
  path: string,
  project: Project
): Promise<void> => {
  await invoke('save_project', {
    path,
    project: JSON.stringify(project),
  });
};

export const canProjectBeLoaded = async (path: string): Promise<void> => {
  return await invoke('can_project_be_loaded', { path });
};

export const loadProject = async (path: string): Promise<string> => {
  return await invoke('load_project', { path });
};
