'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { INSA_INFO } from '@/lib/data'

export function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const el = sectionRef.current
        if (!el) return
        const targets = el.querySelectorAll<HTMLElement>('.reveal')
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) } }),
            { threshold: 0.12 }
        )
        targets.forEach((t) => observer.observe(t))
        return () => observer.disconnect()
    }, [])

    return (
        <section ref={sectionRef} className="section-py bg-white" aria-labelledby="about-heading">
            <div className="container-insa">
                <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">

                    {/* Visual side */}
                    <div className="relative order-2 lg:order-1 reveal">
                        <div className="relative rounded-md overflow-hidden aspect-video shadow-[0_2px_20px_rgba(0,0,0,0.10)] ring-1 ring-black/5 bg-gray-900">
                            <iframe
                                className="absolute inset-0 w-full h-full"
                                src="https://www.youtube.com/embed/6i0bCMZE3xc?rel=0"
                                title="About INSA"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            />
                        </div>
                        {/* Thin accent line */}
                        <div className="absolute -bottom-px left-0 right-0 h-px bg-brand-blue/20" />
                    </div>

                    {/* Text side */}
                    <div className="order-1 lg:order-2">
                        <div className="flex items-center gap-3 mb-5 reveal">
                            <span className="w-6 h-px bg-brand-blue" />
                            <span className="eyebrow text-brand-blue">About INSA</span>
                        </div>

                        <h2
                            id="about-heading"
                            className="text-gray-900 font-black leading-[1.06] mb-6 reveal reveal-delay-1"
                            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}
                        >
                            Ethiopia&apos;s National<br />Cybersecurity Authority
                        </h2>

                        <p className="text-gray-500 leading-relaxed mb-4 reveal reveal-delay-2" style={{ fontSize: '0.975rem' }}>
                            The Information Network Security Administration (INSA) is Ethiopia&apos;s mandated institution for cybersecurity policy, national information infrastructure protection, and digital sovereignty — established under Council of Ministers Regulation No. 130/2007.
                        </p>

                        <p className="text-gray-500 leading-relaxed mb-8 reveal reveal-delay-3" style={{ fontSize: '0.975rem' }}>
                            INSA develops national cybersecurity strategies, manages Ethiopia&apos;s Root Certification Authority, controls the import and export of sensitive technology, and leads capacity building across government and critical infrastructure.
                        </p>

                        {/* Values */}
                        <div className="flex flex-wrap gap-2 mb-9 reveal reveal-delay-3">
                            {INSA_INFO.values.map((v) => (
                                <span
                                    key={v}
                                    className="px-3 py-1.5 border border-gray-200 text-gray-500 text-xs font-medium rounded-sm tracking-wide"
                                >
                                    {v}
                                </span>
                            ))}
                        </div>

                        <Link
                            href="/about"
                            className="inline-flex items-center gap-2 text-brand-blue font-semibold text-sm hover:gap-3 transition-all duration-200 reveal reveal-delay-4"
                        >
                            Learn More About INSA
                            <ChevronRight size={16} />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
