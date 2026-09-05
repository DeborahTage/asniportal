import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import { INSA_INFO } from '@/lib/data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'About INSA',
    description: 'Learn about INSA — Ethiopia\'s national cybersecurity authority. Mission, vision, values, and mandate.',
}

export default function AboutPage() {
    return (
        <>
            {/* Page Hero */}
            <section
                className="relative py-20 lg:py-28 overflow-hidden"
                style={{ background: 'linear-gradient(160deg, #060c1a 0%, #111827 100%)' }}
            >
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(34,211,238,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.04) 1px, transparent 1px)',
                        backgroundSize: '52px 52px',
                    }}
                />
                <div className="relative z-10 container-insa">
                    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-white/40 text-sm mb-8">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <ChevronRight size={13} />
                        <span className="text-white/70">About</span>
                    </nav>
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-6 h-px bg-cyan-400" />
                            <span className="eyebrow text-cyan-400">About INSA</span>
                        </div>
                        <h1 className="text-white font-bold mb-5" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1 }}>
                            Protecting Ethiopia's<br />Digital Sovereignty
                        </h1>
                        <p className="text-white/60 text-body-lg leading-relaxed">
                            The Information Network Security Administration is Ethiopia's mandated national institution for cybersecurity policy, infrastructure protection, and digital sovereignty.
                        </p>
                    </div>
                </div>
            </section>

            {/* About content */}
            <section className="section-py bg-white">
                <div className="container-insa">
                    <div className="grid lg:grid-cols-3 gap-16">
                        <div className="lg:col-span-2 space-y-10">

                            {/* Mandate */}
                            <div>
                                <h2 className="text-h3 text-gray-900 mb-4">Mandate & Establishment</h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    INSA was established under <strong>Council of Ministers Regulation No. 130/2007</strong> as Ethiopia's lead institution for national information security. The administration operates under the broader national security framework and is responsible for the security of Ethiopia's national information and information infrastructure.
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                    INSA's mandate encompasses policy and standard formulation, regulation and monitoring of key IT infrastructure, National Root Certification Authority (Root CA) administration, and control over the import and export of cybersecurity and sensor technologies.
                                </p>
                            </div>

                            {/* Mission */}
                            <div id="mission" className="rounded-lg p-7 border-l-4 border-brand-blue bg-blue-50">
                                <div className="eyebrow text-brand-blue mb-3">Mission</div>
                                <blockquote className="text-gray-800 text-lg font-medium leading-relaxed italic">
                                    "{INSA_INFO.mission}"
                                </blockquote>
                            </div>

                            {/* Vision */}
                            <div className="rounded-lg p-7 border-l-4 border-cyan-400 bg-cyan-50">
                                <div className="eyebrow text-cyan-700 mb-3">Vision</div>
                                <blockquote className="text-gray-800 text-lg font-medium leading-relaxed italic">
                                    "{INSA_INFO.vision}"
                                </blockquote>
                            </div>

                            {/* Responsibilities */}
                            <div>
                                <h2 className="text-h3 text-gray-900 mb-5">Core Responsibilities</h2>
                                <div className="space-y-4">
                                    {[
                                        {
                                            title: 'Regulatory & Monitoring',
                                            desc: 'Formulates policies, laws, standards, and strategies for key IT infrastructure. Administers the National Root Certification Authority (Root CA) and controls the import and export of cybersecurity and sensor technologies.',
                                        },
                                        {
                                            title: 'Development & Enhancement',
                                            desc: 'Conducts research-based cybersecurity infrastructure development, building indigenous Ethiopian technology to reduce dependence on foreign digital infrastructure.',
                                        },
                                        {
                                            title: 'National Incident Response',
                                            desc: 'Coordinates national cyber incident response through EthioCERT, providing 24/7 monitoring, threat intelligence, and emergency response for critical national infrastructure.',
                                        },
                                        {
                                            title: 'Capacity Building',
                                            desc: 'Develops the national cybersecurity workforce through training, certification, talent programs, and strategic partnerships with academic and institutional partners.',
                                        },
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-4 p-5 border border-gray-100 rounded-lg hover:border-brand-blue/30 transition-colors">
                                            <div className="w-7 h-7 rounded bg-brand-blue/8 text-brand-blue flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                                                {String(i + 1).padStart(2, '0')}
                                            </div>
                                            <div>
                                                <h3 className="text-gray-900 font-semibold text-sm mb-1">{item.title}</h3>
                                                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <aside className="space-y-8">
                            {/* Values */}
                            <div className="bg-gray-50 rounded-lg p-6">
                                <h3 className="text-gray-900 font-semibold text-sm mb-4 flex items-center gap-2">
                                    <span className="w-3 h-px bg-brand-blue" />
                                    Core Values
                                </h3>
                                <ul className="space-y-3">
                                    {INSA_INFO.values.map((v) => (
                                        <li key={v} className="flex items-center gap-3 text-gray-600 text-sm">
                                            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0" />
                                            {v}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Contact */}
                            <div className="bg-navy-800 rounded-lg p-6 text-white">
                                <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
                                    <span className="w-3 h-px bg-cyan-400" />
                                    Contact INSA
                                </h3>
                                <div className="space-y-2 text-sm text-white/60">
                                    <p>{INSA_INFO.contact.address}</p>
                                    <p><a href={`tel:${INSA_INFO.contact.phoneAlt}`} className="hover:text-white transition-colors">{INSA_INFO.contact.phone}</a></p>
                                    <p><a href={`mailto:${INSA_INFO.contact.email}`} className="hover:text-white transition-colors">{INSA_INFO.contact.email}</a></p>
                                    <p className="text-white/40">{INSA_INFO.contact.hours}</p>
                                </div>
                                <Link href="/contact" className="mt-5 block text-center btn-primary text-xs py-2.5">
                                    Visit Contact Page
                                </Link>
                            </div>

                        </aside>
                    </div>
                </div>
            </section>

            {/* Leadership Section */}
            <section className="section-py bg-gray-50 border-t border-gray-100">
                <div className="container-insa">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <div className="flex justify-center items-center gap-3 mb-4">
                            <span className="w-8 h-px bg-cyan-500" />
                            <span className="eyebrow text-cyan-600">INSA Leadership</span>
                            <span className="w-8 h-px bg-cyan-500" />
                        </div>
                        <h2 className="text-h2 text-gray-900 mb-4">Meet Our Visionary Leaders</h2>
                        <p className="text-gray-500 leading-relaxed">
                            Guided by a commitment to national sovereignty and digital excellence, our leadership team drives INSA's mission forward.
                        </p>
                    </div>

                    {/* DG at the top center */}
                    <div className="flex justify-center mb-10">
                        <div className="group w-full max-w-sm inst-card overflow-hidden">
                            <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                                <Image
                                    src="/leaders/tigist.jpg"
                                    alt="Mrs. Tigist Hamid"
                                    fill
                                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-6 text-center border-t border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-1">Mrs. Tigist Hamid</h3>
                                <p className="text-brand-blue font-medium text-sm">Director General</p>
                            </div>
                        </div>
                    </div>

                    {/* DDGs grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                name: "Mr. Daniel Guta",
                                title: "Deputy Director General\nInformation Warfare & Intelligence Sector Head",
                                image: "/leaders/daniel.jpg"
                            },
                            {
                                name: "Mrs. Aster Dawit",
                                title: "Deputy Director General\nIntegrated Support Sector Head",
                                image: "/leaders/aster.jpg"
                            },
                            {
                                name: "Mr. Yodahe Ar'ayaselassie",
                                title: "Deputy Director General\nDigital Public Infrastructure Sector Head",
                                image: "/leaders/yodahe.jpg"
                            },
                            {
                                name: "Mr. Hanibal Lema",
                                title: "Deputy Director General\nInformation Assurance Sector Head",
                                image: "/leaders/hanibal.jpg"
                            }
                        ].map((leader, i) => (
                            <div key={i} className="group inst-card overflow-hidden">
                                <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
                                    <Image
                                        src={leader.image}
                                        alt={leader.name}
                                        fill
                                        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-5 text-center border-t border-gray-100 h-full">
                                    <h3 className="text-base font-bold text-gray-900 mb-1.5">{leader.name}</h3>
                                    <p className="text-gray-500 text-xs leading-relaxed font-medium whitespace-pre-line">
                                        {leader.title}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
