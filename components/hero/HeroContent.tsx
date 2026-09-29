'use client'

import Link from 'next/link'
import { AlertTriangle, ArrowRight, ShieldCheck, Activity, Terminal } from 'lucide-react'
import { motion, type Variants } from 'framer-motion'

export function HeroContent() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  }

  // Futuristic HUD boot-sequence string
  const BootSequence = () => (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 1.5 }}
      className="flex items-center gap-3 mb-6 font-mono text-[11px] md:text-xs text-emerald-400/80 tracking-widest uppercase"
    >
      <Terminal size={14} className="animate-pulse text-emerald-400" />
      <span>SYS.INIT // <span className="text-emerald-500/50">SECURE.LINK.ESTABLISHED</span></span>
    </motion.div>
  )

  return (
    <div className="relative z-20 max-w-2xl xl:max-w-3xl pointer-events-auto mt-12 lg:mt-24 pl-4 sm:pl-6 lg:pl-10">

      <BootSequence />

      {/* ── HEADLINE ──────────────────────────────────────────────────── */}
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <motion.h1
          variants={itemVariants}
          className="mb-8 lg:mb-10 font-bold text-white tracking-tight leading-[1.1] text-[clamp(2.8rem,5vw,4.5rem)] drop-shadow-[0_0_25px_rgba(255,255,255,0.15)]"
        >
          Securing Ethiopia&apos;s
          <br />
          <motion.span
            className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 drop-shadow-[0_0_15px_rgba(45,212,191,0.4)]"
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            style={{ backgroundSize: '200% 200%' }}
          >
            Digital Future.
          </motion.span>
        </motion.h1>

        {/* ── SUPPORTING TEXT ───────────────────────────────────────────── */}
        <motion.div variants={itemVariants} className="max-w-lg mb-10 pl-5 border-l-[3px] border-emerald-500/40 relative">
          {/* Decorative scanner block on border */}
          <motion.div
            animate={{ y: [0, 80, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute left-[-3px] top-0 w-[3px] h-4 bg-emerald-400 shadow-[0_0_10px_2px_rgba(52,211,153,0.8)]"
          />
          <p className="text-[clamp(1rem,1.2vw,1.15rem)] text-slate-300 font-normal leading-[1.7]">
            INSA delivers an advanced intelligence-driven unified security platform.
            Protecting national critical infrastructure against sophisticated modern threats.
          </p>
        </motion.div>

        {/* ── CTA BUTTONS ───────────────────────────────────────────────── */}
        <motion.div variants={itemVariants} className="flex flex-wrap gap-4 items-center">
          <a
            href="https://report.insa.gov.et"
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden inline-flex items-center gap-2.5 font-semibold text-sm px-8 py-4 text-white bg-red-600 hover:bg-red-500 transition-all rounded shadow-[0_0_30px_rgba(220,38,38,0.3)] hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] group"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <AlertTriangle size={16} strokeWidth={2.5} className="relative z-10" />
            <span className="relative z-10 tracking-wide uppercase text-xs">Report Cyber Incident</span>
          </a>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 font-medium text-xs tracking-wide uppercase px-8 py-4 text-emerald-300 bg-slate-900/50 hover:bg-slate-800/80 border border-emerald-500/30 hover:border-emerald-400/60 transition-all rounded backdrop-blur-sm group"
          >
            Explore Platform
            <ArrowRight
              size={16}
              strokeWidth={2}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
