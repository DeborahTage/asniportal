import { INSA_INFO } from '@/lib/data'
import { AlertTriangle, Phone } from 'lucide-react'

export function IncidentCTASection() {
    return (
        <section
            className="relative py-24 overflow-hidden bg-navy-950 border-t border-brand-red/15"
            aria-labelledby="incident-heading"
        >
            {/* Technical grid */}
            <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(rgba(220,38,38,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.06) 1px, transparent 1px)',
                    backgroundSize: '56px 56px',
                }}
                aria-hidden="true"
            />

            <div className="relative z-10 container-insa">
                <div className="max-w-2xl mx-auto text-center">

                    {/* Eyebrow */}
                    <div className="flex items-center justify-center gap-3 mb-5">
                        <span className="w-8 h-px bg-brand-red/40" />
                        <span className="eyebrow text-brand-red/80" style={{ fontSize: '0.65rem' }}>
                            Cyber Incident Reporting
                        </span>
                        <span className="w-8 h-px bg-brand-red/40" />
                    </div>

                    <h2
                        id="incident-heading"
                        className="text-white font-black mb-5"
                        style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}
                    >
                        Experiencing a Cybersecurity Concern?
                    </h2>

                    <p className="text-white/50 leading-relaxed mb-2 max-w-lg mx-auto" style={{ fontSize: '0.975rem' }}>
                        Report cyber incidents, security vulnerabilities, and digital threats to EthioCERT — Ethiopia&apos;s national Computer Emergency Response Team.
                    </p>

                    <p className="text-white/30 text-sm mb-10">
                        EthioCERT operates 24/7 to monitor and respond to national cyber threats.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href={INSA_INFO.reportUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2.5 bg-brand-red hover:bg-brand-red-light text-white font-bold px-8 py-4 rounded-sm text-sm transition-all duration-200 w-full sm:w-auto justify-center"
                        >
                            <AlertTriangle size={16} />
                            Report a Cyber Incident
                        </a>
                        <a
                            href={`tel:${INSA_INFO.contact.phoneAlt}`}
                            className="inline-flex items-center gap-2 border border-white/15 hover:border-white/30 hover:bg-white/5 text-white/65 hover:text-white font-semibold px-8 py-4 rounded-sm text-sm transition-all duration-200 w-full sm:w-auto justify-center"
                        >
                            <Phone size={14} />
                            {INSA_INFO.contact.phone}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
