'use client'

import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

type HeroCameraProps = {
  introProgress: React.MutableRefObject<number>
  mouse: React.MutableRefObject<{ x: number; y: number }>
  scrollProgress: React.MutableRefObject<number>
  reducedMotion: boolean
  mobile: boolean
}

function cinematicEase(t: number) {
  const x = Math.min(1, Math.max(0, t))
  const s = x * x * (3 - 2 * x)
  return 1 - Math.pow(1 - s, 2.15)
}

const START = new THREE.Vector3(0.15, 3.6, 12.8)
const END = new THREE.Vector3(1.3, 1.5, 5.15)
const LOOK_START = new THREE.Vector3(0.1, 0.15, 0)
const LOOK_END = new THREE.Vector3(0.3, 0.12, 0.45)

export function HeroCamera({
  introProgress,
  mouse,
  scrollProgress,
  reducedMotion,
  mobile,
}: HeroCameraProps) {
  const { camera } = useThree()
  const started = useRef(performance.now())
  const currentPos = useRef(START.clone())
  const settled = useRef(false)

  useFrame(() => {
    if (reducedMotion || mobile) {
      if (!settled.current) {
        camera.position.copy(END)
        camera.lookAt(LOOK_END)
        introProgress.current = 1
        settled.current = true
      }
      return
    }

    const elapsed = (performance.now() - started.current) / 1000
    const p = cinematicEase(Math.min(1, elapsed / 6.0))
    introProgress.current = p

    currentPos.current.lerpVectors(START, END, p)

    const scroll = scrollProgress.current
    const mx = mouse.current.x * 0.32
    const my = mouse.current.y * 0.2

    camera.position.set(
      currentPos.current.x + mx - scroll * 0.12,
      currentPos.current.y + my + scroll * 0.04,
      currentPos.current.z - scroll * 1.0,
    )

    const look = new THREE.Vector3().lerpVectors(LOOK_START, LOOK_END, p)
    camera.lookAt(look.x + mx * 0.12, look.y + my * 0.08, look.z)
  })

  return null
}
