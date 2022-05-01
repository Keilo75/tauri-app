import React from 'react';
import ReactDOM from 'react-dom';
import App from './views/App';

import './styles/globals.scss';
import AppStoreProvider from './store/AppStore';

ReactDOM.render(
  <React.StrictMode>
    <AppStoreProvider>
      <App />
    </AppStoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
