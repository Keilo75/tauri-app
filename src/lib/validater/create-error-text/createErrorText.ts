export const createErrors = (value: string) => {
  const required = () => `${value} is required`;

  const lettersNumbersSpaces = () =>
    `${value} can only contain letters, numbers and spaces`;

  const shorter = (chars: number) =>
    `${value} must be ${chars} characters or less`;

  const invalidFolder = () => `Path is not a valid folder`;
  const nonEmptyFolder = () => `Folder is not empty`;

  return {
    required,
    lettersNumbersSpaces,
    shorter,
    invalidFolder,
    nonEmptyFolder,
  };
};
