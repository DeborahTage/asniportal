import Link from 'next/link'
import { Calendar, Tag, ChevronRight, Search } from 'lucide-react'
import { NEWS } from '@/lib/data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'News',
    description: 'Latest news, announcements, and updates from INSA — Ethiopia\'s national cybersecurity authority.',
}

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-ET', { year: 'numeric', month: 'long', day: 'numeric' })
}

const categories = ['All', 'Policy & Legislation', 'Capacity Building', 'Partnerships', 'Incident Response']

export default function NewsPage() {
    return (
        <>
            {/* Hero */}
            <section
                className="relative py-20 lg:py-24 overflow-hidden"
                style={{ background: 'linear-gradient(160deg, #060c1a 0%, #111827 100%)' }}
            >
                <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(34,211,238,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.04) 1px, transparent 1px)', backgroundSize: '52px 52px' }} />
                <div className="relative z-10 container-insa">
                    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-white/40 text-sm mb-8">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <ChevronRight size={13} />
                        <span className="text-white/70">News</span>
                    </nav>
                    <h1 className="text-white font-bold mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1 }}>
                        News & Announcements
                    </h1>
                    <p className="text-white/60 text-body-lg max-w-lg">Latest updates from INSA on cybersecurity policy, capacity building, partnerships, and national digital security initiatives.</p>
                </div>
            </section>

            {/* Filter + news */}
            <section className="section-py bg-gray-50">
                <div className="container-insa">
                    {/* Filter bar */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-10">
                        <div className="relative flex-1 max-w-sm">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="search"
                                placeholder="Search news..."
                                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-brand-blue bg-white"
                                aria-label="Search news"
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat, i) => (
                                <button
                                    key={cat}
                                    className={`px-3 py-2 rounded-md text-xs font-medium transition-colors ${i === 0 ? 'bg-brand-blue text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-brand-blue hover:text-brand-blue'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* News grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {NEWS.map((article) => (
                            <article key={article.slug} className="bg-white rounded-lg border border-gray-100 overflow-hidden shadow-card hover:shadow-card-hover transition-all group">
                                {/* Visual */}
                                <div
                                    className="h-40 relative overflow-hidden"
                                    style={{ background: 'linear-gradient(135deg, #111827 0%, #1e3a8a 100%)' }}
                                >
                                    <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(34,211,238,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.05) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                                    <div className="absolute bottom-4 left-4">
                                        <span className="badge badge-blue">{article.category}</span>
                                    </div>
                                    {article.featured && (
                                        <div className="absolute top-4 right-4 px-2 py-0.5 bg-white/10 text-white/60 text-[10px] font-semibold rounded uppercase tracking-wide">
                                            Featured
                                        </div>
                                    )}
                                </div>
                                <div className="p-5">
                                    <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
                                        <Calendar size={11} />
                                        <time dateTime={article.date}>{formatDate(article.date)}</time>
                                    </div>
                                    <h2 className="text-gray-900 font-bold text-base leading-snug mb-3 group-hover:text-brand-blue transition-colors line-clamp-3">
                                        {article.title}
                                    </h2>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{article.excerpt}</p>
                                    <Link
                                        href={`/news/${article.slug}`}
                                        className="inline-flex items-center gap-1.5 text-brand-blue font-semibold text-xs hover:gap-3 transition-all"
                                        aria-label={`Read: ${article.title}`}
                                    >
                                        Read Article <ChevronRight size={12} />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
