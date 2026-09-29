'use client'

import { useMemo } from 'react'
import * as THREE from 'three'

type BackgroundEnvironmentProps = {
  quality: 'high' | 'medium' | 'low'
  mouse: React.MutableRefObject<{ x: number; y: number }>
  introProgress: React.MutableRefObject<number>
}

/**
 * Static abstract digital network environment — no motion.
 * Topology grids, nodes, and pathways only.
 */
export function BackgroundEnvironment({ quality }: BackgroundEnvironmentProps) {
  const nodeCount = quality === 'high' ? 48 : quality === 'medium' ? 28 : 14
  const linkCount = quality === 'high' ? 36 : quality === 'medium' ? 22 : 10

  const { nodes, links } = useMemo(() => {
    const nodes = new Float32Array(nodeCount * 3)
    const nodeVecs: THREE.Vector3[] = []
    for (let i = 0; i < nodeCount; i++) {
      const a = (i / nodeCount) * Math.PI * 2
      const r = 3.2 + (i % 5) * 1.1 + (i % 3) * 0.4
      const x = Math.cos(a * 1.7) * r
      const y = ((i % 7) - 3) * 0.55
      const z = Math.sin(a * 1.3) * r - 5.5
      nodes[i * 3] = x
      nodes[i * 3 + 1] = y
      nodes[i * 3 + 2] = z
      nodeVecs.push(new THREE.Vector3(x, y, z))
    }

    const links = new Float32Array(linkCount * 6)
    for (let i = 0; i < linkCount; i++) {
      const a = i % nodeCount
      const b = (i * 3 + 5) % nodeCount
      links[i * 6] = nodeVecs[a].x
      links[i * 6 + 1] = nodeVecs[a].y
      links[i * 6 + 2] = nodeVecs[a].z
      links[i * 6 + 3] = nodeVecs[b].x
      links[i * 6 + 4] = nodeVecs[b].y
      links[i * 6 + 5] = nodeVecs[b].z
    }

    return { nodes, links }
  }, [nodeCount, linkCount])

  const nodeGeo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(nodes, 3))
    return g
  }, [nodes])

  const linkGeo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(links, 3))
    return g
  }, [links])

  return (
    <group>
      <mesh position={[0, 0, -14]}>
        <planeGeometry args={[48, 28]} />
        <meshBasicMaterial color="#050a14" />
      </mesh>

      <group position={[0.8, -1.8, -3]} rotation={[-Math.PI / 2.5, 0, 0]}>
        <gridHelper args={[22, quality === 'low' ? 14 : 32, '#132033', '#0a1220']} />
      </group>

      <lineSegments geometry={linkGeo}>
        <lineBasicMaterial color="#1e3a5f" transparent opacity={0.35} />
      </lineSegments>

      <points geometry={nodeGeo}>
        <pointsMaterial
          color="#94a3b8"
          size={0.045}
          sizeAttenuation
          transparent
          opacity={0.45}
          depthWrite={false}
        />
      </points>

      <mesh position={[0.5, -0.6, -8]}>
        <planeGeometry args={[30, 0.015]} />
        <meshBasicMaterial color="#1e293b" transparent opacity={0.4} />
      </mesh>
    </group>
  )
}
