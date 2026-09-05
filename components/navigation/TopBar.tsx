'use client'

import { INSA_INFO } from '@/lib/data'
import { Phone, MapPin, Mail, Clock, Youtube, Linkedin, Twitter, Facebook, Send } from 'lucide-react'
import Link from 'next/link'

export function TopBar() {
    return (
        <div className="bg-navy-700 border-b border-white/5 text-white/80 text-xs hidden md:block">
            <div className="container-insa">
                <div className="flex items-center justify-between h-9">
                    {/* Left: contact info */}
                    <div className="flex items-center gap-5">
                        <a
                            href={`tel:${INSA_INFO.contact.phoneAlt}`}
                            className="flex items-center gap-1.5 hover:text-white transition-colors"
                            aria-label="Phone number"
                        >
                            <Phone size={11} className="shrink-0" />
                            <span>{INSA_INFO.contact.phone}</span>
                        </a>
                        <span className="w-px h-3 bg-white/20" aria-hidden="true" />
                        <a
                            href={`mailto:${INSA_INFO.contact.email}`}
                            className="flex items-center gap-1.5 hover:text-white transition-colors"
                            aria-label="Email address"
                        >
                            <Mail size={11} className="shrink-0" />
                            <span>{INSA_INFO.contact.email}</span>
                        </a>
                        <span className="w-px h-3 bg-white/20 hidden lg:block" aria-hidden="true" />
                        <span className="hidden lg:flex items-center gap-1.5">
                            <MapPin size={11} className="shrink-0" />
                            <span>{INSA_INFO.contact.address}</span>
                        </span>
                    </div>

                    {/* Right: language + social */}
                    <div className="flex items-center gap-4">
                        {/* Language */}
                        <div className="flex items-center gap-2 text-xs">
                            <Link href="/changelanguage/en" className="font-medium text-white">EN</Link>
                            <span className="text-white/30">|</span>
                            <Link href="/changelanguage/amh" className="hover:text-white transition-colors">አማርኛ</Link>
                        </div>

                        <span className="w-px h-3 bg-white/20" aria-hidden="true" />

                        {/* Social links */}
                        <nav aria-label="Social media links" className="flex items-center gap-2.5">
                            <a
                                href={INSA_INFO.social.youtube}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors p-0.5"
                                aria-label="INSA YouTube channel"
                            >
                                <Youtube size={13} />
                            </a>
                            <a
                                href={INSA_INFO.social.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors p-0.5"
                                aria-label="INSA LinkedIn page"
                            >
                                <Linkedin size={13} />
                            </a>
                            <a
                                href={INSA_INFO.social.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors p-0.5"
                                aria-label="INSA on X (Twitter)"
                            >
                                <Twitter size={13} />
                            </a>
                            <a
                                href={INSA_INFO.social.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors p-0.5"
                                aria-label="INSA Facebook page"
                            >
                                <Facebook size={13} />
                            </a>
                            <a
                                href={INSA_INFO.social.telegram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors p-0.5"
                                aria-label="INSA Telegram channel"
                            >
                                <Send size={13} />
                            </a>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}
