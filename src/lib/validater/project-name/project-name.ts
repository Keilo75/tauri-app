import { createErrors } from '../create-error-text/createErrorText';

export const validateProjectName = (projectName: string) => {
  projectName = projectName.trim();

  const { required, shorter, lettersNumbersSpaces } =
    createErrors('Project Name');

  if (projectName.length === 0) return required();
  if (projectName.length > 10) return shorter(10);
  if (!projectName.match(/[a-zA-Z0-9\s]$/)) return lettersNumbersSpaces();

  return undefined;
};
