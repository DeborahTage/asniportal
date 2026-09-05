'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Search, Shield, Cloud, Lock, ClipboardCheck, EyeOff, ArrowRight } from 'lucide-react'
import { SERVICES } from '@/lib/data'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    Search, Shield, Cloud, Lock, ClipboardCheck, EyeOff
}

export function ServicesSection() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const el = sectionRef.current
        if (!el) return
        const targets = el.querySelectorAll<HTMLElement>('.reveal')
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) } }),
            { threshold: 0.08 }
        )
        targets.forEach((t) => observer.observe(t))
        return () => observer.disconnect()
    }, [])

    return (
        <section ref={sectionRef} className="section-py bg-gray-50" aria-labelledby="services-heading">
            <div className="container-insa">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 reveal">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-6 h-px bg-brand-blue" />
                            <span className="eyebrow text-brand-blue">Core Services</span>
                        </div>
                        <h2
                            id="services-heading"
                            className="text-gray-900 font-black leading-tight max-w-sm"
                            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', letterSpacing: '-0.03em' }}
                        >
                            Building a Resilient<br />Digital Infrastructure
                        </h2>
                    </div>
                    <Link
                        href="/services"
                        className="inline-flex items-center gap-2 text-brand-blue font-semibold text-sm hover:gap-3 transition-all duration-200 shrink-0"
                    >
                        View All Services <ArrowRight size={14} />
                    </Link>
                </div>

                {/* Editorial grid — thin separators, no rounded cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3">
                    {SERVICES.map((service, idx) => {
                        const Icon = iconMap[service.icon]
                        return (
                            <article
                                key={service.slug}
                                className={`reveal reveal-delay-${Math.min(idx + 1, 4)} group relative p-8 bg-white hover:bg-blue-50/40 transition-colors duration-200 border-b border-r border-gray-100`}
                            >
                                {/* Left accent on hover */}
                                <div className="absolute left-0 top-6 bottom-6 w-0.5 bg-brand-blue scale-y-0 group-hover:scale-y-100 transition-transform duration-250 origin-center rounded-full" />

                                {/* Number */}
                                <div className="font-mono text-[2.5rem] font-black text-gray-100 leading-none mb-5 select-none group-hover:text-blue-100 transition-colors duration-200">
                                    {service.number}
                                </div>

                                {/* Icon */}
                                {Icon && (
                                    <div className="w-9 h-9 rounded-sm flex items-center justify-center text-brand-blue bg-blue-50 group-hover:bg-brand-blue group-hover:text-white transition-all duration-200 mb-4">
                                        <Icon size={16} />
                                    </div>
                                )}

                                {/* Category label */}
                                <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">
                                    {service.category}
                                </p>

                                {/* Title */}
                                <h3 className="text-gray-900 font-bold text-base mb-3 leading-snug group-hover:text-brand-blue transition-colors duration-200">
                                    {service.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                    {service.shortDesc}
                                </p>

                                {/* Link */}
                                <Link
                                    href={`/services/${service.slug}`}
                                    className="inline-flex items-center gap-1.5 text-brand-blue font-semibold text-xs hover:gap-2.5 transition-all duration-200"
                                    aria-label={`Learn more about ${service.title}`}
                                >
                                    Learn more <ArrowRight size={11} />
                                </Link>
                            </article>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
