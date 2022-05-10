import { isRecord } from './is-record';

export const hydrateUnsetValues = <
  T extends Record<string, unknown>,
  U extends T
>(
  currentObj: T,
  defaultObj: U
): U => {
  const newObject = Object.keys(defaultObj).reduce((acc, key) => {
    // If value is not set on current object
    //  Set default value
    // Else
    //  If value is an object
    //    Set value to hydrated object
    //  Else
    //    Set value to existing value

    if (!currentObj.hasOwnProperty(key)) {
      return { ...acc, [key]: defaultObj[key] };
    } else {
      const existingValue = currentObj[key];
      if (isRecord(existingValue)) {
        const hydratedExistingValue = {
          [key]: hydrateUnsetValues(
            existingValue,
            defaultObj[key] as Record<string, unknown>
          ),
        };
        return { ...acc, ...hydratedExistingValue };
      }
      return { ...acc, [key]: existingValue };
    }
  }, {});

  return newObject as U;
};
