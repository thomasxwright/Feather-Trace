import React from 'react';
import { AuthProvider } from './auth/useAuth';
import { ScreenModeProvider } from './auth/useScreenMode';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Router>
      <ScreenModeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ScreenModeProvider>
    </Router>
  // </React.StrictMode>
)