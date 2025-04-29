import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './components/theme/theme.css'
import App from './App.tsx'
import { ThemeProvider } from './components/theme/themeProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
    <App />
    </ThemeProvider>
  </StrictMode>,
)
