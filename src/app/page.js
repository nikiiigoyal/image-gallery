'use client'

import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useCursor, MeshReflectorMaterial, Image, Text, Environment, Html } from '@react-three/drei'
import { useRoute, useLocation } from 'wouter'
import { easing } from 'maath'
import getUuid from 'uuid-by-string'

const GOLDENRATIO = 1.61803398874

export const App = ({ images }) => (
  <Canvas dpr={[1, 1.5]} camera={{ fov: 70, position: [0, 2, 15] }}>
    <color attach="background" args={['#191920']} />
    <fog attach="fog" args={['#191920', 0, 15]} />
    <group position={[0, -0.5, 0]}>
      <Frames images={images} />
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

function Frames({ images, q = new THREE.Quaternion(), p = new THREE.Vector3() }) {
  const ref = useRef()
  const clicked = useRef()
  const [, params] = useRoute('/item/:id')
  const [, setLocation] = useLocation()
  useEffect(() => {
    clicked.current = ref.current.getObjectByName(params?.id)
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
      onClick={(e) => (e.stopPropagation(), setLocation(clicked.current === e.object ? '/' : '/item/' + e.object.name))}
      onPointerMissed={() => setLocation('/')}>
      {images.map((props) => <Frame key={props.url} {...props} /> /* prettier-ignore */)}
    </group>
  )
}

function Frame({ url, c = new THREE.Color(), ...props }) {
  const image = useRef()
  const frame = useRef()
  const [, params] = useRoute('/item/:id')
  const [hovered, hover] = useState(false)
  const [rnd] = useState(() => Math.random())
  const name = getUuid(url)
  const isActive = params?.id === name
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
    {/* Active state buttons using HTML */}
      {isActive && (
        <Html
          position={[0, -0.3, 0]}
          center
          distanceFactor={1.5}
          style={{
            pointerEvents: 'auto',
          }}>
          <div style={{
            display: 'flex',
            gap: '8px',
            background: 'rgba(0, 0, 0, 0.8)',
            padding: '10px 20px',
            borderRadius: '8px',
            border: '1px solid rgba(255, 165, 0, 0.5)',
          }}>
            <button
              onClick={handleDownload}
              style={{
                padding: '8px 16px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '4px',
                color: 'white',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
              }}>
              View Full
            </button>
            <button
              onClick={handleShare}
              style={{
                padding: '8px 16px',
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                border: 'none',
                borderRadius: '4px',
                color: 'white',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
              }}>
              Share
            </button>
          </div>
        </Html>
      )}
      
      {/* Hover state button using HTML */}
      {hovered && !isActive && (
        <Html
          position={[0, -0.3, 0]}
          center
          distanceFactor={1.5}
          style={{
            pointerEvents: 'none',
          }}>
          <div style={{
            padding: '6px 12px',
            background: 'rgba(255, 165, 0, 0.2)',
            borderRadius: '4px',
            border: '1px solid rgba(255, 165, 0, 0.5)',
            color: 'orange',
            fontSize: '12px',
            fontWeight: 'bold',
          }}>
            CLICK TO VIEW
          </div>
        </Html>
      )}

    </group>
  )
}
