import { ProjectInfo } from '../../models/project/project';

export const appSettingsCategories = ['general'] as const;
export type AppSettingsCategories = typeof appSettingsCategories[number];
export interface AppSettings {
  'general.colorScheme': 'light' | 'dark';
}

export interface AppStore {
  settings: AppSettings;
  recentProjects: ProjectInfo[];
}

export const defaultAppSettings: AppSettings = {
  'general.colorScheme': 'dark',
};

export const defaultAppStore: AppStore = {
  settings: defaultAppSettings,
  recentProjects: [],
};
