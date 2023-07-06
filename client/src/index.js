import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './Components/Main';
import { ToastProvider } from 'react-toast-notifications';
import { AuthProvider } from "./Providers";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastProvider autoDismiss={true} autoDismissTimeout={5000} placement={'top-left'}>
      <AuthProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Main />
          </PersistGate>
        </Provider>
      </AuthProvider>
    </ToastProvider>
  </React.StrictMode>
);
