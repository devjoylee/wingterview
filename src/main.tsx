import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

if (import.meta.env.DEV && import.meta.env.VITE_USE_MOCK_DATA === 'true') {
  const { worker } = await import('./mocks/browser')
  worker.start()
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
