import React, { createContext, useEffect, useReducer, useState } from 'react';
import { AppStore, getAppStore } from '../api/app-store/app-store';
import { defaultAppStore } from '../api/app-store/default-app-store';

export type AppStoreAction = {
  type: 'set';
  payload: AppStore;
};
const reducer = (state: AppStore, action: AppStoreAction): AppStore => {
  return state;
};

const AppStoreContext = createContext<
  { appStore: AppStore; dispatch: (action: AppStoreAction) => void } | undefined
>(undefined);

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
