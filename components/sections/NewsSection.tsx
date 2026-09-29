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
                        <article className="lg:col-span-3 group border border-gray-100 rounded-sm overflow-hidden hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow duration-300 reveal flex flex-col">
                            {/* Image embed */}
                            <div className="h-64 relative overflow-hidden bg-gray-100 shrink-0">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img 
                                    src={`/assets/uploads/news/${featured.slug}.jpg`} 
                                    alt={featured.title} 
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                                />
                                <div className="absolute top-4 left-4 z-10 pointer-events-none">
                                    <span className="text-[10px] font-bold uppercase tracking-widest bg-white text-brand-blue px-2.5 py-1 rounded-sm shadow-sm">
                                        {featured.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6 bg-white flex flex-col flex-grow">
                                <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
                                    <Calendar size={11} />
                                    <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                                    <span className="text-[10px] font-semibold uppercase tracking-wide text-brand-blue ml-1 bg-blue-50 px-2 py-0.5 rounded">Featured</span>
                                </div>
                                <h3 className="text-gray-900 font-bold text-xl leading-snug mb-3 group-hover:text-brand-blue transition-colors duration-200 line-clamp-2">
                                    {featured.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">{featured.excerpt}</p>
                                <div className="mt-auto">
                                    <Link
                                        href={`/news/${featured.slug}`}
                                        className="inline-flex items-center gap-1.5 text-brand-blue font-semibold text-sm hover:gap-3 transition-all duration-200"
                                        aria-label={`Read: ${featured.title}`}
                                    >
                                        Read Article <ArrowRight size={13} />
                                    </Link>
                                </div>
                            </div>
                        </article>
                    )}

                    {/* Supporting articles */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        {supporting.map((article, idx) => (
                            <article
                                key={article.slug}
                                className={`group flex gap-4 border border-gray-100 p-3 hover:shadow-md rounded-sm bg-white transition-all duration-200 reveal reveal-delay-${Math.min(idx + 1, 4)} h-full`}
                            >
                                <div className="w-28 h-28 shrink-0 relative overflow-hidden rounded-[2px] bg-gray-100">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img 
                                        src={`/assets/uploads/news/${article.slug}.jpg`} 
                                        alt={article.title} 
                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                    />
                                </div>
                                <div className="flex flex-col justify-center flex-grow py-1">
                                    <div className="flex items-center gap-2 text-brand-blue/70 text-[10px] uppercase font-bold tracking-wider mb-1.5">
                                        <span>{article.category}</span>
                                    </div>
                                    <h3 className="text-gray-900 font-bold text-sm leading-snug mb-2 group-hover:text-brand-blue transition-colors duration-200 line-clamp-3">
                                        {article.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-gray-400 text-[10px] mt-auto">
                                        <time dateTime={article.date}>{formatDate(article.date)}</time>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
