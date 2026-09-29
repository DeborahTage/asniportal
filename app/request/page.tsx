import Link from 'next/link'
import { ChevronRight, ClipboardCheck } from 'lucide-react'
import { INSA_INFO } from '@/lib/data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Request a Service',
    description: 'Request INSA cybersecurity services — cyber audit, secure systems deployment, digital forensics, and more.',
}

const serviceTypes = [
    'Penetration Testing / Vulnerability Assessment',
    'Cybersecurity Audit',
    'Secure Systems and Infrastructure',
    'Incident Response Assistance',
    'Capacity Building / Training',
    'Digital Forensics Support',
    'PKI / Digital Certificate Services',
    'Compliance (GRC) Consultation',
]

export default function RequestPage() {
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
                        <span className="text-white/70">Request a Service</span>
                    </nav>
                    <div className="flex items-center gap-3 mb-4">
                        <ClipboardCheck size={20} className="text-cyan-400" />
                        <span className="eyebrow text-cyan-400">Service Request</span>
                    </div>
                    <h1 className="text-white font-bold mb-5" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1 }}>
                        Request INSA Services
                    </h1>
                    <p className="text-white/60 text-body-lg max-w-lg">
                        Government institutions and critical infrastructure operators can submit formal service requests to INSA. Our team will evaluate your request and respond within 3 business days.
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="section-py bg-gray-50">
                <div className="container-insa">
                    <div className="grid lg:grid-cols-3 gap-12">

                        {/* Sidebar */}
                        <aside className="space-y-6 order-2 lg:order-1">
                            <div className="bg-white rounded-lg border border-gray-100 p-6">
                                <h2 className="text-gray-900 font-semibold text-sm mb-4">Available Services</h2>
                                <ul className="space-y-2">
                                    {serviceTypes.map((s, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0 mt-1.5" />
                                            {s}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-white rounded-lg border border-gray-100 p-6">
                                <h2 className="text-gray-900 font-semibold text-sm mb-2">Eligibility</h2>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    INSA services are primarily available to Ethiopian government institutions, public enterprises, and operators of critical national infrastructure.
                                </p>
                            </div>

                            <div className="bg-white rounded-lg border border-gray-100 p-5">
                                <h2 className="text-gray-900 font-semibold text-sm mb-2">GRC Portal</h2>
                                <p className="text-gray-500 text-sm mb-3 leading-relaxed">For Governance, Risk & Compliance services, use the dedicated GRC portal.</p>
                                <a href={INSA_INFO.grcUrl} target="_blank" rel="noopener noreferrer" className="btn-outline text-xs px-3 py-2">
                                    Open GRC Portal
                                </a>
                            </div>
                        </aside>

                        {/* Request form */}
                        <div className="lg:col-span-2 order-1 lg:order-2">
                            <div className="bg-white rounded-lg border border-gray-100 p-7 lg:p-10 shadow-card">
                                <h2 className="text-white font-bold text-xl mb-2">Service Request Form</h2>
                                <p className="text-gray-500 text-sm mb-7">Please fill out all required fields. A member of the INSA team will contact you within 3 business days.</p>

                                <form className="space-y-6" aria-label="INSA service request form" noValidate>
                                    {/* Organization info */}
                                    <fieldset>
                                        <legend className="text-gray-900 font-semibold text-sm mb-4 flex items-center gap-2">
                                            <span className="w-5 h-5 rounded bg-brand-blue/10 text-brand-blue text-xs font-bold flex items-center justify-center">1</span>
                                            Institution Information
                                        </legend>
                                        <div className="space-y-4">
                                            <div>
                                                <label htmlFor="inst-name" className="block text-sm font-medium text-gray-700 mb-1.5">
                                                    Institution Name <span className="text-brand-red" aria-hidden="true">*</span>
                                                </label>
                                                <input id="inst-name" name="institutionName" type="text" required
                                                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-brand-blue bg-white" />
                                            </div>
                                            <div className="grid sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label htmlFor="inst-type" className="block text-sm font-medium text-gray-700 mb-1.5">
                                                        Institution Type <span className="text-brand-red" aria-hidden="true">*</span>
                                                    </label>
                                                    <select id="inst-type" name="institutionType" required
                                                        className="w-full px-3.5 py-2.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-brand-blue bg-white">
                                                        <option value="">Select type...</option>
                                                        <option>Federal Government Ministry</option>
                                                        <option>Regional Government Office</option>
                                                        <option>Public Enterprise</option>
                                                        <option>Critical Infrastructure Operator</option>
                                                        <option>Other</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label htmlFor="inst-sector" className="block text-sm font-medium text-gray-700 mb-1.5">
                                                        Sector
                                                    </label>
                                                    <select id="inst-sector" name="sector"
                                                        className="w-full px-3.5 py-2.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-brand-blue bg-white">
                                                        <option value="">Select sector...</option>
                                                        <option>Finance & Banking</option>
                                                        <option>Defense & Security</option>
                                                        <option>Energy & Utilities</option>
                                                        <option>Health & Medical</option>
                                                        <option>Telecommunications</option>
                                                        <option>Education</option>
                                                        <option>Transportation</option>
                                                        <option>Other</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>

                                    {/* Contact info */}
                                    <fieldset>
                                        <legend className="text-gray-900 font-semibold text-sm mb-4 flex items-center gap-2">
                                            <span className="w-5 h-5 rounded bg-brand-blue/10 text-brand-blue text-xs font-bold flex items-center justify-center">2</span>
                                            Contact Person
                                        </legend>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1.5">
                                                    Full Name <span className="text-brand-red" aria-hidden="true">*</span>
                                                </label>
                                                <input id="contact-name" name="contactName" type="text" required autoComplete="name"
                                                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-brand-blue bg-white" />
                                            </div>
                                            <div>
                                                <label htmlFor="contact-title" className="block text-sm font-medium text-gray-700 mb-1.5">
                                                    Job Title
                                                </label>
                                                <input id="contact-title" name="contactTitle" type="text" autoComplete="organization-title"
                                                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-brand-blue bg-white" />
                                            </div>
                                            <div>
                                                <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1.5">
                                                    Official Email <span className="text-brand-red" aria-hidden="true">*</span>
                                                </label>
                                                <input id="contact-email" name="email" type="email" required autoComplete="email"
                                                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-brand-blue bg-white" />
                                            </div>
                                            <div>
                                                <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                                                    Phone Number <span className="text-brand-red" aria-hidden="true">*</span>
                                                </label>
                                                <input id="contact-phone" name="phone" type="tel" required autoComplete="tel"
                                                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-brand-blue bg-white" />
                                            </div>
                                        </div>
                                    </fieldset>

                                    {/* Service */}
                                    <fieldset>
                                        <legend className="text-gray-900 font-semibold text-sm mb-4 flex items-center gap-2">
                                            <span className="w-5 h-5 rounded bg-brand-blue/10 text-brand-blue text-xs font-bold flex items-center justify-center">3</span>
                                            Service Details
                                        </legend>
                                        <div className="space-y-4">
                                            <div>
                                                <label htmlFor="service-type" className="block text-sm font-medium text-gray-700 mb-1.5">
                                                    Service Required <span className="text-brand-red" aria-hidden="true">*</span>
                                                </label>
                                                <select id="service-type" name="serviceType" required
                                                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-brand-blue bg-white">
                                                    <option value="">Select service...</option>
                                                    {serviceTypes.map((s) => <option key={s}>{s}</option>)}
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-1.5">Urgency Level</label>
                                                <select id="urgency" name="urgency"
                                                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-brand-blue bg-white">
                                                    <option value="normal">Normal (within 2 weeks)</option>
                                                    <option value="urgent">Urgent (within 1 week)</option>
                                                    <option value="emergency">Emergency (ASAP)</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1.5">
                                                    Description of Need <span className="text-brand-red" aria-hidden="true">*</span>
                                                </label>
                                                <textarea id="description" name="description" required rows={5}
                                                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-brand-blue bg-white resize-none"
                                                    placeholder="Please describe your cybersecurity need, the systems involved, and any relevant context..." />
                                            </div>
                                        </div>
                                    </fieldset>

                                    <p className="text-gray-400 text-xs">
                                        Fields marked <span className="text-brand-red">*</span> are required. Your request will be reviewed by INSA's technical team.
                                    </p>

                                    <button type="submit" className="btn-primary w-full justify-center py-3.5">
                                        <ClipboardCheck size={15} />
                                        Submit Service Request
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
