export const appSettingsCategories = ['general'] as const;
export type AppSettingsCategories = typeof appSettingsCategories[number];
export interface AppSettings {
  'general.colorScheme': 'light' | 'dark';
  'developer.emptyFolderOnNewProject': boolean;
}

export interface AppStore {
  settings: AppSettings;
}

export const defaultAppSettings: AppSettings = {
  'general.colorScheme': 'dark',
  'developer.emptyFolderOnNewProject': false,
};

export const defaultAppStore: AppStore = {
  settings: defaultAppSettings,
};
