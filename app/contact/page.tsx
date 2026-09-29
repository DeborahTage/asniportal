import Link from 'next/link'
import { ChevronRight, Phone, Mail, MapPin, Clock, Youtube, Linkedin, Twitter, Facebook, Send } from 'lucide-react'
import { INSA_INFO } from '@/lib/data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Contact',
    description: 'Contact INSA — phone, email, address, and social media.',
}

export default function ContactPage() {
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
                        <span className="text-white/70">Contact</span>
                    </nav>
                    <h1 className="text-white font-bold mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1 }}>Contact INSA</h1>
                    <p className="text-white/60 text-body-lg max-w-lg">Reach out to the Information Network Security Administration through the channels below.</p>
                </div>
            </section>

            {/* Content */}
            <section className="section-py bg-white">
                <div className="container-insa">
                    <div className="grid lg:grid-cols-2 gap-12">

                        {/* Contact info */}
                        <div>
                            <h2 className="text-h3 text-gray-900 mb-8">Get in Touch</h2>

                            <div className="space-y-5">
                                {[
                                    { icon: Phone, label: 'Phone', value: INSA_INFO.contact.phone, href: `tel:${INSA_INFO.contact.phoneAlt}` },
                                    { icon: Mail, label: 'Email', value: INSA_INFO.contact.email, href: `mailto:${INSA_INFO.contact.email}` },
                                    { icon: MapPin, label: 'Address', value: INSA_INFO.contact.address, href: null },
                                    { icon: Clock, label: 'Office Hours', value: INSA_INFO.contact.hours, href: null },
                                ].map(({ icon: Icon, label, value, href }) => (
                                    <div key={label} className="flex items-start gap-4 p-5 border border-gray-100 rounded-lg hover:border-brand-blue/30 transition-colors group">
                                        <div className="w-10 h-10 rounded-md bg-brand-blue/8 flex items-center justify-center text-brand-blue shrink-0 group-hover:bg-brand-blue group-hover:text-gray-900 transition-all">
                                            <Icon size={17} />
                                        </div>
                                        <div>
                                            <div className="text-gray-400 text-xs font-medium mb-0.5">{label}</div>
                                            {href ? (
                                                <a href={href} className="text-gray-800 font-medium hover:text-brand-blue transition-colors">{value}</a>
                                            ) : (
                                                <span className="text-gray-800 font-medium">{value}</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Social */}
                            <div className="mt-8">
                                <h3 className="text-gray-900 font-semibold text-sm mb-4">Follow INSA</h3>
                                <div className="flex flex-wrap gap-3">
                                    {[
                                        { href: INSA_INFO.social.youtube, icon: Youtube, label: 'YouTube' },
                                        { href: INSA_INFO.social.linkedin, icon: Linkedin, label: 'LinkedIn' },
                                        { href: INSA_INFO.social.twitter, icon: Twitter, label: 'X (Twitter)' },
                                        { href: INSA_INFO.social.facebook, icon: Facebook, label: 'Facebook' },
                                        { href: INSA_INFO.social.telegram, icon: Send, label: 'Telegram' },
                                    ].map(({ href, icon: Icon, label }) => (
                                        <a
                                            key={label}
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`INSA on ${label}`}
                                            className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-md text-gray-600 hover:border-brand-blue hover:text-brand-blue text-sm font-medium transition-all"
                                        >
                                            <Icon size={14} />
                                            {label}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Emergency */}
                            <div className="mt-8 rounded-lg border border-brand-red/20 bg-red-50 p-6">
                                <h3 className="text-brand-red font-semibold text-sm mb-2">Cyber Incident Emergency</h3>
                                <p className="text-white/60 text-sm mb-4">For urgent cybersecurity incidents, report directly to EthioCERT — Ethiopia's national emergency response team.</p>
                                <a
                                    href={INSA_INFO.reportUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-danger text-xs px-4 py-2.5"
                                >
                                    Report to EthioCERT
                                </a>
                            </div>
                        </div>

                        {/* Contact form */}
                        <div className="bg-gray-50 rounded-lg p-7 lg:p-8">
                            <h2 className="text-h4 text-gray-900 mb-6">Send a Message</h2>
                            <form className="space-y-5" aria-label="Contact form" noValidate>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1.5">
                                            First Name <span className="text-brand-red" aria-hidden="true">*</span>
                                        </label>
                                        <input
                                            id="first-name"
                                            name="firstName"
                                            type="text"
                                            required
                                            autoComplete="given-name"
                                            className="w-full px-3.5 py-2.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-brand-blue bg-white transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Last Name <span className="text-brand-red" aria-hidden="true">*</span>
                                        </label>
                                        <input
                                            id="last-name"
                                            name="lastName"
                                            type="text"
                                            required
                                            autoComplete="family-name"
                                            className="w-full px-3.5 py-2.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-brand-blue bg-white transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Email Address <span className="text-brand-red" aria-hidden="true">*</span>
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        className="w-full px-3.5 py-2.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-brand-blue bg-white transition-colors"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Organization / Institution
                                    </label>
                                    <input
                                        id="organization"
                                        name="organization"
                                        type="text"
                                        autoComplete="organization"
                                        className="w-full px-3.5 py-2.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-brand-blue bg-white transition-colors"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Subject <span className="text-brand-red" aria-hidden="true">*</span>
                                    </label>
                                    <input
                                        id="subject"
                                        name="subject"
                                        type="text"
                                        required
                                        className="w-full px-3.5 py-2.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-brand-blue bg-white transition-colors"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Message <span className="text-brand-red" aria-hidden="true">*</span>
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={5}
                                        className="w-full px-3.5 py-2.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-brand-blue bg-white transition-colors resize-none"
                                    />
                                </div>

                                <p className="text-gray-400 text-xs">
                                    Fields marked with <span className="text-brand-red">*</span> are required.
                                </p>

                                <button
                                    type="submit"
                                    className="btn-primary w-full justify-center py-3"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
