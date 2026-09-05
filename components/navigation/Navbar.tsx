'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { NAV_ITEMS, INSA_INFO } from '@/lib/data'
import { AlertTriangle, Menu, X, ChevronDown, ExternalLink } from 'lucide-react'

export function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
    const pathname = usePathname()
    const navRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 8)
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        setMobileOpen(false)
        setActiveDropdown(null)
    }, [pathname])

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(e.target as Node)) {
                setActiveDropdown(null)
            }
        }
        document.addEventListener('click', handleClick)
        return () => document.removeEventListener('click', handleClick)
    }, [])

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [mobileOpen])

    return (
        <header
            ref={navRef as React.RefObject<HTMLElement>}
            className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
                    ? 'bg-white shadow-[0_1px_12px_rgba(0,0,0,0.10)] border-b border-gray-100'
                    : 'bg-white border-b border-gray-100'
                }`}
        >
            <div className="container-insa">
                <div className="flex items-center justify-between h-16 lg:h-[70px]">

                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center shrink-0"
                        aria-label="INSA Homepage"
                    >
                        <Image
                            src="/insa-logo-full.png"
                            alt="INSA — Information Network Security Administration"
                            width={220}
                            height={60}
                            priority
                            className="hidden sm:block h-10 lg:h-11 w-auto object-contain"
                        />
                        <Image
                            src="/insa-logo-full.png"
                            alt="INSA"
                            width={44}
                            height={44}
                            priority
                            className="sm:hidden h-9 w-auto object-contain object-left"
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
                        {NAV_ITEMS.map((item) => {
                            const isActive = item.href !== '#' && pathname === item.href
                            return (
                                <div key={item.label} className="relative">
                                    {item.children ? (
                                        <>
                                            <button
                                                onClick={() =>
                                                    setActiveDropdown(activeDropdown === item.label ? null : item.label)
                                                }
                                                className={`flex items-center gap-1 px-3.5 py-2 text-sm font-medium transition-colors duration-150 rounded-sm ${activeDropdown === item.label
                                                        ? 'text-brand-blue'
                                                        : 'text-gray-700 hover:text-gray-900'
                                                    }`}
                                                aria-expanded={activeDropdown === item.label}
                                                aria-haspopup="true"
                                            >
                                                {item.label}
                                                <ChevronDown
                                                    size={13}
                                                    className={`transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180 text-brand-blue' : 'text-gray-400'
                                                        }`}
                                                />
                                            </button>

                                            {/* Dropdown */}
                                            {activeDropdown === item.label && (
                                                <div
                                                    className="absolute top-full left-0 mt-2 w-64 rounded-md overflow-hidden bg-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] border border-gray-100"
                                                >
                                                    {item.children.map((child) => (
                                                        <Link
                                                            key={child.label}
                                                            href={child.href}
                                                            target={child.external ? '_blank' : undefined}
                                                            rel={child.external ? 'noopener noreferrer' : undefined}
                                                            className="flex items-center justify-between px-4 py-3 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                                                            onClick={() => setActiveDropdown(null)}
                                                        >
                                                            <span>{child.label}</span>
                                                            {child.external && (
                                                                <ExternalLink size={11} className="text-gray-300" />
                                                            )}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            className={`relative px-3.5 py-2 text-sm font-medium transition-colors duration-150 rounded-sm ${isActive
                                                    ? 'text-brand-blue'
                                                    : 'text-gray-700 hover:text-gray-900'
                                                }`}
                                        >
                                            {item.label}
                                            {/* Active underline */}
                                            {isActive && (
                                                <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-brand-blue rounded-full" />
                                            )}
                                        </Link>
                                    )}
                                </div>
                            )
                        })}
                    </nav>

                    {/* Right side */}
                    <div className="flex items-center gap-2">
                        <a
                            href={INSA_INFO.reportUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:flex items-center gap-1.5 bg-brand-red hover:bg-brand-red-light text-white text-xs lg:text-sm font-semibold px-3.5 lg:px-5 py-2 lg:py-2.5 rounded-sm transition-all duration-200"
                        >
                            <AlertTriangle size={13} className="shrink-0" />
                            <span className="hidden md:inline">Report Cyber Incident</span>
                            <span className="md:hidden">Report</span>
                        </a>

                        {/* Mobile hamburger */}
                        <button
                            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={mobileOpen}
                            aria-controls="mobile-menu"
                        >
                            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div
                    id="mobile-menu"
                    className="lg:hidden fixed inset-0 top-[calc(36px+64px)] z-40 bg-white overflow-y-auto border-t border-gray-100"
                >
                    <nav className="container-insa py-5" aria-label="Mobile navigation">

                        {/* Emergency CTA */}
                        <a
                            href={INSA_INFO.reportUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full bg-brand-red text-white font-semibold text-sm py-3 px-4 rounded-sm mb-5"
                        >
                            <AlertTriangle size={15} />
                            Report a Cyber Incident
                        </a>

                        {NAV_ITEMS.map((item) => (
                            <div key={item.label} className="border-b border-gray-100">
                                {item.children ? (
                                    <div>
                                        <button
                                            onClick={() =>
                                                setActiveDropdown(activeDropdown === item.label ? null : item.label)
                                            }
                                            className="flex items-center justify-between w-full py-3.5 text-gray-800 font-medium text-sm"
                                        >
                                            {item.label}
                                            <ChevronDown
                                                size={14}
                                                className={`text-gray-400 transition-transform ${activeDropdown === item.label ? 'rotate-180 text-brand-blue' : ''
                                                    }`}
                                            />
                                        </button>
                                        {activeDropdown === item.label && (
                                            <div className="pb-2 pl-3">
                                                {item.children.map((child) => (
                                                    <Link
                                                        key={child.label}
                                                        href={child.href}
                                                        target={child.external ? '_blank' : undefined}
                                                        rel={child.external ? 'noopener noreferrer' : undefined}
                                                        className="flex items-center gap-2 py-2.5 text-gray-500 hover:text-gray-900 text-sm"
                                                    >
                                                        <span className="w-1 h-1 rounded-full bg-brand-blue/50 shrink-0" />
                                                        {child.label}
                                                        {child.external && <ExternalLink size={10} className="text-gray-300" />}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className={`block py-3.5 text-sm font-medium ${pathname === item.href ? 'text-brand-blue' : 'text-gray-700 hover:text-gray-900'
                                            }`}
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </div>
                        ))}

                        <div className="mt-6 pt-6 border-t border-gray-100 space-y-1 text-gray-400 text-xs">
                            <p>{INSA_INFO.contact.phone}</p>
                            <p>{INSA_INFO.contact.email}</p>
                            <p>{INSA_INFO.contact.address}</p>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    )
}
