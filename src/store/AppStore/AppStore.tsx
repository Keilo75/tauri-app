import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import {
  AppSettings,
  AppStore,
  defaultAppStore,
} from '../../lib/app-store/app-store';
import { hydrateUnsetValues } from '../../lib/helpers/hydrate-unset-values';
import { getAppStore } from '../../lib/invoke';

export type AppStoreAction =
  | {
      type: 'set';
      payload: AppStore;
    }
  | { type: 'set-settings'; payload: AppSettings }
  | { type: 'use-defaults' };

const reducer = (state: AppStore, action: AppStoreAction): AppStore => {
  switch (action.type) {
    case 'set':
      return action.payload;

    case 'set-settings':
      return { ...state, settings: action.payload };

    case 'use-defaults':
      return defaultAppStore;

    default:
      throw new Error('Not implemented');
  }
};

export const AppStoreContext = createContext<{
  appStore: AppStore;
  dispatch: (action: AppStoreAction) => void;
}>({ appStore: defaultAppStore, dispatch: () => null });

export const useSettings = <T extends keyof AppSettings>(
  option: T
): AppSettings[T] => {
  const { appStore } = useContext(AppStoreContext);

  return appStore.settings[option];
};

const AppStoreProvider: React.FC = ({ children }) => {
  const [appStore, dispatch] = useReducer(reducer, defaultAppStore);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getAppStore()
      .then((store) => {
        const hydratedStore = hydrateUnsetValues({ ...store }, defaultAppStore);

        setLoaded(true);
        dispatch({
          type: 'set',
          payload: hydratedStore,
        });
      })
      .catch(() => {
        setLoaded(true);
        dispatch({ type: 'use-defaults' });
      });
  }, []);

  return (
    <>
      {loaded ? (
        <AppStoreContext.Provider value={{ appStore, dispatch }}>
          {children}
        </AppStoreContext.Provider>
      ) : null}
    </>
  );
};

export default AppStoreProvider;
