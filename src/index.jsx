import { createRoot } from 'react-dom/client'
import { Suspense, useEffect, useState } from 'react'
import './App.css'
import { Scene } from './Scene'

// If you put data.json in src, import it directly:
// import images from './data.json' 

function App() {
  // If fetching from public folder:
  const [images, setImages] = useState([])

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => setImages(data))
  }, [])

  if (!images.length) return null // or a loading spinner

  return (
    <Suspense fallback={null}>
      <Scene images={images} />
    </Suspense>
  )
}

createRoot(document.getElementById('root')).render(<App />)
