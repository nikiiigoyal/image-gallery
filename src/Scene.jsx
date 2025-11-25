'use client'

import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useCursor, MeshReflectorMaterial, Image, Text, Environment, Html } from '@react-three/drei'
import { useRouter } from 'next/navigation'
import { easing } from 'maath'
import getUuid from 'uuid-by-string'

const GOLDENRATIO = 1.61803398874

export const Scene = ({ images, activeId = null , basePath = '/gallery' }) => (
  <Canvas dpr={[1, 1.5]} camera={{ fov: 70, position: [0, 2, 15] }}>
    <color attach="background" args={['#191920']} />
    <fog attach="fog" args={['#191920', 0, 15]} />
    <group position={[0, -0.5, 0]}>
      <Frames images={images} activeId={activeId} />
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
)

function Frames({ images, activeId, basePath, q = new THREE.Quaternion(), p = new THREE.Vector3() }) {
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
        router.push(target)
      }}
      onPointerMissed={() => router.push('/')}>
      {images.map((props) => <Frame key={props.url} {...props} activeId={activeId} />)}
    </group>
  )
}

function Frame({ url, c = new THREE.Color(), activeId, ...props }) {
  const image = useRef()
  const frame = useRef()
  const router = useRouter()
  const [hovered, hover] = useState(false)
  const [liked, setLiked] = useState(false) 
  const [rnd] = useState(() => Math.random())
  const name = getUuid(url)
  const isActive = activeId === name
  
  useCursor(hovered)
  useFrame((state, dt) => {
    image.current.material.zoom = 1.2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 4
    easing.damp3(image.current.scale, [0.80 * (!isActive && hovered ? 0.85 : 1), 0.9 * (!isActive && hovered ? 0.905 : 1), 1], 0.1, dt)
    easing.dampC(frame.current.material.color, hovered ? 'orange' : 'white', 0.1, dt)
  })

  const handleDetails = (e) => {
    e.stopPropagation()
    router.push(`/item/${name}`)
  }
  
  const toggleLike = (e) => {
    e.stopPropagation()
    setLiked(!liked)
  }

  const handleDownload = (e) => {
    e.stopPropagation()
    window.open(url, '_blank')
  }n

  const handleShare = (e) => {
    e.stopPropagation()
    alert(`Sharing: ${name}`)
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

      <Text maxWidth={0.1} 
      anchorX="left" 
      anchorY="top" 
      position={[0.55, GOLDENRATIO, 0]} 
      fontSize={0.025} 
      color={hovered ? 'orange' : isActive ? '#00fff00' : 'white'}
      >
         {isActive ? '★ ' : hovered ? '→ ' : ''}{name.split('-').join(' ')}
      </Text>

      {/* Hover text when NOT active */}
      {hovered && !isActive && (
        <Text maxWidth={0.8}
          anchorX="left"
          anchorY="top"
          position={[0.55, GOLDENRATIO - 0.1, 0]}
          fontSize={0.02}
          color="#aaaaaa">
          Click to zoom
        </Text>
      )}
    
      {/* Active State UI - MOVED TO RIGHT SIDE */}
      {isActive && (
        <Html
          // x=1.1 puts it to the right of the image
          // y=GOLDENRATIO/2 keeps it vertically centered with the image
          position={[1.1, GOLDENRATIO / 2, 0]} 
          center
          distanceFactor={1} // Adjusted for better visibility
          style={{ pointerEvents: 'auto' }}>
          
          <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-black/80 border border-white/10 backdrop-blur-md shadow-2xl min-w-[120px]">
            
            <div className="text-white text-xs font-medium mb-1 tracking-widest text-center">ACTIONS</div>

            <button
              onClick={handleDetails}
              className="w-full px-4 py-2 bg-white text-black rounded-lg text-sm font-bold hover:bg-gray-200 transition-colors cursor-pointer"
            >
              Details
            </button>

            <div className="flex gap-2 w-full">
              <button
                onClick={toggleLike}
                className={`flex-1 flex justify-center items-center p-2 rounded-lg border transition-all duration-300 cursor-pointer ${
                  liked 
                    ? 'bg-red-500/20 border-red-500 text-red-500' 
                    : 'bg-transparent border-white/20 text-white hover:bg-white/10'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </button>

              <button
                onClick={handleShare}
                className="flex-1 flex justify-center items-center p-2 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-all duration-300 cursor-pointer"
              >
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                  <polyline points="16 6 12 2 8 6" />
                  <line x1="12" y1="2" x2="12" y2="15" />
                </svg>
              </button>
            </div>
          </div>
        </Html>
      )}
    </group>
  )
}
