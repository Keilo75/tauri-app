export interface ProjectInfo {
  name: string;
  path: string;
}

export interface Project {
  settings: ProjectSettings;
}

export interface ProjectSettings {
  name: string;
  token: string;
}

export const defaultProject: Project = {
  settings: { name: '', token: '' },
};
