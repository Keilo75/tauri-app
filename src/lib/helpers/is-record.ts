export const isRecord = (
  variable: unknown
): variable is Record<string, unknown> => {
  if (variable === null) return false;
  if (Array.isArray(variable)) return false;
  if (typeof variable !== 'object') return false;

  return true;
};
