'use client'

import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { AdaptiveDpr, AdaptiveEvents, ContactShadows, Preload } from '@react-three/drei'
import { EffectComposer, DepthOfField, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'
import { EthiopiaModel } from './EthiopiaModel'
import { NetworkLayer } from './NetworkLayer'
import { ProtectionSystem } from './ProtectionSystem'
import { HeroCamera } from './HeroCamera'

export type HeroSceneProps = {
  introProgress: React.MutableRefObject<number>
  mouse: React.MutableRefObject<{ x: number; y: number }>
  scrollProgress: React.MutableRefObject<number>
  quality: 'high' | 'medium' | 'low'
  reducedMotion: boolean
  mobile: boolean
}

function SceneLights({ quality }: { quality: 'high' | 'medium' | 'low' }) {
  return (
    <>
      <ambientLight intensity={0.26} color="#b8c5d4" />
      <directionalLight
        position={[5, 7, 6]}
        intensity={1.3}
        color="#f8fafc"
        castShadow={quality === 'high'}
        shadow-mapSize={quality === 'high' ? [1024, 1024] : [512, 512]}
      />
      <directionalLight position={[-4, 3, 2]} intensity={0.32} color="#94a3b8" />
      <spotLight
        position={[-1.5, 4.5, 6]}
        angle={0.5}
        penumbra={0.75}
        intensity={0.55}
        color="#67e8f9"
        castShadow={false}
      />
      <pointLight position={[0.5, 2.2, 4]} intensity={0.5} color="#e2e8f0" distance={10} />
      <pointLight position={[3.2, 1.4, 1.5]} intensity={0.22} color="#dc2626" distance={10} />
    </>
  )
}

function PostFX({ enabled }: { enabled: boolean }) {
  if (!enabled) return null
  return (
    <EffectComposer multisampling={0}>
      <DepthOfField focusDistance={0.018} focalLength={0.024} bokehScale={1.8} height={480} />
      <Vignette offset={0.28} darkness={0.5} />
    </EffectComposer>
  )
}

/** Ethiopia emerges toward viewer — anamorphic pop-out */
function EthiopiaStage({
  quality,
  introProgress,
  mouse,
}: {
  quality: 'high' | 'medium' | 'low'
  introProgress: React.MutableRefObject<number>
  mouse: React.MutableRefObject<{ x: number; y: number }>
}) {
  const stageRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (!stageRef.current) return
    const p = introProgress.current
    const emerge = THREE.MathUtils.smoothstep(p, 0.15, 0.92)
    const mx = mouse.current.x * 0.1
    const my = mouse.current.y * 0.06

    // Start deeper in the digital field, advance toward camera
    stageRef.current.position.set(
      0.45 + mx,
      -0.05 + my + emerge * 0.12,
      -0.35 + emerge * 1.45,
    )
    stageRef.current.rotation.set(
      -0.12 - emerge * 0.14 + my * 0.04,
      0.08 + emerge * 0.1 + mx * 0.05,
      0,
    )
    stageRef.current.scale.setScalar(0.92 + emerge * 0.32)
  })

  return (
    <group ref={stageRef}>
      <EthiopiaModel quality={quality} introProgress={introProgress} />
      <NetworkLayer quality={quality} introProgress={introProgress} mouse={mouse} />
      <ProtectionSystem quality={quality} introProgress={introProgress} mouse={mouse} />
      {quality !== 'low' && (
        <ContactShadows position={[0, -0.08, 0]} opacity={0.38} scale={7} blur={2.5} far={3.5} color="#020617" />
      )}
    </group>
  )
}

function SceneInner(props: HeroSceneProps) {
  const { quality, introProgress, mouse, scrollProgress, reducedMotion, mobile } = props

  return (
    <>
      {/* Transparent clear — HTML video shows through */}
      <fog attach="fog" args={['#050a14', 12, 26]} />

      <HeroCamera
        introProgress={introProgress}
        mouse={mouse}
        scrollProgress={scrollProgress}
        reducedMotion={reducedMotion}
        mobile={mobile}
      />

      <SceneLights quality={quality} />
      <EthiopiaStage quality={quality} introProgress={introProgress} mouse={mouse} />

      <PostFX enabled={quality === 'high' && !reducedMotion} />
      <AdaptiveDpr />
      <AdaptiveEvents />
      <Preload all />
    </>
  )
}

export default function HeroScene(props: HeroSceneProps) {
  const dpr = useMemo(() => {
    if (props.quality === 'low') return [1, 1.25] as [number, number]
    if (props.quality === 'medium') return [1, 1.5] as [number, number]
    return [1, 1.75] as [number, number]
  }, [props.quality])

  return (
    <Canvas
      className="!absolute inset-0 touch-none"
      dpr={dpr}
      gl={{
        antialias: props.quality !== 'low',
        alpha: true,
        premultipliedAlpha: true,
        powerPreference: props.quality === 'low' ? 'low-power' : 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.02,
      }}
      camera={{ fov: 36, near: 0.1, far: 40, position: [0.15, 3.6, 12.8] }}
      shadows={props.quality === 'high'}
      frameloop="always"
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0)
      }}
    >
      <Suspense fallback={null}>
        <SceneInner {...props} />
      </Suspense>
    </Canvas>
  )
}
