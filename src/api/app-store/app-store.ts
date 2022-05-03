import { invoke } from '@tauri-apps/api';
import { defaultAppStore } from './default-app-store';

export const appSettingsCategories = ['general'] as const;
export type AppSettingsCategories = typeof appSettingsCategories[number];
export interface AppSettings {
  'general.colorScheme': 'light' | 'dark';
}

export interface AppStore {
  settings: AppSettings;
}

export const getAppStore = async (): Promise<AppStore> => {
  try {
    const appStore: string = await invoke('get_app_store');
    return JSON.parse(appStore) as AppStore;
  } catch (err) {
    return defaultAppStore;
  }
};

export const setAppStore = async (appStore: AppStore): Promise<void> => {
  await invoke('set_app_store', { appStore: JSON.stringify(appStore) });
};
