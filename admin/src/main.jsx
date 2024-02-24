import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import SidebarProvider from './contexts/SidebarContext';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <SidebarProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </SidebarProvider>
);
