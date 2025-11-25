'use client'

import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useCursor, MeshReflectorMaterial, Image, Text, Environment, Html } from '@react-three/drei'
import { useRouter } from 'next/navigation'
import { easing } from 'maath'
import getUuid from 'uuid-by-string'

const GOLDENRATIO = 1.61803398874
const ITEMS_PER_PAGE = 9

export const Scene = ({ images, activeId = null, basePath = '/gallery' }) => {
  const [page, setPage] = useState(0)
  const [selectedItem, setSelectedItem] = useState(null) 
  
  // IMPORTANT: Using a functional update correctly ensures we don't lose previous state
  const [favorites, setFavorites] = useState(new Set()) 
  const [showFavSidebar, setShowFavSidebar] = useState(false)
  
  const totalPages = Math.ceil(images.length / ITEMS_PER_PAGE)
  const visibleImages = images.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE)

  // Fixed Toggle Logic
  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const newFavs = new Set(prev) // Create a copy
      if (newFavs.has(id)) {
        newFavs.delete(id) // Remove if exists
      } else {
        newFavs.add(id) // Add if new
      }
      return newFavs // Return new Set reference
    })
  }

  const handleColorClick = (color) => {
    navigator.clipboard.writeText(color)
    alert(`Color ${color} copied to clipboard!`)
  }

  return (
    <>
      <Canvas dpr={[1, 1.5]} camera={{ fov: 70, position: [0, 2, 15] }}>
        <color attach="background" args={['#191920']} />
        <fog attach="fog" args={['#191920', 0, 15]} />
        <group position={[0, -0.5, 0]}>
          <Frames 
            images={visibleImages} 
            activeId={activeId} 
            basePath={basePath}
            onOpenDetails={setSelectedItem}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[50, 50]} />
            <MeshReflectorMaterial
              blur={[300, 100]}
              resolution={2048}
              mixBlur={1}
              mixStrength={80}
              roughness={1}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color="#050505"
              metalness={0.5}
            />
          </mesh>
        </group>
        <Environment preset="city" />
      </Canvas>

      <div className="absolute inset-0 pointer-events-none">
        
        {/* Global Favorites Button */}
        <div className="absolute top-8 right-8 pointer-events-auto z-20">
          <button 
            onClick={() => setShowFavSidebar(true)}
            className="relative group bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/20 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={favorites.size > 0 ? "red" : "none"} stroke="white" strokeWidth="2" className="w-6 h-6 transition-colors">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
            {favorites.size > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {favorites.size}
              </span>
            )}
          </button>
        </div>

        {/* Vertical Pagination */}
        <div className="absolute right-8 bottom-1 -translate-y-1/2 flex flex-col gap-4 pointer-events-auto z-10">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setPage(index)}
              className={`w-10 h-10 rounded-full border flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                page === index 
                  ? 'bg-white text-black border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.5)]' 
                  : 'bg-black/40 text-white/50 border-white/20 hover:bg-white/20 hover:text-white'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Favorites Sidebar */}
        {showFavSidebar && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 pointer-events-auto flex justify-end">
            <div className="w-96 h-full bg-[#191920] border-l border-white/10 p-6 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-white">Your Favorites</h2>
                <button 
                  onClick={() => setShowFavSidebar(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-white/50 hover:text-white"
                >✕</button>
              </div>
              
              <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                {favorites.size === 0 ? (
                  <div className="text-white/30 text-center mt-20">No favorites yet.</div>
                ) : (
                  // We need to look through ALL images, not just visible ones
                  images.filter(img => favorites.has(getUuid(img.url))).map((img) => {
                    const id = getUuid(img.url)
                    return (
                      <div key={id} className="flex gap-4 items-center bg-white/5 p-3 rounded-xl border border-white/5">
                        <img src={img.url} className="w-16 h-16 object-cover rounded-lg" alt="" />
                        <div className="flex-1">
                          <div className="text-white font-medium text-sm truncate">NFT #{id.slice(0,6)}</div>
                          <button 
                            onClick={() => toggleFavorite(id)}
                            className="text-xs text-red-400 hover:text-red-300 mt-1"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          </div>
        )}

        {/* Details Modal */}
        {selectedItem && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md pointer-events-auto p-4">
            <div className="bg-[#191920] border border-white/10 p-8 rounded-3xl max-w-5xl w-full flex flex-col md:flex-row gap-8 shadow-2xl relative animate-in fade-in zoom-in duration-300">
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 text-white/50 hover:text-white w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                ✕
              </button>
              
              <div className="w-full md:w-1/2 rounded-2xl overflow-hidden bg-black aspect-square md:aspect-auto relative shadow-lg group">
                <img src={selectedItem.url} alt="NFT" className="w-full h-full object-cover" />
              </div>

              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <div>
                  <h1 className="text-4xl font-black text-white mb-2 tracking-tight">
                    Abstract #{selectedItem.name.slice(0, 6)}
                  </h1>
                  <div className="flex items-center gap-3 mb-8">
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-bold tracking-wider rounded-full border border-purple-500/20">ETH-721</span>
                    <span className="text-white/40 text-sm">Created by @DigitalArtist</span>
                  </div>

                  <div className="space-y-6 mb-8">
                    <div className="flex justify-between items-center border-b border-white/5 pb-4">
                      <span className="text-white/60 font-medium">Current Price</span>
                      <span className="text-white font-mono text-2xl font-bold">{(Math.random() * 5 + 0.5).toFixed(2)} ETH</span>
                    </div>
                    
                    <div className="flex justify-between items-center border-b border-white/5 pb-4">
                      <span className="text-white/60 font-medium">Color Palette <span className="text-[10px] text-white/30 ml-1">(Click to copy)</span></span>
                      <div className="flex gap-2">
                        {['#FF5733', '#33FF57', '#3357FF'].map(color => (
                          <button 
                            key={color}
                            onClick={() => handleColorClick(color)}
                            className="w-6 h-6 rounded-full border border-white/20 hover:scale-110 transition-transform focus:ring-2 ring-white"
                            style={{ backgroundColor: color }}
                            title={`Copy ${color}`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center border-b border-white/5 pb-4">
                      <span className="text-white/60 font-medium">Token ID</span>
                      <span className="text-white/40 font-mono text-xs tracking-wide bg-black/30 px-2 py-1 rounded">{selectedItem.name}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors shadow-lg shadow-white/5">
                    Place Bid
                  </button>
                  <button 
                    onClick={() => toggleFavorite(selectedItem.name)}
                    className={`px-8 rounded-xl border-2 font-bold transition-colors flex items-center justify-center gap-2
                      ${favorites.has(selectedItem.name) 
                        ? 'border-red-500 bg-red-500/10 text-red-500' 
                        : 'border-white/20 text-white hover:bg-white/5'}`}
                  >
                    {favorites.has(selectedItem.name) ? 'Liked ♥' : 'Like ♡'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

function Frames({ images, activeId, basePath, onOpenDetails, favorites, onToggleFavorite, q = new THREE.Quaternion(), p = new THREE.Vector3() }) {
  const ref = useRef()
  const clicked = useRef()
  const router = useRouter()

  useEffect(() => {
    clicked.current = ref.current.getObjectByName(activeId)
    if (clicked.current) {
      clicked.current.parent.updateWorldMatrix(true, true)
      clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO / 2, 1.25))
      clicked.current.parent.getWorldQuaternion(q)
    } else {
      p.set(0, 0, 5.5)
      q.identity()
    }
  })

  useFrame((state, dt) => {
    easing.damp3(state.camera.position, p, 0.4, dt)
    easing.dampQ(state.camera.quaternion, q, 0.4, dt)
  })

  return (
    <group
      ref={ref}
      onClick={(e) => {
        e.stopPropagation()
        const target = clicked.current === e.object ? basePath : '/item/' + e.object.name
        if(clicked.current === e.object) {
            router.push(basePath)
        } else {
            router.push('/item/' + e.object.name)
        }
      }}
      onPointerMissed={() => router.push(basePath)}>
      {images.map((props) => {
        const id = getUuid(props.url)
        return (
          <Frame 
            key={props.url} 
            {...props} 
            activeId={activeId} 
            onOpenDetails={onOpenDetails}
            isLiked={favorites.has(id)}
            toggleLike={() => onToggleFavorite(id)}
          />
        )
      })}
    </group>
  )
}

function Frame({ url, c = new THREE.Color(), activeId, onOpenDetails, isLiked, toggleLike, ...props }) {
  const image = useRef()
  const frame = useRef()
  const [hovered, hover] = useState(false)
  const [rnd] = useState(() => Math.random())
  const name = getUuid(url)
  const isActive = activeId === name
  
  useCursor(hovered)
  useFrame((state, dt) => {
    image.current.material.zoom = 1.2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 4
    easing.damp3(image.current.scale, [0.85 * (!isActive && hovered ? 0.85 : 1), 0.9 * (!isActive && hovered ? 0.905 : 1), 1], 0.1, dt)
    easing.dampC(frame.current.material.color, hovered ? 'orange' : 'white', 0.1, dt)
  })

  const handleDetailsClick = (e) => {
    e.stopPropagation() 
    onOpenDetails({ url, name, rnd })
  }
  
  const handleLikeClick = (e) => {
    e.stopPropagation() 
    toggleLike()
  }

  return (
    <group {...props}>
      <mesh
        name={name}
        onPointerOver={(e) => (e.stopPropagation(), hover(true))}
        onPointerOut={() => hover(false)}
        scale={[1, GOLDENRATIO, 0.05]}
        position={[0, GOLDENRATIO / 2, 0]}>
        <boxGeometry />
        <meshStandardMaterial color="#151515" metalness={0.5} roughness={0.5} envMapIntensity={2} />
        <mesh ref={frame} raycast={() => null} scale={[0.9, 0.93, 0.9]} position={[0, 0, 0.2]}>
          <boxGeometry />
          <meshBasicMaterial toneMapped={false} fog={false} />
        </mesh>
        <Image raycast={() => null} ref={image} position={[0, 0, 0.7]} url={url} />
      </mesh>

      {/* <Text maxWidth={0.1} 
        anchorX="left" 
        anchorY="top" 
        position={[0.55, GOLDENRATIO, 0]} 
        fontSize={0.025} 
        color={hovered ? 'orange' : isActive ? '#00fff00' : 'white'}
      >
         {name.split('-').join(' ')}
      </Text> */}

      {isLiked && (
        <Text 
          anchorX="right" 
          anchorY="top" 
          position={[0.45, GOLDENRATIO - 0.05, 0.1]} 
          fontSize={0.1} 
          color="#ef4444"
        >
          ♥
        </Text>
      )}

      {isActive && (
        <Html
          position={[0, 0.15, 0.2]} 
          center
          transform 
          occlude 
          distanceFactor={1.2} 
          style={{ pointerEvents: 'auto' }}
        >
          <div className="flex gap-3 p-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
            <button
              onClick={handleDetailsClick}
              className="px-5 py-2 bg-white text-black rounded-full text-xs font-bold hover:bg-gray-200 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <span>See Details</span>
            </button>

            <button
              onClick={handleLikeClick}
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300
                ${isLiked 
                  ? 'bg-red-500 border-red-500 text-white' 
                  : 'bg-transparent border-white/30 text-white hover:bg-white/10 hover:border-white'
                }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </button>
          </div>
        </Html>
      )}
    </group>
  )
}
