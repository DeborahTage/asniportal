import Link from 'next/link'
import { FileText, ChevronRight, Download } from 'lucide-react'
import { DOCUMENTS } from '@/lib/data'

const categories = ['Legislation', 'Standards', 'Frameworks', 'Research & Reports', 'Regulatory']

const categoryColors: Record<string, string> = {
    'Legislation': 'badge-red',
    'Standards': 'badge-blue',
    'Frameworks': 'badge-cyan',
    'Research & Reports': 'badge-gray',
    'Regulatory': 'badge-gray',
}

export function DocumentsSection() {
    const preview = DOCUMENTS.slice(0, 6)

    return (
        <section className="section-py bg-white" aria-labelledby="documents-heading">
            <div className="container-insa">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <span className="w-6 h-px bg-brand-blue" />
                            <span className="eyebrow text-brand-blue">Documents & Resources</span>
                        </div>
                        <h2 id="documents-heading" className="text-h2 text-gray-900 leading-tight">
                            Official Publications
                        </h2>
                    </div>
                    <Link href="/documents" className="inline-flex items-center gap-2 text-brand-blue font-semibold text-sm hover:gap-3 transition-all shrink-0">
                        Resource Library <ChevronRight size={15} />
                    </Link>
                </div>

                {/* Category filter preview */}
                <div className="flex flex-wrap gap-2 mb-7">
                    <button className="px-3 py-1.5 bg-brand-blue text-white text-xs font-semibold rounded transition-colors">
                        All
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-medium rounded transition-colors"
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Document list */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {preview.map((doc) => (
                        <article
                            key={doc.id}
                            className="border border-gray-100 rounded-lg p-5 hover:border-brand-blue/30 hover:shadow-card transition-all group"
                        >
                            <div className="flex items-start gap-4">
                                {/* File icon */}
                                <div className="w-10 h-10 rounded bg-red-50 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-red-100 transition-colors">
                                    <FileText size={17} className="text-brand-red" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    {/* Category + year */}
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <span className={`badge ${categoryColors[doc.category] || 'badge-gray'} text-[10px]`}>
                                            {doc.category}
                                        </span>
                                        <span className="text-gray-300 text-xs">{doc.year}</span>
                                    </div>
                                    <h3 className="text-gray-800 font-semibold text-sm leading-snug mb-1.5 line-clamp-2 group-hover:text-brand-blue transition-colors">
                                        {doc.title}
                                    </h3>
                                    <p className="text-gray-400 text-xs leading-snug line-clamp-2">
                                        {doc.description}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                                <span className="text-xs text-gray-300 font-mono uppercase">{doc.type}</span>
                                <Link
                                    href={`/documents`}
                                    className="inline-flex items-center gap-1 text-brand-blue font-semibold text-xs hover:gap-2 transition-all"
                                    aria-label={`View document: ${doc.title}`}
                                >
                                    <Download size={11} />
                                    Access
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}
