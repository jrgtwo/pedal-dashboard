import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import TanstackProvider from './lib/tanstackInit'

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <TanstackProvider>
        <App />
      </TanstackProvider>
    </StrictMode>,
  );
} else {
  console.error('Root element not found');
}
