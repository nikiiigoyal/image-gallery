import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './Scene.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
