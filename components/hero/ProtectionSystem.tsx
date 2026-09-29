'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

type ProtectionSystemProps = {
  quality: 'high' | 'medium' | 'low'
  introProgress: React.MutableRefObject<number>
  mouse: React.MutableRefObject<{ x: number; y: number }>
}

/**
 * National digital protection seal — geometric constellation, not a stock shield.
 * Hex lattice + radial integrity spokes + core node cluster, integrated into Ethiopia.
 */
export function ProtectionSystem({ quality, introProgress, mouse }: ProtectionSystemProps) {
  const sealRef = useRef<THREE.Group>(null)
  const ringRef = useRef<THREE.Group>(null)
  const foreRef = useRef<THREE.Group>(null)

  const spokeCount = quality === 'low' ? 6 : 8

  const constellation = useMemo(() => {
    const pts = new Float32Array(13 * 3)
    // Core
    pts[0] = 0
    pts[1] = 0.52
    pts[2] = 0
    // Inner ring of 6
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 - Math.PI / 2
      pts[(i + 1) * 3] = Math.cos(a) * 0.22
      pts[(i + 1) * 3 + 1] = 0.52
      pts[(i + 1) * 3 + 2] = Math.sin(a) * 0.22
    }
    // Outer hex vertices
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2
      pts[(i + 7) * 3] = Math.cos(a) * 0.42
      pts[(i + 7) * 3 + 1] = 0.52
      pts[(i + 7) * 3 + 2] = Math.sin(a) * 0.42
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pts, 3))
    return g
  }, [])

  const sealLinks = useMemo(() => {
    const lines: number[] = []
    // Hub to inner
    for (let i = 1; i <= 6; i++) {
      lines.push(0, 0.52, 0)
      const a = ((i - 1) / 6) * Math.PI * 2 - Math.PI / 2
      lines.push(Math.cos(a) * 0.22, 0.52, Math.sin(a) * 0.22)
    }
    // Inner ring
    for (let i = 0; i < 6; i++) {
      const a0 = (i / 6) * Math.PI * 2 - Math.PI / 2
      const a1 = ((i + 1) / 6) * Math.PI * 2 - Math.PI / 2
      lines.push(Math.cos(a0) * 0.22, 0.52, Math.sin(a0) * 0.22)
      lines.push(Math.cos(a1) * 0.22, 0.52, Math.sin(a1) * 0.22)
    }
    // Outer hex
    for (let i = 0; i < 6; i++) {
      const a0 = (i / 6) * Math.PI * 2
      const a1 = ((i + 1) / 6) * Math.PI * 2
      lines.push(Math.cos(a0) * 0.42, 0.52, Math.sin(a0) * 0.42)
      lines.push(Math.cos(a1) * 0.42, 0.52, Math.sin(a1) * 0.42)
    }
    // Inner to outer spokes
    for (let i = 0; i < 6; i++) {
      const aIn = (i / 6) * Math.PI * 2 - Math.PI / 2
      const aOut = (i / 6) * Math.PI * 2
      lines.push(Math.cos(aIn) * 0.22, 0.52, Math.sin(aIn) * 0.22)
      lines.push(Math.cos(aOut) * 0.42, 0.52, Math.sin(aOut) * 0.42)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(lines), 3))
    return g
  }, [])

  const foreParticles = useMemo(() => {
    const n = quality === 'high' ? 36 : quality === 'medium' ? 20 : 8
    const pos = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2
      const r = 1.7 + (i % 4) * 0.12
      pos[i * 3] = Math.cos(a) * r
      pos[i * 3 + 1] = ((i % 5) - 2) * 0.1
      pos[i * 3 + 2] = Math.sin(a) * r * 0.5 + 1.2
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return g
  }, [quality])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const p = introProgress.current
    const activate = THREE.MathUtils.smoothstep(p, 0.5, 0.95)

    if (sealRef.current) {
      sealRef.current.scale.setScalar(0.75 + activate * 0.25)
      sealRef.current.visible = p > 0.35
      // Very slow integrity rotation
      sealRef.current.rotation.y = t * 0.06 * activate
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.04
      ringRef.current.visible = p > 0.4
    }

    if (foreRef.current) {
      foreRef.current.position.x = mouse.current.x * 0.25
      foreRef.current.position.y = mouse.current.y * 0.15
      foreRef.current.position.z = 0.12
    }
  })

  return (
    <group position={[0, 0, 0]}>
      {/* Protection seal centered on landmass */}
      <group ref={sealRef}>
        <lineSegments geometry={sealLinks}>
          <lineBasicMaterial color="#a5f3fc" transparent opacity={0.55} />
        </lineSegments>
        <points geometry={constellation}>
          <pointsMaterial color="#ffffff" size={0.045} sizeAttenuation transparent opacity={0.9} depthWrite={false} />
        </points>
        {/* Core integrity node */}
        <mesh position={[0, 0.52, 0]}>
          <octahedronGeometry args={[0.055, 0]} />
          <meshBasicMaterial color="#e2e8f0" transparent opacity={0.95} />
        </mesh>
        <mesh position={[0, 0.52, 0]}>
          <octahedronGeometry args={[0.12, 0]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.12} depthWrite={false} />
        </mesh>
        {/* Subtle red accent ring — national mark */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.51, 0]}>
          <ringGeometry args={[0.48, 0.5, 6]} />
          <meshBasicMaterial color="#b91c1c" transparent opacity={0.35} side={THREE.DoubleSide} depthWrite={false} />
        </mesh>
      </group>

      {/* Orbital integrity rings */}
      <group ref={ringRef}>
        <mesh rotation={[Math.PI / 2.35, 0, 0]}>
          <torusGeometry args={[2.05, 0.006, 6, quality === 'low' ? 48 : 96]} />
          <meshBasicMaterial color="#67e8f9" transparent opacity={0.18} depthWrite={false} />
        </mesh>
        <mesh rotation={[Math.PI / 3.1, 0.35, 0.15]} scale={[1.04, 1, 0.82]}>
          <torusGeometry args={[2.35, 0.004, 6, quality === 'low' ? 40 : 80]} />
          <meshBasicMaterial color="#94a3b8" transparent opacity={0.12} depthWrite={false} />
        </mesh>
      </group>

      {/* Radial integrity markers */}
      {quality !== 'low' &&
        Array.from({ length: spokeCount }).map((_, i) => {
          const a = (i / spokeCount) * Math.PI * 2 + 0.2
          return (
            <mesh key={i} position={[Math.cos(a) * 1.85, 0.3, Math.sin(a) * 1.05]}>
              <boxGeometry args={[0.008, 0.4, 0.008]} />
              <meshBasicMaterial color="#64748b" transparent opacity={0.28} />
            </mesh>
          )
        })}

      {/* Foreground depth accents */}
      <group ref={foreRef}>
        <points geometry={foreParticles}>
          <pointsMaterial color="#e0f2fe" size={0.025} sizeAttenuation transparent opacity={0.4} depthWrite={false} />
        </points>
        <mesh position={[1.05, 0.35, 1.4]} rotation={[0.25, -0.35, 0.15]}>
          <torusGeometry args={[0.45, 0.005, 6, 40, Math.PI * 0.65]} />
          <meshBasicMaterial color="#67e8f9" transparent opacity={0.3} depthWrite={false} />
        </mesh>
      </group>
    </group>
  )
}
