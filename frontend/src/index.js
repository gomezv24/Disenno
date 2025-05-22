import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './context/UserContext'; // ✅ AÑADIDO

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider> {/* ✅ ENVUELVE APP */}
      <App />
    </UserProvider>
  </React.StrictMode>
);

reportWebVitals();

