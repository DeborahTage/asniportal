import Link from 'next/link'
import { InteriorHeroBg } from '@/components/hero/InteriorHeroBg'
import { Search, Shield, Cloud, Lock, ClipboardCheck, EyeOff, ChevronRight } from 'lucide-react'
import { SERVICES, INSA_INFO } from '@/lib/data'
import { IncidentCTASection } from '@/components/sections/IncidentCTASection'
import type { Metadata } from 'next'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    Search, Shield, Cloud, Lock, ClipboardCheck, EyeOff
}

export const metadata: Metadata = {
    title: 'Services',
    description: 'INSA cybersecurity services including Digital Forensics, EthioCERT, Fraud Prevention, Cybersecurity Audit, and Counter Intelligence.',
}

export default function ServicesPage() {
    return (
        <>
            {/* Hero */}
            <section className="relative py-20 lg:py-24 overflow-hidden">
                <InteriorHeroBg />
                <div className="relative z-10 container-insa">
                    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-white/40 text-sm mb-8">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <ChevronRight size={13} />
                        <span className="text-white/70">Services</span>
                    </nav>
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-6 h-px bg-cyan-400" />
                            <span className="eyebrow text-cyan-400">INSA Services</span>
                        </div>
                        <h1 className="text-white font-bold mb-5" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1 }}>
                            National Cybersecurity<br />Services
                        </h1>
                        <p className="text-white/60 text-body-lg leading-relaxed">
                            INSA delivers critical cybersecurity services to protect Ethiopia's government institutions, critical infrastructure, and digital ecosystem.
                        </p>
                    </div>
                </div>
            </section>

            {/* Services grid */}
            <section className="section-py bg-gray-50" aria-labelledby="services-list-heading">
                <div className="container-insa">
                    <h2 id="services-list-heading" className="sr-only">All Services</h2>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {SERVICES.map((service) => {
                            const Icon = iconMap[service.icon]
                            return (
                                <article key={service.slug} className="bg-white rounded-lg border border-gray-100 p-7 shadow-card hover:shadow-card-hover hover:border-brand-blue/30 transition-all group">
                                    <div className="flex items-start justify-between mb-5">
                                        <span className="font-mono text-3xl font-black text-gray-100 leading-none">{service.number}</span>
                                        <span className="badge badge-blue">{service.category}</span>
                                    </div>
                                    <div className="w-10 h-10 rounded-md bg-brand-blue/8 flex items-center justify-center text-brand-blue mb-4 group-hover:bg-brand-blue group-hover:text-white transition-all">
                                        {Icon && <Icon size={18} />}
                                    </div>
                                    <h2 className="text-gray-900 font-bold text-lg mb-3 leading-snug">{service.title}</h2>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-6">{service.fullDesc}</p>
                                    <Link href={`/services/${service.slug}`} className="inline-flex items-center gap-1.5 text-brand-blue font-semibold text-sm hover:gap-3 transition-all">
                                        Learn More <ChevronRight size={14} />
                                    </Link>
                                </article>
                            )
                        })}
                    </div>

                    {/* How to request */}
                    <div id="request" className="mt-16 rounded-lg border border-gray-200 bg-white p-8 lg:p-10">
                        <div className="grid lg:grid-cols-2 gap-8 items-center">
                            <div>
                                <h2 className="text-h3 text-gray-900 mb-4">How to Request a Service</h2>
                                <p className="text-gray-500 leading-relaxed mb-6">
                                    Government institutions and critical infrastructure operators can request INSA services through the INSA Request portal. Each service request is reviewed by our technical team.
                                </p>
                                <div className="space-y-3">
                                    {['Submit a service request via the INSA Request portal', 'Our team reviews and validates your request', 'Service delivery timeline is communicated', 'Ongoing support and follow-up provided'].map((step, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <span className="w-5 h-5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                                            <span className="text-gray-600 text-sm">{step}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Link href="/request/cyber-audit" className="btn-primary justify-center">Request Cyber Audit</Link>
                                <Link href="/request/secure-systems" className="btn-outline justify-center">Request Secure Systems</Link>
                                <a href={INSA_INFO.grcUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost justify-center bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200">
                                    Governance Risk & Compliance
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <IncidentCTASection />
        </>
    )
}
