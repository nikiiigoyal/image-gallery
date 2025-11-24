import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center bg-[#191920] text-white">
      <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter">
        Welcome to <span className="text-orange-500">RaveNhouse</span>
      </h1>
      
      <p className="text-xl text-gray-400 mb-12 max-w-lg">
        Experience art in a new dimension. Explore our curated collection in an immersive 3D environment.
      </p>

      <Link 
        href="/gallery" 
        className="px-8 py-4 bg-orange-500 hover:bg-orange-600 transition-colors rounded-full text-lg font-bold text-black"
      >
        View Our Premium Gallery
      </Link>
    </div>
  )
}
