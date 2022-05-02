import React, { createContext, useEffect, useReducer, useState } from 'react';
import { AppSettings, AppStore, getAppStore } from '../api/app-store/app-store';
import { defaultAppStore } from '../api/app-store/default-app-store';

export type AppStoreAction =
  | {
      type: 'set';
      payload: AppStore;
    }
  | { type: 'set-settings'; payload: AppSettings };

const reducer = (state: AppStore, action: AppStoreAction): AppStore => {
  switch (action.type) {
    case 'set':
      return action.payload;

    case 'set-settings':
      return { ...state, settings: action.payload };

    default:
      throw new Error('Not implemented');
  }
};

export const AppStoreContext = createContext<{
  appStore: AppStore;
  dispatch: (action: AppStoreAction) => void;
}>({ appStore: defaultAppStore, dispatch: () => null });

const AppStoreProvider: React.FC = ({ children }) => {
  const [appStore, dispatch] = useReducer(reducer, defaultAppStore);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getAppStore().then((store) => {
      setLoaded(true);
      dispatch({ type: 'set', payload: store });
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
