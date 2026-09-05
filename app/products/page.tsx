import Link from 'next/link'
import { Network, CreditCard, Shield, Layers, MessageSquare, Mail, Server, Users, ChevronRight } from 'lucide-react'
import { PRODUCTS } from '@/lib/data'
import { IncidentCTASection } from '@/components/sections/IncidentCTASection'
import type { Metadata } from 'next'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    Network, CreditCard, Shield, Layers, MessageSquare, Mail, Server, Users
}

export const metadata: Metadata = {
    title: 'Products',
    description: 'INSA\'s portfolio of indigenous Ethiopian cybersecurity products — Gasha VPN, Antivirus, WAF, Sirkuni, Erga, Debo, and Enyuma IAM.',
}

export default function ProductsPage() {
    return (
        <>
            {/* Hero */}
            <section
                className="relative py-20 lg:py-28 overflow-hidden"
                style={{ background: 'linear-gradient(160deg, #060c1a 0%, #111827 100%)' }}
            >
                <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(34,211,238,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.04) 1px, transparent 1px)', backgroundSize: '52px 52px' }} />
                <div className="relative z-10 container-insa">
                    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-white/40 text-sm mb-8">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <ChevronRight size={13} />
                        <span className="text-white/70">Products</span>
                    </nav>
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-6 h-px bg-cyan-400" />
                            <span className="eyebrow text-cyan-400">INSA Technology</span>
                        </div>
                        <h1 className="text-white font-bold mb-5" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1 }}>
                            Ethiopia's Sovereign<br />
                            <span style={{ background: 'linear-gradient(135deg, #3b82f6, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                                Cybersecurity Stack
                            </span>
                        </h1>
                        <p className="text-white/60 text-body-lg leading-relaxed">
                            INSA engineers indigenous technology products that form the backbone of Ethiopia's digital security infrastructure — reducing dependence on foreign platforms.
                        </p>
                    </div>
                </div>
            </section>

            {/* Products grid */}
            <section
                className="section-py"
                style={{ background: 'linear-gradient(180deg, #060c1a 0%, #0a1020 100%)' }}
                aria-labelledby="products-list-heading"
            >
                <div className="container-insa">
                    <h2 id="products-list-heading" className="sr-only">All Products</h2>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {PRODUCTS.map((product) => {
                            const Icon = iconMap[product.icon]
                            return (
                                <article
                                    key={product.slug}
                                    className="rounded-lg p-6 group relative overflow-hidden"
                                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                                >
                                    {/* Hover glow */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                        style={{ background: 'radial-gradient(ellipse at 30% 0%, rgba(37,99,235,0.18), transparent 70%)' }} />

                                    <div className="relative z-10">
                                        <div className="w-10 h-10 rounded-md flex items-center justify-center text-cyan-400 mb-4"
                                            style={{ background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.18)' }}>
                                            {Icon && <Icon size={18} />}
                                        </div>

                                        <div className="text-xs px-2 py-0.5 rounded text-cyan-400/60 font-medium mb-3 inline-block"
                                            style={{ background: 'rgba(34,211,238,0.06)', border: '1px solid rgba(34,211,238,0.1)' }}>
                                            {product.category}
                                        </div>

                                        <h2 className="text-white font-semibold text-base mb-2">{product.name}</h2>
                                        <p className="text-white/45 text-sm leading-relaxed mb-5">{product.shortDesc}</p>

                                        <Link
                                            href={`/products/${product.slug}`}
                                            className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-semibold text-xs transition-colors"
                                        >
                                            Learn more <ChevronRight size={12} />
                                        </Link>
                                    </div>
                                </article>
                            )
                        })}
                    </div>
                </div>
            </section>

            <IncidentCTASection />
        </>
    )
}
