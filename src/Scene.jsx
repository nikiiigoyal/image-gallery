'use client'

import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useCursor, MeshReflectorMaterial, Image, Text, Environment, Html } from '@react-three/drei'
import { useRouter } from 'next/navigation' // Replaces useLocation
import { easing } from 'maath'
import getUuid from 'uuid-by-string'

const GOLDENRATIO = 1.61803398874

export const Scene = ({ images, activeId = null }) => (
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

function Frames({ images, activeId, q = new THREE.Quaternion(), p = new THREE.Vector3() }) {
  const ref = useRef()
  const clicked = useRef()
  const router = useRouter()

  useEffect(() => {
    // Find object by the activeId passed from Next.js Page params
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
        // Navigate using Next.js router
        const target = clicked.current === e.object ? '/' : '/item/' + e.object.name
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
  const [hovered, hover] = useState(false)
  const [rnd] = useState(() => Math.random())
  const name = getUuid(url)
  const isActive = activeId === name
  
  useCursor(hovered)
  useFrame((state, dt) => {
    image.current.material.zoom = 1.2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 4
    easing.damp3(image.current.scale, [0.80 * (!isActive && hovered ? 0.85 : 1), 0.9 * (!isActive && hovered ? 0.905 : 1), 1], 0.1, dt)
    easing.dampC(frame.current.material.color, hovered ? 'orange' : 'white', 0.1, dt)
  })

  const handleDownload = (e) => {
    e.stopPropagation()
    window.open(url, '_blank')
  }
  
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

      {/* hover description */}
      {hovered && !isActive && (
        <Text maxWidth={0.8}
          anchorX="left"
          anchorY="top"
          position={[0.55, GOLDENRATIO - 0.1, 0]}
          fontSize={0.02}
          color="#aaaaaa">
          Click to view details
          </Text>
      )}
    
      {isActive && (
        <Html
          position={[0, -0.3, 0]}
          center
          distanceFactor={1.5}
          style={{ pointerEvents: 'auto' }}>
          <div className="flex gap-2 bg-black/80 p-4 rounded-lg border border-orange-500/50">
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded text-white text-sm font-bold cursor-pointer border-none">
              View Full
            </button>
            <button
              onClick={handleShare}
              className="px-4 py-2 bg-gradient-to-br from-[#f093fb] to-[#f5576c] rounded text-white text-sm font-bold cursor-pointer border-none">
              Share
            </button>
          </div>
        </Html>
      )}
      
      {hovered && !isActive && (
        <Html
          position={[0, -0.3, 0]}
          center
          distanceFactor={1.5}
          style={{ pointerEvents: 'none' }}>
          <div className="px-3 py-1.5 bg-[rgba(255,165,0,0.2)] rounded border border-orange-500/50 text-orange-500 text-xs font-bold">
            CLICK TO VIEW
          </div>
        </Html>
      )}
    </group>
  )
}
