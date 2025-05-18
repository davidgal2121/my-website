import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.tsx';
import { AuthProvider } from './context/AuthContext';
import { FinanceProvider } from './context/FinanceContext';
import { JobProvider } from './context/JobContext';
import { NotificationProvider } from './context/NotificationContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <FinanceProvider>
          <JobProvider>
            <NotificationProvider>
              <App />
            </NotificationProvider>
          </JobProvider>
        </FinanceProvider>
      </AuthProvider>
    </Router>
  </StrictMode>
);