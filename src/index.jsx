import { createRoot } from 'react-dom/client'
import './App.css'
import { App } from './App'


const images = [
  // Front
  { position: [0, 0, 1.5], rotation: [0, 0, 0], url: '/bayc1.avif' },
  // Back
  { position: [-0.8, 0, -0.6], rotation: [0, 0, 0], url: '/bayc2.avif' },
  { position: [0.8, 0, -0.6], rotation: [0, 0, 0], url: '/bayc3.avif' },
  // Left
  { position: [-1.75, 0, 0.25], rotation: [0, Math.PI / 2.5, 0], url: '/bayc4.avif' },
  { position: [-2.15, 0, 1.5], rotation: [0, Math.PI / 2.5, 0], url: '/bayc5.png' },
  { position: [-2, 0, 2.75], rotation: [0, Math.PI / 2.5, 0], url: '/bayc6.avif' },
  // Right
  { position: [1.75, 0, 0.25], rotation: [0, -Math.PI / 2.5, 0], url: '/bayc7.avif' },
  { position: [2.15, 0, 1.5], rotation: [0, -Math.PI / 2.5, 0], url: '/bayc8.avif' },
  { position: [2, 0, 2.75], rotation: [0, -Math.PI / 2.5, 0], url: '/bayc9.avif' }
]

createRoot(document.getElementById('root')).render(<App images={images} />)
