import { defaultAppSettings, defaultAppStore } from '../app-store/app-store';
import { hydrateUnsetValues } from './hydrate-unset-values';
import { isRecord } from './is-record';

describe('is record', () => {
  it('returns false', () => {
    expect(isRecord(undefined)).toBe(false);
    expect(isRecord(null)).toBe(false);
    expect(isRecord(3)).toBe(false);
    expect(isRecord('abc')).toBe(false);
    expect(isRecord(true)).toBe(false);
    expect(isRecord([])).toBe(false);
    expect(isRecord(() => null)).toBe(false);
  });

  it('returns true', () => {
    expect(isRecord({})).toBe(true);
    expect(isRecord({ foo: 'bar' })).toBe(true);
    expect(isRecord({ foo: 'bar', bar: { baz: true } })).toBe(true);
  });
});

describe('hydrate unset values', () => {
  it('sets values to defaults', () => {
    expect(
      hydrateUnsetValues({ foo: false }, { foo: true, bar: false })
    ).toEqual({ foo: false, bar: false });
  });

  it('works with enmpty objects', () => {
    expect(hydrateUnsetValues({}, {})).toEqual({});
  });

  it('works recursively', () => {
    expect(hydrateUnsetValues({}, { foo: { bar: { baz: true } } })).toEqual({
      foo: { bar: { baz: true } },
    });

    expect(
      hydrateUnsetValues(
        { foo: { bar: false } },
        { foo: { bar: true, baz: { foo: false } } }
      )
    ).toEqual({ foo: { bar: false, baz: { foo: false } } });
  });

  it('works with the app store', () => {
    const newAppStore = {
      ...defaultAppStore,
      settings: { ...defaultAppSettings, someNewSetting: 'hi' },
      someNewThing: 'hi',
      someOtherNewThing: 'hi',
    };

    expect(
      hydrateUnsetValues(
        { ...defaultAppStore, someOtherNewThing: 'unchanged' },
        newAppStore
      )
    ).toEqual({
      ...defaultAppStore,
      settings: { ...defaultAppSettings, someNewSetting: 'hi' },
      someNewThing: 'hi',
      someOtherNewThing: 'unchanged',
    });
  });
});
