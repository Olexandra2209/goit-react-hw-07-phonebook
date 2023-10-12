import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './components/App';
import './index.css';

const root = document.getElementById('root');
const reactRoot = ReactDOM.createRoot(root);

reactRoot.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
