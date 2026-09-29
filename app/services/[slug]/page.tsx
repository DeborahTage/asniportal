import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { SERVICES } from '@/lib/data'
import { Search, Shield, Cloud, Lock, ClipboardCheck, EyeOff } from 'lucide-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    Search, Shield, Cloud, Lock, ClipboardCheck, EyeOff
}

export async function generateStaticParams() {
    return SERVICES.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const service = SERVICES.find((s) => s.slug === params.slug)
    if (!service) return {}
    return {
        title: service.title,
        description: service.shortDesc,
    }
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
    const service = SERVICES.find((s) => s.slug === params.slug)
    if (!service) notFound()

    const Icon = iconMap[service.icon]

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
                        <Link href="/services" className="hover:text-white transition-colors">Services</Link>
                        <ChevronRight size={13} />
                        <span className="text-white/70">{service.title}</span>
                    </nav>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="eyebrow text-cyan-400 font-mono">{service.number}</span>
                        <span className="w-px h-4 bg-white/20" />
                        <span className="badge badge-blue text-[11px]">{service.category}</span>
                    </div>
                    <div className="flex items-start gap-5 max-w-2xl">
                        <div className="hidden sm:flex w-14 h-14 rounded-lg items-center justify-center text-cyan-400 shrink-0 mt-1"
                            style={{ background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.2)' }}>
                            {Icon && <Icon size={24} />}
                        </div>
                        <div>
                            <h1 className="text-white font-bold mb-4" style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', lineHeight: 1.15 }}>
                                {service.title}
                            </h1>
                            <p className="text-white/60 text-body-lg leading-relaxed">{service.shortDesc}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="section-py bg-white">
                <div className="container-insa">
                    <div className="grid lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2">
                            <h2 className="text-h3 text-gray-900 mb-5">Service Overview</h2>
                            <p className="text-white/60 leading-relaxed text-body-lg mb-8">{service.fullDesc}</p>

                            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                                <h3 className="text-gray-900 font-semibold text-sm mb-3">Request This Service</h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                                    To request this service, government institutions and critical infrastructure operators can submit a request through the INSA Request portal.
                                </p>
                                <Link href="/request/cyber-audit" className="btn-primary text-xs px-4 py-2.5">
                                    Submit a Request
                                </Link>
                            </div>
                        </div>

                        <aside className="space-y-6">
                            <div className="bg-gray-50 rounded-lg border border-gray-100 p-5">
                                <h3 className="text-gray-900 font-semibold text-sm mb-4">Other Services</h3>
                                <ul className="space-y-2">
                                    {SERVICES.filter((s) => s.slug !== service.slug).slice(0, 4).map((s) => (
                                        <li key={s.slug}>
                                            <Link href={`/services/${s.slug}`}
                                                className="text-brand-blue hover:underline text-sm flex items-center gap-1.5">
                                                <span className="font-mono text-gray-300 text-xs">{s.number}</span>
                                                {s.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <Link href="/services" className="inline-flex items-center gap-1.5 text-brand-blue font-semibold text-sm hover:gap-3 transition-all">
                                ← All Services
                            </Link>
                        </aside>
                    </div>
                </div>
            </section>
        </>
    )
}
