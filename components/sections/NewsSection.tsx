'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Calendar, Tag, ArrowRight } from 'lucide-react'
import { NEWS } from '@/lib/data'

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-ET', {
        year: 'numeric', month: 'long', day: 'numeric'
    })
}

export function NewsSection() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const el = sectionRef.current
        if (!el) return
        const targets = el.querySelectorAll<HTMLElement>('.reveal')
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) } }),
            { threshold: 0.08 }
        )
        targets.forEach((t) => observer.observe(t))
        return () => observer.disconnect()
    }, [])

    const featured = NEWS.find((n) => n.featured)
    const supporting = NEWS.filter((n) => !n.featured).slice(0, 3)

    return (
        <section ref={sectionRef} className="section-py bg-white" aria-labelledby="news-heading">
            <div className="container-insa">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 reveal">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-6 h-px bg-brand-blue" />
                            <span className="eyebrow text-brand-blue">News &amp; Insights</span>
                        </div>
                        <h2
                            id="news-heading"
                            className="text-gray-900 font-black leading-tight"
                            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', letterSpacing: '-0.03em' }}
                        >
                            Latest from INSA
                        </h2>
                    </div>
                    <Link href="/news" className="inline-flex items-center gap-2 text-brand-blue font-semibold text-sm hover:gap-3 transition-all duration-200 shrink-0">
                        All News <ArrowRight size={14} />
                    </Link>
                </div>

                <div className="grid lg:grid-cols-5 gap-6">

                    {/* Featured article */}
                    {featured && (
                        <article className="lg:col-span-3 group border border-gray-100 rounded-sm overflow-hidden hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow duration-300 reveal">
                            {/* YouTube embed */}
                            <div className="h-56 relative overflow-hidden bg-gray-900">
                                <iframe
                                    className="absolute inset-0 w-full h-full"
                                    src="https://www.youtube.com/embed/J1G811hRBug?rel=0"
                                    title="Latest News INSA"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                />
                                <div className="absolute top-4 left-4 z-10 pointer-events-none">
                                    <span className="text-[10px] font-bold uppercase tracking-widest bg-white text-brand-blue px-2.5 py-1 rounded-sm">
                                        {featured.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6 bg-white">
                                <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
                                    <Calendar size={11} />
                                    <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                                    <span className="text-[10px] font-semibold uppercase tracking-wide text-brand-blue ml-1">Featured</span>
                                </div>
                                <h3 className="text-gray-900 font-bold text-lg leading-snug mb-3 group-hover:text-brand-blue transition-colors duration-200">
                                    {featured.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-5">{featured.excerpt}</p>
                                <Link
                                    href={`/news/${featured.slug}`}
                                    className="inline-flex items-center gap-1.5 text-brand-blue font-semibold text-sm hover:gap-3 transition-all duration-200"
                                    aria-label={`Read: ${featured.title}`}
                                >
                                    Read Article <ArrowRight size={13} />
                                </Link>
                            </div>
                        </article>
                    )}

                    {/* Supporting articles */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        {supporting.map((article, idx) => (
                            <article
                                key={article.slug}
                                className={`group border-l-2 border-brand-blue/20 hover:border-brand-blue pl-4 py-1 transition-all duration-200 reveal reveal-delay-${Math.min(idx + 1, 4)}`}
                            >
                                <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
                                    <Tag size={10} />
                                    <span>{article.category}</span>
                                    <span className="text-gray-200">·</span>
                                    <time dateTime={article.date}>{formatDate(article.date)}</time>
                                </div>
                                <h3 className="text-gray-800 font-semibold text-sm leading-snug mb-2.5 group-hover:text-brand-blue transition-colors duration-200 line-clamp-2">
                                    {article.title}
                                </h3>
                                <Link
                                    href={`/news/${article.slug}`}
                                    className="inline-flex items-center gap-1 text-brand-blue font-semibold text-xs hover:gap-2 transition-all duration-200"
                                    aria-label={`Read: ${article.title}`}
                                >
                                    Read article <ArrowRight size={10} />
                                </Link>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
