import { isFolderEmpty } from '../../invoke';
import { createErrors } from '../create-error-text/createErrorText';

export const validateProjectPath = async (projectPath: string) => {
  const { required, invalidFolder, nonEmptyFolder } =
    createErrors('Project Path');

  if (projectPath.length === 0) return required();

  try {
    const isEmpty = await isFolderEmpty(projectPath);
    if (!isEmpty) return nonEmptyFolder();
  } catch {
    return invalidFolder();
  }

  return undefined;
};
