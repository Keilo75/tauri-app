import { invoke } from '@tauri-apps/api';
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