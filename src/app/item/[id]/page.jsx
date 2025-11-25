import { Scene } from '../../../Scene'
import Link from 'next/link'
import getUuid from 'uuid-by-string' // Import this to generate matching IDs

// 1. Import your data so generateStaticParams can read it
// Ensure this path points to your actual data.json file
import images from '../../../data.json' 

export async function generateStaticParams() {
  // 2. Map over your images to generate a route for EVERY item
  // This tells Next.js: "Build a page for /item/uuid-1, /item/uuid-2, etc."
  return images.map((img) => ({
    id: getUuid(img.url),
  }))
}

export default async function ItemPage({ params }) {
  // In Next.js 15+, params is a promise
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
      {/* 3. Pass the imported images to the Scene */}
      <Scene images={images} activeId={id} basePath="/gallery" />
    </div>
  )
}
