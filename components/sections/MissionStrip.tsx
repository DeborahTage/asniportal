'use client'

import { Shield, Globe, Server, Activity } from 'lucide-react'

const pillars = [
    {
        icon: Shield,
        label: 'Cybersecurity',
        desc: 'National cyber defense & threat response',
    },
    {
        icon: Globe,
        label: 'Digital Sovereignty',
        desc: 'Indigenous technology & secure infrastructure',
    },
    {
        icon: Server,
        label: 'Critical Infrastructure',
        desc: "Protecting Ethiopia's digital backbone",
    },
    {
        icon: Activity,
        label: 'Cyber Resilience',
        desc: 'Continuous monitoring & rapid recovery',
    },
]

export function MissionStrip() {
    return (
        <section
            className="border-b border-white/5 bg-navy-950"
            aria-label="Institutional pillars"
        >
            <div className="container-insa py-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/8 rounded-md overflow-hidden">
                    {pillars.map(({ icon: Icon, label, desc }) => (
                        <div
                            key={label}
                            className="bg-navy-900 px-6 py-7 flex items-start gap-4 group hover:bg-navy-800 transition-colors"
                        >
                            <div className="w-8 h-8 flex items-center justify-center rounded bg-brand-blue/15 text-cyan-400 shrink-0 mt-0.5 group-hover:bg-brand-blue/25 transition-colors">
                                <Icon size={16} />
                            </div>
                            <div>
                                <div className="text-white font-semibold text-sm mb-1">{label}</div>
                                <div className="text-white/40 text-xs leading-snug">{desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
