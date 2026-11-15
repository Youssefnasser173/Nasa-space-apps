import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { HealthProvider } from './contexts/HealthContext';
import { AnatomyProvider } from './contexts/AnatomyContext';
import { AppRoutes } from './routes/AppRoutes';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <HealthProvider>
          <AnatomyProvider>
            <AppRoutes />
          </AnatomyProvider>
        </HealthProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
