import Link from 'next/link'
import { ChevronRight, ExternalLink } from 'lucide-react'
import { Network, CreditCard, Shield, Layers, MessageSquare, Mail, Server, Users } from 'lucide-react'
import { PRODUCTS } from '@/lib/data'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    Network, CreditCard, Shield, Layers, MessageSquare, Mail, Server, Users
}

export async function generateStaticParams() {
    return PRODUCTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const product = PRODUCTS.find((p) => p.slug === params.slug)
    if (!product) return {}
    return { title: product.name, description: product.shortDesc }
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
    const product = PRODUCTS.find((p) => p.slug === params.slug)
    if (!product) notFound()

    const Icon = iconMap[product.icon]

    return (
        <>
            {/* Hero — dark */}
            <section
                className="relative py-20 lg:py-28 overflow-hidden"
                style={{ background: 'linear-gradient(160deg, #060c1a 0%, #0a1020 100%)' }}
            >
                <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(34,211,238,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.04) 1px, transparent 1px)', backgroundSize: '52px 52px' }} />
                <div className="relative z-10 container-insa">
                    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-white/40 text-sm mb-8">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <ChevronRight size={13} />
                        <Link href="/products" className="hover:text-white transition-colors">Products</Link>
                        <ChevronRight size={13} />
                        <span className="text-white/70">{product.name}</span>
                    </nav>
                    <div className="flex items-start gap-5 max-w-2xl">
                        <div className="hidden sm:flex w-14 h-14 rounded-lg items-center justify-center text-cyan-400 shrink-0 mt-1"
                            style={{ background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.2)' }}>
                            {Icon && <Icon size={24} />}
                        </div>
                        <div>
                            <div className="text-xs px-2.5 py-1 rounded text-cyan-400/70 font-medium mb-3 inline-block"
                                style={{ background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.12)' }}>
                                {product.category}
                            </div>
                            <h1 className="text-white font-bold mb-4" style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', lineHeight: 1.15 }}>
                                {product.name}
                            </h1>
                            <p className="text-white/60 text-body-lg leading-relaxed">{product.shortDesc}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section
                className="section-py"
                style={{ background: 'linear-gradient(180deg, #060c1a 0%, #0a1020 60%, #111827 100%)' }}
            >
                <div className="container-insa">
                    <div className="grid lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2">
                            <div className="rounded-lg p-7 mb-6"
                                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                                <h2 className="text-white font-bold text-xl mb-4">About {product.name}</h2>
                                <p className="text-white/60 leading-relaxed text-body-lg">{product.shortDesc}</p>
                                <p className="text-white/50 leading-relaxed mt-4 text-sm">
                                    {product.name} is part of INSA's portfolio of indigenous Ethiopian technology products, engineered to strengthen Ethiopia's digital sovereignty and reduce reliance on foreign cybersecurity infrastructure.
                                </p>
                            </div>

                            <div className="rounded-lg p-6"
                                style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <h3 className="text-white font-semibold text-sm mb-2">For More Information</h3>
                                <p className="text-white/50 text-sm leading-relaxed mb-4">
                                    For detailed technical documentation, deployment inquiries, or licensing information regarding {product.name}, please contact INSA directly.
                                </p>
                                <Link href="/contact" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold text-sm transition-colors">
                                    Contact INSA <ChevronRight size={14} />
                                </Link>
                            </div>
                        </div>

                        <aside className="space-y-5">
                            <div className="rounded-lg p-5"
                                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                                <h3 className="text-white font-semibold text-sm mb-4">Other Products</h3>
                                <ul className="space-y-3">
                                    {PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 5).map((p) => {
                                        const OtherIcon = iconMap[p.icon]
                                        return (
                                            <li key={p.slug}>
                                                <Link href={`/products/${p.slug}`}
                                                    className="flex items-center gap-2.5 text-white/50 hover:text-white text-sm transition-colors group">
                                                    <div className="w-6 h-6 rounded flex items-center justify-center text-white/30 group-hover:text-cyan-400 shrink-0 transition-colors"
                                                        style={{ background: 'rgba(255,255,255,0.04)' }}>
                                                        {OtherIcon && <OtherIcon size={12} />}
                                                    </div>
                                                    {p.name}
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <Link href="/products" className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-semibold text-sm transition-colors">
                                ← All Products
                            </Link>
                        </aside>
                    </div>
                </div>
            </section>
        </>
    )
}
