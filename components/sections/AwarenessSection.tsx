import { AWARENESS_TIPS } from '@/lib/data'

export function AwarenessSection() {
    return (
        <section className="section-py bg-white" aria-labelledby="awareness-heading">
            <div className="container-insa">
                <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">

                    {/* Header */}
                    <div className="lg:sticky lg:top-24">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-6 h-px bg-brand-blue" />
                            <span className="eyebrow text-brand-blue">Cyber Awareness</span>
                        </div>
                        <h2 id="awareness-heading" className="text-h2 text-gray-900 leading-tight mb-5">
                            Protect Yourself<br />Online
                        </h2>
                        <p className="text-gray-500 leading-relaxed text-body-lg">
                            Cybersecurity is a shared responsibility. These fundamental practices help protect you, your organization, and Ethiopia's digital ecosystem from common cyber threats.
                        </p>
                    </div>

                    {/* Tips */}
                    <div className="space-y-0 divide-y divide-gray-100">
                        {AWARENESS_TIPS.map((tip) => (
                            <article
                                key={tip.number}
                                className="py-5 first:pt-0 last:pb-0 flex gap-5 group hover:bg-blue-50/50 -mx-4 px-4 transition-colors rounded"
                            >
                                <span
                                    className="font-mono text-sm font-bold text-brand-blue/40 group-hover:text-brand-blue transition-colors shrink-0 mt-0.5 w-6"
                                >
                                    {tip.number}
                                </span>
                                <div>
                                    <h3 className="text-gray-900 font-semibold text-sm mb-1.5 group-hover:text-brand-blue transition-colors">
                                        {tip.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{tip.desc}</p>
                                </div>
                            </article>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    )
}
