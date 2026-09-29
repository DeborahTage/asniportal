'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function InteriorHeroBg() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    // Generate randomized floating particles
    const particles = Array.from({ length: 15 }).map((_, i) => ({
        width: Math.random() * 4 + 1,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: Math.random() * 5 + 5,
        delay: Math.random() * 2,
    }))

    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950 pointer-events-none">

            {/* 1. Deep Radial Core Aura */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-emerald-900/10 rounded-full blur-[120px]" />

            {/* 2. Abstract Geometric Cyberspace Perspective Grid */}
            <div
                className="absolute w-[200%] h-[200%] left-[-50%] top-[-20%] opacity-20"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(16, 185, 129, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.4) 1px, transparent 1px)
          `,
                    backgroundSize: '80px 80px',
                    transform: 'perspective(1000px) rotateX(60deg) translateY(-100px) scale(2)',
                    transformOrigin: 'top center'
                }}
            />

            {/* 3. Infinite Scanning Laser Plane */}
            <motion.div
                className="absolute left-0 right-0 h-4 bg-emerald-500/20 blur-md shadow-[0_0_30px_rgba(16,185,129,0.8)]"
                initial={{ top: '-10%' }}
                animate={{ top: '110%' }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            />

            {/* 4. Secondary Scanning Laser Plane (Slower, reversed) */}
            <motion.div
                className="absolute left-0 right-0 h-1 bg-cyan-400/30 shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                initial={{ bottom: '-10%' }}
                animate={{ bottom: '110%' }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            />

            {/* 5. Floating Ambient Cyber Particles */}
            {particles.map((p, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.9)]"
                    style={{
                        width: p.width,
                        height: p.width,
                        left: p.left,
                        top: p.top,
                    }}
                    animate={{
                        y: [-30, 30, -30],
                        x: [-20, 20, -20],
                        opacity: [0.1, 0.8, 0.1],
                    }}
                    transition={{
                        duration: p.duration,
                        delay: p.delay,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            ))}

            {/* 6. Edge Vignette for smooth text readability integration */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-transparent to-slate-950/90" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-transparent to-slate-950/20" />

        </div>
    )
}
