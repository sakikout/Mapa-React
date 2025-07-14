import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'styled-components';
import './index.css'
import App from './App.tsx'

const theme = {
  colors: {
    primary: '#4285F4',
    secondary: '#34A853',
    error: '#EA4335',
    text: '#333333',
    background: '#f5f5f5',
  },
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
