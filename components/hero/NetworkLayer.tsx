'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { ETHIOPIA_NODES, getOutlineCenter, projectLonLat } from './ethiopiaOutline'

type NetworkLayerProps = {
  quality: 'high' | 'medium' | 'low'
  introProgress: React.MutableRefObject<number>
  mouse: React.MutableRefObject<{ x: number; y: number }>
}

function buildConnections(count: number) {
  const links: [number, number][] = []
  for (let i = 1; i < Math.min(count, ETHIOPIA_NODES.length); i++) {
    links.push([0, i])
  }
  for (let i = 1; i < Math.min(count - 1, ETHIOPIA_NODES.length - 1); i++) {
    if (i % 2 === 0) links.push([i, i + 1])
  }
  return links
}

export function NetworkLayer({ quality, introProgress, mouse }: NetworkLayerProps) {
  const groupRef = useRef<THREE.Group>(null)
  const pulseRef = useRef<THREE.Points>(null)
  const nodeCount = quality === 'high' ? ETHIOPIA_NODES.length : quality === 'medium' ? 7 : 5

  const { positions, linePositions, segments, particleCount } = useMemo(() => {
    const center = getOutlineCenter()
    const nodes = ETHIOPIA_NODES.slice(0, nodeCount)
    const positions = new Float32Array(nodes.length * 3)
    nodes.forEach((n, i) => {
      const [x, z] = projectLonLat(n.lon, n.lat)
      positions[i * 3] = x - center.x
      positions[i * 3 + 1] = 0.48 + n.weight * 0.06
      positions[i * 3 + 2] = z - center.z
    })

    const links = buildConnections(nodeCount)
    const linePositions = new Float32Array(links.length * 6)
    const segments: { a: THREE.Vector3; b: THREE.Vector3 }[] = []

    links.forEach(([ai, bi], i) => {
      const a = new THREE.Vector3(positions[ai * 3], positions[ai * 3 + 1], positions[ai * 3 + 2])
      const b = new THREE.Vector3(positions[bi * 3], positions[bi * 3 + 1], positions[bi * 3 + 2])
      segments.push({ a, b })
      linePositions[i * 6] = a.x
      linePositions[i * 6 + 1] = a.y
      linePositions[i * 6 + 2] = a.z
      linePositions[i * 6 + 3] = b.x
      linePositions[i * 6 + 4] = b.y
      linePositions[i * 6 + 5] = b.z
    })

    const particleCount = quality === 'low' ? 18 : quality === 'medium' ? 36 : 56
    return { positions, linePositions, segments, particleCount }
  }, [nodeCount, quality])

  const nodeGeo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return g
  }, [positions])

  const lineGeo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
    return g
  }, [linePositions])

  const particleGeo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(particleCount * 3), 3))
    return g
  }, [particleCount])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const p = introProgress.current

    if (groupRef.current) {
      groupRef.current.position.x = mouse.current.x * -0.1
      groupRef.current.position.y = mouse.current.y * -0.06
      groupRef.current.visible = p > 0.2
    }

    if (pulseRef.current && segments.length > 0) {
      const attr = pulseRef.current.geometry.getAttribute('position') as THREE.BufferAttribute
      const arr = attr.array as Float32Array
      for (let i = 0; i < particleCount; i++) {
        const seg = segments[i % segments.length]
        const phase = (t * 0.15 + i * 0.1) % 1
        arr[i * 3] = seg.a.x + (seg.b.x - seg.a.x) * phase
        arr[i * 3 + 1] = seg.a.y + (seg.b.y - seg.a.y) * phase + 0.02
        arr[i * 3 + 2] = seg.a.z + (seg.b.z - seg.a.z) * phase
      }
      attr.needsUpdate = true
      const mat = pulseRef.current.material as THREE.PointsMaterial
      mat.opacity = 0.38 * THREE.MathUtils.smoothstep(p, 0.35, 0.85)
    }
  })

  return (
    <group ref={groupRef}>
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color="#67e8f9" transparent opacity={0.26} />
      </lineSegments>

      <points geometry={nodeGeo}>
        <pointsMaterial
          color="#e2f6fc"
          size={quality === 'low' ? 0.055 : 0.07}
          sizeAttenuation
          transparent
          opacity={0.85}
          depthWrite={false}
        />
      </points>

      <mesh position={[positions[0], positions[1] + 0.02, positions[2]]}>
        <sphereGeometry args={[0.048, 12, 12]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
      </mesh>
      <mesh position={[positions[0], positions[1] + 0.02, positions[2]]}>
        <sphereGeometry args={[0.1, 14, 14]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.12} depthWrite={false} />
      </mesh>

      <points ref={pulseRef} geometry={particleGeo}>
        <pointsMaterial
          color="#a5f3fc"
          size={0.03}
          sizeAttenuation
          transparent
          opacity={0.35}
          depthWrite={false}
        />
      </points>
    </group>
  )
}
