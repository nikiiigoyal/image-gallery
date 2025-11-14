import { createRoot } from 'react-dom/client'
import './App.css'
import { App } from './App'

// const pexel = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`
const images = [
  // Front
  { position: [0, 0, 1.5], rotation: [0, 0, 0], url: '/bayc1.avif' },
  // Back
  { position: [-0.8, 0, -0.6], rotation: [0, 0, 0], url: '/bayc2.png' },
  { position: [0.8, 0, -0.6], rotation: [0, 0, 0], url: '/bayc3.jpeg' },
  // Left
  { position: [-1.75, 0, 0.25], rotation: [0, Math.PI / 2.5, 0], url: '/bayc4.jpeg' },
  { position: [-2.15, 0, 1.5], rotation: [0, Math.PI / 2.5, 0], url: '/bayc5.avif' },
  { position: [-2, 0, 2.75], rotation: [0, Math.PI / 2.5, 0], url: '/bayc6.jpeg' },
  // Right
  { position: [1.75, 0, 0.25], rotation: [0, -Math.PI / 2.5, 0], url: '/bayc7.jpeg' },
  { position: [2.15, 0, 1.5], rotation: [0, -Math.PI / 2.5, 0], url: '/bayc8.webp' },
  { position: [2, 0, 2.75], rotation: [0, -Math.PI / 2.5, 0], url: '/bayc9.jpeg' }
]

createRoot(document.getElementById('root')).render(<App images={images} />)
