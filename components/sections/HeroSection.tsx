'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { HeroContent } from '@/components/hero/HeroContent'

const CyberGridOverlay = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 1. Underlying Dark Tint */}
      <div className="absolute inset-0 bg-slate-950/80 mix-blend-multiply" />

      {/* 2. Cyber Wireframe Grid */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #10b981 1px, transparent 1px),
            linear-gradient(to bottom, #10b981 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* 3. Glowing Corner Reticles */}
      <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-emerald-500/50" />
      <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-emerald-500/50" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-emerald-500/50" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-emerald-500/50" />

      {/* 4. Vertical Scanning Line overlay */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] bg-emerald-400/50 shadow-[0_0_20px_4px_rgba(16,185,129,0.4)]"
        animate={{ y: ['0vh', '100vh', '0vh'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />

      {/* 5. Radial Vignette for framing */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#020617_100%)] opacity-90" />
    </div>
  )
}

const TelemetryDataNode = ({ top, right, delay }: any) => {
  // A small decorative block of changing text numbers to simulate active tracking
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 1 }}
      className="absolute border border-emerald-500/20 bg-slate-900/60 backdrop-blur-md p-3 font-mono text-[10px] text-emerald-400/80 w-48 rounded shadow-[0_0_15px_rgba(16,185,129,0.1)]"
      style={{ top, right }}
    >
      <div className="flex justify-between border-b border-emerald-500/30 pb-1 mb-1">
        <span>STR.NODE</span>
        <span className="text-white">ACTIVE</span>
      </div>
      <div className="opacity-70 space-y-1 mt-2">
        <div className="flex justify-between"><span>LAT:</span> <span>9.0300° N</span></div>
        <div className="flex justify-between"><span>LON:</span> <span>38.7400° E</span></div>
        <div className="flex justify-between items-center mt-2 pt-1 border-t border-emerald-500/30">
          <span>NET.STATUS</span>
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,1)]"
          />
        </div>
      </div>
    </motion.div>
  )
}

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null)

  // Connect video scale to scroll behavior
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const videoOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2])
  const yShift = useTransform(scrollYProgress, [0, 1], [0, 150])

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[calc(100vh-64px)] md:h-[calc(100vh-100px)] lg:h-[calc(100vh-106px)] max-h-[900px] min-h-[500px] flex items-center overflow-hidden bg-slate-950"
      aria-label="INSA Futuristic Hero"
    >
      {/* ── BACKGROUND VIDEO LAYER ────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 z-0 origin-center"
        style={{ scale: videoScale, opacity: videoOpacity }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/assets/uploads/watermark-removed-background.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* ── HIGH-TECH HUD CYBER OVERLAY ─────────────────────────────── */}
      <CyberGridOverlay />

      {/* ── HOLOGRAPHIC TELEMETRY NODES ─────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none z-10 hidden xl:block">
        <TelemetryDataNode top="20%" right="10%" delay={1.5} />
        <TelemetryDataNode top="60%" right="15%" delay={2.0} />
      </div>

      {/* ── HERO TEXT LAYER ─────────────────────────────────────────── */}
      <motion.div
        className="relative z-20 container-insa w-full h-full flex items-center"
        style={{ y: yShift }}
      >
        <div className="w-full max-w-4xl mx-auto lg:mx-0">
          <HeroContent />
        </div>
      </motion.div>
    </section>
  )
}
