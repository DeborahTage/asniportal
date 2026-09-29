'use client'

import { useMemo } from 'react'
import * as THREE from 'three'
import { ETHIOPIA_OUTLINE, projectToShape } from './ethiopiaOutline'

const MAP_DEPTH = 0.42
const BEVEL = 0.05

type EthiopiaModelProps = {
  quality: 'high' | 'medium' | 'low'
  introProgress: React.MutableRefObject<number>
  /** Optional future GLB URL — when provided, replaces procedural mesh */
  modelUrl?: string
}

/**
 * Procedural Ethiopia landmass with physical depth.
 * Stage parent handles pop-out / parallax. Drop a GLB via modelUrl later.
 */
export function EthiopiaModel({ quality }: EthiopiaModelProps) {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape()
    ETHIOPIA_OUTLINE.forEach(([lon, lat], i) => {
      const [x, y] = projectToShape(lon, lat)
      if (i === 0) shape.moveTo(x, y)
      else shape.lineTo(x, y)
    })
    shape.closePath()

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: MAP_DEPTH,
      bevelEnabled: true,
      bevelThickness: BEVEL,
      bevelSize: BEVEL * 0.9,
      bevelOffset: -0.002,
      bevelSegments: quality === 'high' ? 5 : 2,
      curveSegments: quality === 'high' ? 14 : 6,
    })

    geo.rotateX(-Math.PI / 2)
    geo.computeVertexNormals()
    geo.center()
    geo.translate(0, MAP_DEPTH / 2, 0)
    return geo
  }, [quality])

  const edgeGeo = useMemo(() => new THREE.EdgesGeometry(geometry, 22), [geometry])

  return (
    <group>
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#101c32"
          metalness={0.78}
          roughness={0.18}
          clearcoat={0.7}
          clearcoatRoughness={0.12}
          reflectivity={0.8}
          specularIntensity={1}
          ior={1.45}
          transparent
          opacity={0.96}
        />
      </mesh>

      <mesh geometry={geometry} scale={[0.982, 0.88, 0.982]} position={[0, 0.035, 0]}>
        <meshStandardMaterial
          color="#16304a"
          metalness={0.6}
          roughness={0.28}
          emissive="#0a5568"
          emissiveIntensity={0.22}
          transparent
          opacity={0.5}
        />
      </mesh>

      <lineSegments geometry={edgeGeo}>
        <lineBasicMaterial color="#8ad4e8" transparent opacity={0.4} />
      </lineSegments>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.03, 0]}>
        <circleGeometry args={[2.7, 48]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.08} depthWrite={false} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[2.05, 2.12, 64]} />
        <meshBasicMaterial color="#b91c1c" transparent opacity={0.14} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
    </group>
  )
}
