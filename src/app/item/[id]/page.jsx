import { Scene } from '../../../components/Scene'

// We need the same images array here so the 3D scene knows what to render
const images = [
  { position: [0, 0, 1.5], rotation: [0, 0, 0], url: "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" },
  { position: [-0.8, 0, -0.6], rotation: [0, 0, 0], url: "https://images.pexels.com/photos/416430/pexels-photo-416430.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" },
  { position: [0.8, 0, -0.6], rotation: [0, 0, 0], url: "https://images.pexels.com/photos/310452/pexels-photo-310452.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" },
  { position: [-1.75, 0, 0.25], rotation: [0, Math.PI / 2.5, 0], url: "https://images.pexels.com/photos/327482/pexels-photo-327482.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" },
  { position: [-2.15, 0, 1.5], rotation: [0, Math.PI / 2.5, 0], url: "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" },
  { position: [-2, 0, 2.75], rotation: [0, Math.PI / 2.5, 0], url: "https://images.pexels.com/photos/358574/pexels-photo-358574.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" },
  { position: [1.75, 0, 0.25], rotation: [0, -Math.PI / 2.5, 0], url: "https://images.pexels.com/photos/227675/pexels-photo-227675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" },
  { position: [2.15, 0, 1.5], rotation: [0, -Math.PI / 2.5, 0], url: "https://images.pexels.com/photos/911738/pexels-photo-911738.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" },
  { position: [2, 0, 2.75], rotation: [0, -Math.PI / 2.5, 0], url: "https://images.pexels.com/photos/1738986/pexels-photo-1738986.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" },
]

// Required for static exports, safe to return empty array for dynamic dev mode
export async function generateStaticParams() {
  return [] 
}

export default async function ItemPage({ params }) {
  // In Next.js 15, params is a promise you must await
  const { id } = await params 
  
  return (
    <div className="w-full h-full">
      {/* We pass basePath="/gallery" so clicking "back" goes to gallery, not home */}
      <Scene images={images} activeId={id} basePath="/gallery" />
    </div>
  )
}
