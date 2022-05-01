import { invoke } from '@tauri-apps/api';
import { defaultAppStore } from './default-app-store';

export interface AppSettings {
  'general.colorScheme': 'light' | 'dark';
}

export interface AppStore {
  settings: AppSettings;
}

export const getAppStore = async (): Promise<AppStore> => {
  try {
    const appStore = (await invoke('get_app_store')) as AppStore;
    return appStore;
  } catch (err) {
    return defaultAppStore;
  }
};
