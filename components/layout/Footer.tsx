import Link from 'next/link'
import Image from 'next/image'
import { INSA_INFO, FOOTER_LINKS } from '@/lib/data'
import { Phone, Mail, MapPin, Clock, Youtube, Linkedin, Twitter, Facebook, Send, AlertTriangle, Shield } from 'lucide-react'

export function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="bg-navy-950 text-white border-t border-white/5" role="contentinfo">

            {/* Incident CTA Banner */}
            <div className="bg-brand-red/10 border-b border-brand-red/20">
                <div className="container-insa py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <AlertTriangle className="text-brand-red shrink-0" size={18} />
                        <span className="text-sm text-white/80">
                            Experiencing a cyber incident?{' '}
                            <span className="text-white font-medium">Report it immediately to EthioCERT.</span>
                        </span>
                    </div>
                    <a
                        href={INSA_INFO.reportUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 btn-danger text-xs px-4 py-2"
                    >
                        Report Now
                    </a>
                </div>
            </div>

            {/* Main Footer */}
            <div className="container-insa py-14 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

                    {/* Brand column */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-3 mb-5" aria-label="INSA Homepage">
                            <Image
                                src="/insa-logo-full.png"
                                alt="INSA"
                                width={240}
                                height={60}
                                className="h-12 w-auto object-contain brightness-0 invert"
                            />
                        </Link>

                        <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-6">
                            Ethiopia's national authority for cybersecurity, information security policy, and digital sovereignty. Established under Council of Ministers Regulation No. 130/2007.
                        </p>

                        {/* Contact */}
                        <div className="space-y-2.5 text-sm">
                            <a href={`tel:${INSA_INFO.contact.phoneAlt}`} className="flex items-start gap-2.5 text-white/50 hover:text-white transition-colors">
                                <Phone size={14} className="mt-0.5 shrink-0 text-cyan-400/60" />
                                <span>{INSA_INFO.contact.phone}</span>
                            </a>
                            <a href={`mailto:${INSA_INFO.contact.email}`} className="flex items-start gap-2.5 text-white/50 hover:text-white transition-colors">
                                <Mail size={14} className="mt-0.5 shrink-0 text-cyan-400/60" />
                                <span>{INSA_INFO.contact.email}</span>
                            </a>
                            <div className="flex items-start gap-2.5 text-white/50">
                                <MapPin size={14} className="mt-0.5 shrink-0 text-cyan-400/60" />
                                <span>{INSA_INFO.contact.address}</span>
                            </div>
                            <div className="flex items-start gap-2.5 text-white/50">
                                <Clock size={14} className="mt-0.5 shrink-0 text-cyan-400/60" />
                                <span>{INSA_INFO.contact.hours}</span>
                            </div>
                        </div>

                        {/* Social */}
                        <nav aria-label="Social media" className="flex items-center gap-3 mt-5">
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
                                    className="w-8 h-8 rounded flex items-center justify-center text-white/40 hover:text-white border border-white/8 hover:border-white/20 hover:bg-white/5 transition-all"
                                >
                                    <Icon size={13} />
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* About links */}
                    <FooterCol title="About" links={FOOTER_LINKS.about} />

                    {/* Services links */}
                    <FooterCol title="Services" links={FOOTER_LINKS.services} />

                    {/* Products + Resources */}
                    <div>
                        <FooterCol title="Products" links={FOOTER_LINKS.products} />
                        <div className="mt-6">
                            <FooterCol title="Resources" links={FOOTER_LINKS.resources} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/5">
                <div className="container-insa py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/30">
                    <span>{INSA_INFO.copyright}</span>
                    <div className="flex items-center gap-4">
                        <Link href="/about" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
                        <Link href="/about" className="hover:text-white/60 transition-colors">Legal Notice</Link>
                        <Link href="/contact" className="hover:text-white/60 transition-colors">Contact</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
    return (
        <div>
            <h3 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
                <span className="w-4 h-px bg-cyan-400/60" />
                {title}
            </h3>
            <ul className="space-y-2.5">
                {links.map((link) => (
                    <li key={link.label}>
                        <Link
                            href={link.href}
                            className="text-white/45 hover:text-white text-sm transition-colors hover:translate-x-0.5 inline-block"
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
