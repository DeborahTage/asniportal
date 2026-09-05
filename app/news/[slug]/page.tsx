import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { NEWS } from '@/lib/data'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export async function generateStaticParams() {
    return NEWS.map((n) => ({ slug: n.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const article = NEWS.find((n) => n.slug === params.slug)
    if (!article) return {}
    return { title: article.title, description: article.excerpt }
}

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-ET', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function NewsArticlePage({ params }: { params: { slug: string } }) {
    const article = NEWS.find((n) => n.slug === params.slug)
    if (!article) notFound()

    const related = NEWS.filter((n) => n.slug !== article.slug).slice(0, 3)

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
                        <Link href="/news" className="hover:text-white transition-colors">News</Link>
                        <ChevronRight size={13} />
                        <span className="text-white/70 truncate max-w-[200px]">{article.title}</span>
                    </nav>
                    <div className="max-w-3xl">
                        <span className="badge badge-blue mb-4">{article.category}</span>
                        <h1 className="text-white font-bold mb-5" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.75rem)', lineHeight: 1.2 }}>
                            {article.title}
                        </h1>
                        <time dateTime={article.date} className="text-white/40 text-sm">
                            {formatDate(article.date)}
                        </time>
                    </div>
                </div>
            </section>

            {/* Article body */}
            <article className="section-py bg-white">
                <div className="container-insa">
                    <div className="grid lg:grid-cols-4 gap-12">
                        <div className="lg:col-span-3">
                            <div className="max-w-2xl prose prose-gray prose-lg">
                                <p className="text-gray-700 leading-relaxed text-lg">{article.excerpt}</p>
                                <p className="text-gray-500 leading-relaxed">
                                    For additional details and official statements regarding this announcement, please contact the INSA Communications Office or visit the{' '}
                                    <Link href="/news" className="text-brand-blue hover:underline">INSA News section</Link>.
                                </p>
                            </div>
                        </div>

                        <aside className="space-y-6">
                            <div>
                                <h2 className="text-gray-900 font-semibold text-sm mb-4 flex items-center gap-2">
                                    <span className="w-3 h-px bg-brand-blue" />
                                    Related Articles
                                </h2>
                                <ul className="space-y-4">
                                    {related.map((r) => (
                                        <li key={r.slug} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                            <span className="badge badge-blue text-[10px] mb-1.5">{r.category}</span>
                                            <Link href={`/news/${r.slug}`} className="text-gray-800 hover:text-brand-blue text-sm font-medium leading-snug block transition-colors">
                                                {r.title}
                                            </Link>
                                            <time dateTime={r.date} className="text-gray-400 text-xs">{formatDate(r.date)}</time>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <Link href="/news" className="inline-flex items-center gap-1.5 text-brand-blue font-semibold text-sm hover:gap-3 transition-all">
                                ← All News
                            </Link>
                        </aside>
                    </div>
                </div>
            </article>
        </>
    )
}
