'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { AlertTriangle, ArrowRight, Volume2, VolumeX } from 'lucide-react'
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { INSA_INFO } from '@/lib/data'

/* ─── EASING & VARIANTS ──────────────────────────────────────────── */
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]
const EASE_IN_OUT: [number, number, number, number] = [0.65, 0, 0.35, 1]

// Character jitter offsets for predictable rendering
const JITTER_X = [4, -3, 2, -4, 5, -2, 3, -5, 1, -3]

/**
 * 1. INSA Letter Assemble
 * 0.2s - 0.5s: "I" -> "IN" -> "INS" -> "INSA"
 */
const insaLetterVar = {
    hidden: { opacity: 0, x: -6, filter: 'blur(4px)' },
    visible: (delay: number) => ({
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        transition: { delay, duration: 0.3, ease: EASE_OUT }
    })
}

/** Signal particles around INSA letters (disappear after 1.5s) */
const particleVar = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
        opacity: [0, 0.8, 0],
        scale: [0.5, 1, 0.5],
        transition: { delay: 0.2 + (i * 0.1), duration: 0.4, times: [0, 0.5, 1] }
    })
}

/**
 * 2. SECURING ETHIOPIA'S — split by characters
 * Reconstructs: 1.0s to ~1.4s
 */
const reconCharVar = {
    hidden: (i: number) => ({
        opacity: 0,
        x: JITTER_X[i % JITTER_X.length],
        filter: 'blur(3px)',
    }),
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        transition: { delay: 1.0 + (i * 0.02), duration: 0.35, ease: EASE_OUT }
    })
}

/**
 * 3. DIGITAL — Horizontal scan/expansion
 * 1.5s to 1.8s
 */
const digitalVar = {
    hidden: { opacity: 0, scaleX: 0.85, filter: 'blur(5px)' },
    visible: {
        opacity: 1,
        scaleX: 1,
        filter: 'blur(0px)',
        transition: { delay: 1.5, duration: 0.3, ease: EASE_OUT }
    }
}

/** Light scan sweep traveling across DIGITAL */
const sweepVar = {
    hidden: { left: '-20%', opacity: 0 },
    visible: {
        left: '120%',
        opacity: [0, 1, 1, 0],
        transition: { delay: 1.5, duration: 0.4, ease: 'linear' as any, times: [0, 0.2, 0.8, 1] }
    }
}

/**
 * 4. FUTURE. — solid final lock
 * 1.8s - 1.9s
 */
const futureVar = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { delay: 1.8, duration: 0.2, ease: EASE_OUT }
    }
}

/**
 * 5. Final system lock line (bottom sweep)
 * 2.2s -> 2.4s
 */
const lockLineVar = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
        scaleX: [0, 1, 1],
        opacity: [0, 0.4, 0],
        transition: { delay: 2.2, duration: 0.5, ease: EASE_IN_OUT, times: [0, 0.5, 1] }
    }
}

/** Description (fade-up at 2.0s) structure */
const descVar = {
    hidden: { opacity: 0, y: 15, filter: 'blur(3px)' },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { delay: 2.0, duration: 0.5, ease: EASE_OUT }
    }
}

const ctaVar = {
    hidden: { opacity: 0, y: 12 },
    visible: (delay: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay, duration: 0.4, ease: EASE_OUT }
    })
}

/* ────────────────────────────────────────────────────────────────── */
export function HeroSection() {
    const [isMuted, setIsMuted] = useState(true)
    const reducedOptions = useRef(false)
    const prefersReduced = useReducedMotion()

    // Parallax tracking
    const mouseX = useMotionValue(0.5)
    const mouseY = useMotionValue(0.5)
    // Subtle spring physics for smooth, high-end feel
    const springX = useSpring(mouseX, { stiffness: 100, damping: 30 })
    const springY = useSpring(mouseY, { stiffness: 100, damping: 30 })
    const parallaxX = useTransform(springX, [0, 1], [-8, 8])
    const parallaxY = useTransform(springY, [0, 1], [-5, 5])

    useEffect(() => {
        reducedOptions.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }, [])

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        mouseX.set((e.clientX - rect.left) / rect.width)
        mouseY.set((e.clientY - rect.top) / rect.height)
    }

    const init = prefersReduced ? 'visible' : 'hidden'
    const anim = 'visible'

    const line1Str = "SECURING ETHIOPIA'S"
    const line1Chars = line1Str.split("")

    return (
        <section
            className="relative min-h-[92vh] flex items-center bg-navy-950 overflow-hidden"
            aria-label="INSA hero"
            onMouseMove={handleMouseMove}
        >
            {/* ══ BACKGROUND VIDEO ══ */}
            <div className="absolute inset-0 z-0" aria-hidden="true">
                <video
                    src="/assets/uploads/insavideo.mp4"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    autoPlay loop muted={isMuted} playsInline preload="metadata"
                />
                <div className="absolute inset-0" style={{
                    background: 'linear-gradient(90deg,rgba(5,10,20,0.94) 0%,rgba(5,10,20,0.75) 20%,rgba(5,10,20,0.28) 46%,rgba(5,10,20,0.00) 64%)',
                }} />
                <div className="absolute inset-0" style={{
                    background: 'linear-gradient(180deg,rgba(5,10,20,0.60) 0%,transparent 16%,transparent 76%,rgba(5,10,20,0.70) 100%)',
                }} />
            </div>

            {/* ══ VIDEO AUDIO CONTROLS ══ */}
            <button
                onClick={() => setIsMuted(!isMuted)}
                className="absolute bottom-8 right-8 z-30 flex items-center justify-center p-3 rounded-full bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:text-white transition-all backdrop-blur-sm"
                aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>

            {/* ══ TYPOGRAPHY (with parallax micro-interaction) ══ */}
            <motion.div
                className="relative z-10 container-insa w-full py-28 lg:py-40"
                style={prefersReduced ? {} : { x: parallaxX, y: parallaxY }}
            >
                <div className="grid lg:grid-cols-2">
                    <div>

                        {/* 1. INSA Identity Assembly */}
                        <div className="flex items-center mb-6 select-none relative" aria-label="INSA — Information Network Security Administration">
                            {['I', 'N', 'S', 'A'].map((ch, i) => (
                                <div key={ch} className="relative inline-block">
                                    <motion.span
                                        variants={insaLetterVar}
                                        custom={0.20 + (i * 0.1)}
                                        initial={init} animate={anim}
                                        style={{
                                            display: 'inline-block',
                                            fontFamily: 'var(--font-inter), Inter, sans-serif',
                                            fontSize: 'clamp(1.55rem, 3vw, 2.4rem)',
                                            fontWeight: 800,
                                            color: '#ffffff',
                                            letterSpacing: '0.07em',
                                            lineHeight: 1,
                                        }}
                                    >
                                        {ch}
                                    </motion.span>
                                    {/* Subtle signal particle */}
                                    {!prefersReduced && (
                                        <motion.div
                                            variants={particleVar}
                                            custom={i}
                                            initial="hidden" animate="visible"
                                            style={{
                                                position: 'absolute', width: 2, height: 2,
                                                backgroundColor: '#60a5fa', borderRadius: '50%',
                                                top: i % 2 === 0 ? '-2px' : 'auto', bottom: i % 2 !== 0 ? '-2px' : 'auto',
                                                right: '-2px', pointerEvents: 'none'
                                            }}
                                        />
                                    )}
                                </div>
                            ))}

                            {/* Eyebrow / Name — wait until INSA assembles (0.6s) */}
                            <motion.div
                                initial={init} animate={anim}
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: { opacity: 1, transition: { delay: 0.6, duration: 0.4 } }
                                }}
                                className="flex items-center h-full ml-4"
                                aria-hidden="true"
                            >
                                <div style={{ width: 1, height: '1.3em', background: 'rgba(255,255,255,0.22)', marginRight: 15 }} />
                                <span style={{
                                    fontFamily: 'var(--font-inter), Inter, sans-serif',
                                    fontSize: '0.575rem', fontWeight: 600, color: 'rgba(255,255,255,0.40)',
                                    letterSpacing: '0.13em', textTransform: 'uppercase', lineHeight: 1.45,
                                    maxWidth: '10rem',
                                }}>
                                    Information<br />Network Security<br />Administration
                                </span>
                            </motion.div>
                        </div>

                        {/* Above-headline eyebrow line */}
                        <motion.div
                            className="flex items-center gap-3 mb-8"
                            initial={init} animate={anim}
                            variants={{
                                hidden: { opacity: 0, x: -10 },
                                visible: { opacity: 1, x: 0, transition: { delay: 0.7, duration: 0.4 } }
                            }}
                        >
                            <span aria-hidden="true" style={{ display: 'block', width: 24, height: 1, background: 'rgba(255,255,255,0.30)', flexShrink: 0 }} />
                            <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.42)' }}>
                                Information Network Security Administration
                            </span>
                        </motion.div>

                        {/* 2. RECONSTRUCTION HEADLINE */}
                        <h1 className="mb-7 relative">
                            {/* Line 1: SECURING ETHIOPIA'S (Per-character reconstruction) */}
                            <span className="block mb-1" aria-label={line1Str} style={{
                                fontFamily: 'var(--font-inter), Inter, sans-serif',
                                fontSize: 'clamp(1.75rem, 3.4vw, 2.6rem)', fontWeight: 400,
                                color: 'rgba(255,255,255,0.80)', lineHeight: 1.08, letterSpacing: '-0.02em',
                            }}>
                                {line1Chars.map((ch, i) => (
                                    <motion.span
                                        key={i}
                                        custom={i}
                                        variants={reconCharVar}
                                        initial={init} animate={anim}
                                        style={{ display: 'inline-block', whiteSpace: 'pre' }}
                                    >
                                        {ch}
                                    </motion.span>
                                ))}
                            </span>

                            {/* Line 2: DIGITAL FUTURE. */}
                            <span className="block relative" style={{
                                fontFamily: 'var(--font-inter), Inter, sans-serif',
                                fontSize: 'clamp(2.75rem, 5.8vw, 4.75rem)', fontWeight: 800,
                                color: '#ffffff', lineHeight: 1.00, letterSpacing: '-0.035em',
                            }}>
                                <motion.span
                                    variants={digitalVar}
                                    initial={init} animate={anim}
                                    className="inline-block relative overflow-hidden"
                                    style={{ marginRight: '0.22em', paddingRight: '0.1em', transformOrigin: 'left center' }}
                                >
                                    DIGITAL
                                    {/* Subtle light sweep connecting the word */}
                                    {!prefersReduced && (
                                        <motion.div
                                            variants={sweepVar}
                                            initial="hidden" animate="visible"
                                            style={{
                                                position: 'absolute', top: 0, bottom: 0, width: '30%',
                                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
                                                transform: 'skewX(-20deg)', pointerEvents: 'none'
                                            }}
                                        />
                                    )}
                                </motion.span>

                                <motion.span
                                    variants={futureVar}
                                    initial={init} animate={anim}
                                    className="inline-block"
                                >
                                    FUTURE.
                                </motion.span>
                            </span>

                            {/* Final lock line, spanning headline width exactly (2.2s) */}
                            {!prefersReduced && (
                                <motion.div
                                    variants={lockLineVar}
                                    initial="hidden" animate="visible"
                                    style={{
                                        position: 'absolute', bottom: -6, left: 0, right: 0, height: 1,
                                        background: 'rgba(96, 165, 250, 0.4)', // Subtle cyan/blue from video environment
                                        transformOrigin: 'left center', pointerEvents: 'none'
                                    }}
                                />
                            )}
                        </h1>

                        {/* DESCRIPTION */}
                        <motion.p
                            variants={descVar}
                            initial={init} animate={anim}
                            style={{
                                fontFamily: 'var(--font-inter), Inter, sans-serif',
                                fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)', fontWeight: 300,
                                color: 'rgba(255,255,255,0.55)', lineHeight: 1.78,
                                maxWidth: '36rem', marginBottom: '2.25rem',
                            }}
                        >
                            Protecting Ethiopia&#39;s digital infrastructure through secure,
                            resilient, and trusted technology.
                        </motion.p>

                        {/* CTA BUTTONS (2.3s and 2.4s) */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', alignItems: 'center' }}>
                            <motion.a
                                variants={ctaVar} custom={2.3} initial={init} animate={anim}
                                href={INSA_INFO.reportUrl} target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-2.5 font-semibold text-sm px-7 py-3.5 text-white"
                                style={{
                                    background: '#dc2626', borderRadius: 2, textDecoration: 'none', cursor: 'pointer',
                                    transition: 'background 0.2s ease',
                                }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#b91c1c' }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#dc2626' }}
                            >
                                <AlertTriangle size={15} strokeWidth={2.2} />
                                Report a Cyber Incident
                            </motion.a>

                            <motion.div variants={ctaVar} custom={2.4} initial={init} animate={anim}>
                                <Link
                                    href="/services"
                                    className="inline-flex items-center gap-2 font-medium text-sm px-7 py-3.5 text-white group"
                                    style={{
                                        border: '1px solid rgba(255,255,255,0.20)', borderRadius: 2, background: 'transparent',
                                        transition: 'border-color .2s ease, background .2s ease',
                                    }}
                                    onMouseEnter={e => {
                                        const el = e.currentTarget as HTMLElement
                                        el.style.borderColor = 'rgba(255,255,255,0.50)'
                                        el.style.background = 'rgba(255,255,255,0.05)'
                                    }}
                                    onMouseLeave={e => {
                                        const el = e.currentTarget as HTMLElement
                                        el.style.borderColor = 'rgba(255,255,255,0.20)'
                                        el.style.background = 'transparent'
                                    }}
                                >
                                    Explore Our Services
                                    <ArrowRight size={14} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>
                            </motion.div>
                        </div>

                    </div>

                    <div className="hidden lg:block" aria-hidden="true" />
                </div>
            </motion.div>

            {/* Bottom hairline */}
            <div
                className="absolute bottom-0 left-0 right-0 h-px z-10 pointer-events-none"
                style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 50%, transparent 100%)' }}
                aria-hidden="true"
            />

            {/* Watermark cover */}
            <div
                aria-hidden="true"
                style={{ position: 'absolute', left: 0, bottom: 0, width: 200, height: 110, zIndex: 20, pointerEvents: 'none', background: 'linear-gradient(90deg,rgba(5,10,20,1) 0%,rgba(5,10,20,1) 60%,rgba(5,10,20,0) 100%)' }}
            />
        </section>
    )
}
