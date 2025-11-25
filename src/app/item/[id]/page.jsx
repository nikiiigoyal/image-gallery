import { Scene } from '../../../Scene'
import Link from 'next/link'

// We need the same images array here so the 3D scene knows what to render
const images = [
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

// Required for static exports, safe to return empty array for dynamic dev mode
export async function generateStaticParams() {
  return [] 
}

export default async function ItemPage({ params }) {
  // In Next.js 15, params is a promise you must await
  const { id } = await params 
  
  return (
    <div className="w-full h-full relative">
      {/* Back Button Overlay */}
      <div className="absolute top-4 left-4 z-50">
        <Link 
          href="/gallery" 
          className="px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-colors"
        >
          ← Back to Gallery
        </Link>
      </div>
      {/* We pass basePath="/gallery" so clicking "back" goes to gallery, not home */}
      <Scene images={images} activeId={id} basePath="/gallery" />
    </div>
  )
}
