'use client'

import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useCursor, MeshReflectorMaterial, Image, Text, Environment, Html } from '@react-three/drei'
import { useRouter } from 'next/navigation'
import { easing } from 'maath'
import getUuid from 'uuid-by-string'

const GOLDENRATIO = 1.61803398874
const ITEMS_PER_PAGE = 9 // Number of frames to show per page

export const Scene = ({ images, activeId = null, basePath = '/gallery' }) => {
  const [page, setPage] = useState(0)
  const [selectedItem, setSelectedItem] = useState(null) // For the Modal
  
  // Pagination logic
  const totalPages = Math.ceil(images.length / ITEMS_PER_PAGE)
  const visibleImages = images.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE)

  const nextPage = () => setPage((p) => (p + 1) % totalPages)
  const prevPage = () => setPage((p) => (p - 1 + totalPages) % totalPages)

  return (
    <>
      {/* 3D Scene */}
      <Canvas dpr={[1, 1.5]} camera={{ fov: 70, position: [0, 2, 15] }}>
        <color attach="background" args={['#191920']} />
        <fog attach="fog" args={['#191920', 0, 15]} />
        <group position={[0, -0.5, 0]}>
          <Frames 
            images={visibleImages} 
            activeId={activeId} 
            basePath={basePath}
            onOpenDetails={setSelectedItem} 
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

      {/* UI OVERLAY (Pagination & Modal) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex flex-col justify-between p-8">
        
        {/* Pagination Controls */}
        <div className="pointer-events-auto flex justify-center gap-6 w-full absolute bottom-10 left-0 z-10">
          <button 
            onClick={prevPage} 
            className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-6 py-2 rounded-full border border-white/20 transition-all"
          >
            ← Previous
          </button>
          <span className="flex items-center text-white/50 font-mono text-sm">
            Page {page + 1} / {totalPages}
          </span>
          <button 
            onClick={nextPage} 
            className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-6 py-2 rounded-full border border-white/20 transition-all"
          >
            Next →
          </button>
        </div>

        {/* Details Modal */}
        {selectedItem && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm pointer-events-auto">
            <div className="bg-[#191920] border border-white/10 p-8 rounded-2xl max-w-4xl w-full flex gap-8 shadow-2xl relative">
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 text-white/50 hover:text-white w-8 h-8 flex items-center justify-center rounded-full bg-white/5"
              >
                ✕
              </button>
              
              {/* Image Side */}
              <div className="w-1/2 rounded-xl overflow-hidden bg-black h-96 relative">
                <img src={selectedItem.url} alt="NFT" className="w-full h-full object-cover" />
              </div>

              {/* Details Side */}
              <div className="w-1/2 flex flex-col justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    Abstract #{selectedItem.name.slice(0, 6)}
                  </h1>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="px-2 py-1 bg-orange-500/20 text-orange-500 text-xs font-bold rounded">RARE</span>
                    <span className="text-white/40 text-xs">Created by @ArtistName</span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-white/60">Current Price</span>
                      <span className="text-white font-mono font-bold">{(Math.random() * 5).toFixed(2)} ETH</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-white/60">Color Palette</span>
                      <div className="flex gap-1">
                        <div className="w-4 h-4 rounded-full bg-red-500"></div>
                        <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                        <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                      </div>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-white/60">Token ID</span>
                      <span className="text-white/40 font-mono text-xs">{selectedItem.name}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <button className="flex-1 bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors">
                    Place Bid
                  </button>
                  <button 
                    onClick={() => setSelectedItem(null)}
                    className="px-6 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-colors"
                  >
                    Close
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

function Frames({ images, activeId, basePath, onOpenDetails, q = new THREE.Quaternion(), p = new THREE.Vector3() }) {
  const ref = useRef()
  const clicked = useRef()
  const router = useRouter()

  useEffect(() => {
    // Find object by name from activeId
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
        // If clicking the same item, go back to base. If clicking new item, route to it.
        const target = clicked.current === e.object ? basePath : '/item/' + e.object.name
        router.push(target)
      }}
      onPointerMissed={() => router.push(basePath)}>
      {images.map((props) => (
        <Frame 
          key={props.url} 
          {...props} 
          activeId={activeId} 
          onOpenDetails={onOpenDetails}
        />
      ))}
    </group>
  )
}

function Frame({ url, c = new THREE.Color(), activeId, onOpenDetails, ...props }) {
  const image = useRef()
  const frame = useRef()
  const [hovered, hover] = useState(false)
  const [liked, setLiked] = useState(false) 
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
    // Instead of routing, we open the modal via the prop function
    onOpenDetails({ url, name, rnd })
  }
  
  const toggleLike = (e) => {
    e.stopPropagation()
    setLiked(!liked)
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

      {/* --- HOMEPAGE FAVORITE INDICATOR --- */}
      {liked && (
        <Text 
          anchorX="right" 
          anchorY="top" 
          position={[0.45, GOLDENRATIO - 0.05, 0.1]} 
          fontSize={0.1} 
          color="red"
        >
          ♥
        </Text>
      )}

      {/* --- ACTIVE STATE OVERLAY (Buttons at Bottom) --- */}
      {isActive && (
        <Html
          // Adjusted position to be at the bottom of the frame (y ~ 0.1)
          position={[0, 0.15, 0.2]} 
          center
          transform 
          occlude 
          distanceFactor={1.2} 
          style={{ pointerEvents: 'auto' }}
        >
          <div className="flex gap-3 p-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10 shadow-lg">
            
            {/* Details Button */}
            <button
              onClick={handleDetailsClick}
              className="px-5 py-2 bg-white text-black rounded-full text-xs font-bold hover:bg-gray-200 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <span>See Details</span>
            </button>

            {/* Favorite Button */}
            <button
              onClick={toggleLike}
              className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300
                ${liked 
                  ? 'bg-red-500 border-red-500 text-white' 
                  : 'bg-transparent border-white/30 text-white hover:bg-white/10'
                }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </button>

          </div>
        </Html>
      )}
    </group>
  )
}
