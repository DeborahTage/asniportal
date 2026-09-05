'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Network, CreditCard, Shield, Layers, MessageSquare, Mail, Server, Users, ArrowRight } from 'lucide-react'
import { PRODUCTS } from '@/lib/data'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    Network, CreditCard, Shield, Layers, MessageSquare, Mail, Server, Users
}

const featuredProducts = PRODUCTS.filter((p) => p.featured)
const otherProducts = PRODUCTS.filter((p) => !p.featured)

export function ProductsSection() {
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
        <section
            ref={sectionRef}
            className="section-py"
            style={{ background: 'linear-gradient(180deg, #060c1a 0%, #0a1020 100%)' }}
            aria-labelledby="products-heading"
        >
            <div className="container-insa">

                {/* Header */}
                <div className="mb-14 reveal">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="w-6 h-px bg-cyan-400/70" />
                        <span className="eyebrow text-cyan-400/80">INSA Technology</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <h2
                            id="products-heading"
                            className="text-white font-black leading-tight"
                            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', letterSpacing: '-0.03em' }}
                        >
                            Building Ethiopia&apos;s<br />
                            <span className="text-cyan-300">Cybersecurity Ecosystem</span>
                        </h2>
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-2 text-white/60 hover:text-white font-semibold text-sm transition-colors duration-200 shrink-0"
                        >
                            View All Products <ArrowRight size={14} />
                        </Link>
                    </div>
                    <p className="text-white/40 mt-4 max-w-xl text-sm leading-relaxed">
                        INSA develops a portfolio of indigenous technology products forming Ethiopia&apos;s sovereign cybersecurity infrastructure — from endpoint protection to secure communications and cloud hosting.
                    </p>
                </div>

                {/* Featured products */}
                <div className="grid md:grid-cols-3 gap-px mb-px bg-white/5 reveal reveal-delay-1">
                    {featuredProducts.map((product) => {
                        const Icon = iconMap[product.icon]
                        return (
                            <article
                                key={product.slug}
                                className="group relative p-7 transition-colors duration-200"
                                style={{ background: 'rgba(255,255,255,0.03)' }}
                            >
                                {/* hover: subtle top border */}
                                <div className="absolute top-0 left-6 right-6 h-px bg-cyan-400/0 group-hover:bg-cyan-400/40 transition-colors duration-300" />

                                {/* Icon + category */}
                                <div className="flex items-start justify-between mb-6">
                                    <div
                                        className="w-10 h-10 rounded-sm flex items-center justify-center text-cyan-400/80 group-hover:text-cyan-300 transition-colors"
                                        style={{ background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.12)' }}
                                    >
                                        {Icon && <Icon size={17} />}
                                    </div>
                                    <span className="text-[10px] font-semibold uppercase tracking-widest text-white/30">
                                        {product.category}
                                    </span>
                                </div>

                                <h3 className="text-white font-bold text-base mb-2 group-hover:text-cyan-200 transition-colors duration-200">
                                    {product.name}
                                </h3>
                                <p className="text-white/40 text-sm leading-relaxed mb-6">
                                    {product.shortDesc}
                                </p>

                                <Link
                                    href={`/products/${product.slug}`}
                                    className="inline-flex items-center gap-1.5 text-cyan-400/70 hover:text-cyan-300 font-semibold text-xs transition-colors duration-200"
                                    aria-label={`Learn more about ${product.name}`}
                                >
                                    Learn more <ArrowRight size={11} />
                                </Link>
                            </article>
                        )
                    })}
                </div>

                {/* Other products — compact horizontal */}
                <div
                    className="grid sm:grid-cols-2 lg:grid-cols-5 divide-x divide-y divide-white/5 border border-white/5 reveal reveal-delay-2"
                >
                    {otherProducts.map((product) => {
                        const Icon = iconMap[product.icon]
                        return (
                            <Link
                                key={product.slug}
                                href={`/products/${product.slug}`}
                                className="flex items-center gap-3 px-5 py-4 hover:bg-white/4 transition-colors group"
                                style={{ background: 'rgba(10,16,32,0.5)' }}
                            >
                                <div
                                    className="w-7 h-7 rounded-sm flex items-center justify-center text-white/30 group-hover:text-cyan-400 transition-colors shrink-0"
                                    style={{ background: 'rgba(255,255,255,0.04)' }}
                                >
                                    {Icon && <Icon size={13} />}
                                </div>
                                <div>
                                    <div className="text-white/65 group-hover:text-white text-sm font-medium transition-colors leading-tight">
                                        {product.name}
                                    </div>
                                    <div className="text-white/25 text-[11px] mt-0.5">{product.category}</div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
