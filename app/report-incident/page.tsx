import Link from 'next/link'
import { ChevronRight, AlertTriangle, Shield, Lock, Info, CheckCircle } from 'lucide-react'
import { INSA_INFO } from '@/lib/data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Report a Cyber Incident',
    description: 'Report cybersecurity incidents, vulnerabilities, and digital threats to EthioCERT — Ethiopia\'s national Computer Emergency Response Team.',
}

export default function ReportIncidentPage() {
    return (
        <>
            {/* Hero */}
            <section
                className="relative py-20 lg:py-24 overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #0a0500 0%, #1a0808 50%, #111827 100%)' }}
            >
                
                <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.12), transparent 70%)' }}
                />
                <div className="relative z-10 container-insa">
                    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-gray-500 text-sm mb-8">
                        <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
                        <ChevronRight size={13} />
                        <span className="text-gray-900">Report Incident</span>
                    </nav>
                    <div className="flex items-center gap-3 mb-4">
                        <AlertTriangle size={20} className="text-brand-red" />
                        <span className="eyebrow text-brand-red">Cyber Incident Reporting</span>
                    </div>
                    <h1 className="text-gray-900 font-bold mb-5" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1 }}>
                        Report a<br />Cyber Incident
                    </h1>
                    <p className="text-gray-600 text-body-lg max-w-lg">
                        Report cybersecurity incidents, threats, and vulnerabilities to EthioCERT — Ethiopia's national Computer Emergency Response Team.
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="section-py bg-gray-50">
                <div className="container-insa">
                    <div className="grid lg:grid-cols-3 gap-12">

                        {/* Info sidebar */}
                        <aside className="space-y-6 order-2 lg:order-1">
                            <div className="bg-white rounded-lg border border-gray-100 p-6">
                                <h2 className="text-gray-900 font-semibold text-sm mb-4 flex items-center gap-2">
                                    <Info size={15} className="text-brand-blue" />
                                    What Can I Report?
                                </h2>
                                <ul className="space-y-2.5 text-sm text-gray-600">
                                    {[
                                        'Unauthorized system access or intrusions',
                                        'Suspected malware or ransomware infections',
                                        'Phishing or social engineering attacks',
                                        'Data breaches or data exfiltration',
                                        'Website defacement on government platforms',
                                        'Distributed Denial of Service (DDoS) attacks',
                                        'Security vulnerabilities in government systems',
                                        'Suspicious digital activity on critical infrastructure',
                                    ].map((item) => (
                                        <li key={item} className="flex items-start gap-2.5">
                                            <CheckCircle size={13} className="text-brand-blue shrink-0 mt-0.5" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-white rounded-lg border border-gray-100 p-6">
                                <h2 className="text-gray-900 font-semibold text-sm mb-4 flex items-center gap-2">
                                    <Shield size={15} className="text-brand-blue" />
                                    What Information Is Needed?
                                </h2>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    {[
                                        'Nature and description of the incident',
                                        'Date and time of discovery',
                                        'Systems and services affected',
                                        'Evidence or indicators of compromise',
                                        'Your contact information (for follow-up)',
                                    ].map((item) => (
                                        <li key={item} className="flex items-start gap-2.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0 mt-1.5" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-white rounded-lg border border-brand-red/20 p-6">
                                <h2 className="text-gray-900 font-semibold text-sm mb-2 flex items-center gap-2">
                                    <AlertTriangle size={15} className="text-brand-red" />
                                    Emergency Contact
                                </h2>
                                <p className="text-gray-500 text-xs leading-relaxed mb-3">
                                    For urgent, ongoing incidents requiring immediate response, contact INSA directly.
                                </p>
                                <a href={`tel:${INSA_INFO.contact.phoneAlt}`} className="text-brand-red font-bold text-sm block hover:underline">
                                    {INSA_INFO.contact.phone}
                                </a>
                            </div>
                        </aside>

                        {/* Main form */}
                        <div className="lg:col-span-2 order-1 lg:order-2">

                            {/* EthioCERT primary CTA */}
                            <div
                                className="rounded-lg p-7 mb-8 border"
                                style={{ background: 'linear-gradient(135deg, #111827 0%, #141d38 100%)', borderColor: 'rgba(220,38,38,0.2)' }}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(220,38,38,0.15)', border: '1px solid rgba(220,38,38,0.3)' }}>
                                        <Shield size={22} className="text-brand-red" />
                                    </div>
                                    <div>
                                        <h2 className="text-gray-900 font-bold text-lg mb-2">Report via EthioCERT Portal</h2>
                                        <p className="text-gray-900/55 text-sm leading-relaxed mb-5">
                                            The primary incident reporting channel is the EthioCERT portal — Ethiopia's national Computer Emergency Response Team. EthioCERT operates 24/7 and will follow up on your report.
                                        </p>
                                        <a
                                            href={INSA_INFO.reportUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn-danger"
                                        >
                                            <AlertTriangle size={15} />
                                            Go to EthioCERT Incident Report
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* General contact form for inquiries */}
                            <div className="bg-white rounded-lg border border-gray-100 p-7 shadow-card">
                                <h2 className="text-gray-900 font-bold text-xl mb-2">General Cybersecurity Inquiry</h2>
                                <p className="text-gray-500 text-sm mb-6">
                                    For general cybersecurity inquiries (not active incidents), use this form to reach INSA.
                                </p>

                                <form className="space-y-5" aria-label="Cybersecurity inquiry form" noValidate>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="reporter-name" className="block text-sm font-medium text-gray-700 mb-1.5">
                                                Full Name <span className="text-brand-red" aria-hidden="true">*</span>
                                            </label>
                                            <input id="reporter-name" name="name" type="text" required autoComplete="name"
                                                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-brand-blue bg-white" />
                                        </div>
                                        <div>
                                            <label htmlFor="reporter-org" className="block text-sm font-medium text-gray-700 mb-1.5">
                                                Organization / Institution <span className="text-brand-red" aria-hidden="true">*</span>
                                            </label>
                                            <input id="reporter-org" name="organization" type="text" required autoComplete="organization"
                                                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-brand-blue bg-white" />
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="reporter-email" className="block text-sm font-medium text-gray-700 mb-1.5">
                                                Email Address <span className="text-brand-red" aria-hidden="true">*</span>
                                            </label>
                                            <input id="reporter-email" name="email" type="email" required autoComplete="email"
                                                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-brand-blue bg-white" />
                                        </div>
                                        <div>
                                            <label htmlFor="reporter-phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                                                Phone Number
                                            </label>
                                            <input id="reporter-phone" name="phone" type="tel" autoComplete="tel"
                                                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-brand-blue bg-white" />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="inquiry-type" className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Inquiry Type <span className="text-brand-red" aria-hidden="true">*</span>
                                        </label>
                                        <select id="inquiry-type" name="inquiryType" required
                                            className="w-full px-3.5 py-2.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-brand-blue bg-white">
                                            <option value="">Select inquiry type...</option>
                                            <option value="general">General Cybersecurity Question</option>
                                            <option value="service">Service Information Request</option>
                                            <option value="document">Document/Standards Request</option>
                                            <option value="partnership">Partnership Inquiry</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="inquiry-message" className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Message <span className="text-brand-red" aria-hidden="true">*</span>
                                        </label>
                                        <textarea id="inquiry-message" name="message" required rows={5}
                                            className="w-full px-3.5 py-2.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-brand-blue bg-white resize-none"
                                            placeholder="Describe your inquiry..." />
                                    </div>

                                    <p className="text-gray-400 text-xs">
                                        Fields marked <span className="text-brand-red">*</span> are required. For active cyber incidents, use the EthioCERT portal above instead.
                                    </p>

                                    <button type="submit" className="btn-primary w-full justify-center py-3">
                                        Submit Inquiry
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
