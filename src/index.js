import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'antd/dist/antd.css';
import { ProvideAuth } from './providers/ProvideAuth';
import { ProvideBookmark } from './providers/ProvideBookmark';

ReactDOM.render(
  <React.StrictMode>
    <ProvideAuth>
      <ProvideBookmark>
        <App />
      </ProvideBookmark>
    </ProvideAuth>
  </React.StrictMode>,
  document.getElementById('root')
);
