'use client'

import Link from 'next/link'
import { InteriorHeroBg } from '@/components/hero/InteriorHeroBg'
import { useState } from 'react'
import { FileText, Download, Search, ChevronRight } from 'lucide-react'
import { DOCUMENTS } from '@/lib/data'

const categories = ['All', 'Legislation', 'Standards', 'Frameworks', 'Research & Reports', 'Regulatory']

const categoryColors: Record<string, string> = {
    'Legislation': 'badge-red',
    'Standards': 'badge-blue',
    'Frameworks': 'badge-cyan',
    'Research & Reports': 'badge-gray',
    'Regulatory': 'badge-gray',
}

export default function DocumentsPage() {
    const [activeCategory, setActiveCategory] = useState('All')
    const [query, setQuery] = useState('')

    const filtered = DOCUMENTS.filter((doc) => {
        const matchCat = activeCategory === 'All' || doc.category === activeCategory
        const matchQ = !query || doc.title.toLowerCase().includes(query.toLowerCase()) || doc.description.toLowerCase().includes(query.toLowerCase())
        return matchCat && matchQ
    })

    return (
        <>
            {/* Hero */}
            <section className="relative py-20 lg:py-24 overflow-hidden">
                <InteriorHeroBg />
                <div className="relative z-10 container-insa">
                    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-white/40 text-sm mb-8">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <ChevronRight size={13} />
                        <span className="text-white/70">Documents</span>
                    </nav>
                    <h1 className="text-white font-bold mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1 }}>
                        Resource Library
                    </h1>
                    <p className="text-white/60 text-lg max-w-lg leading-relaxed">Official INSA publications, cybersecurity standards, frameworks, legislation, and technical guidelines.</p>
                </div>
            </section>

            {/* Content */}
            <section className="section-py bg-gray-50">
                <div className="container-insa">
                    {/* Search + filter */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                        <div className="relative flex-1 max-w-sm">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="search"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search documents..."
                                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-blue-600 bg-white"
                                aria-label="Search documents"
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-3 py-2 rounded-md text-xs font-medium transition-colors ${cat === activeCategory ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-600 hover:text-blue-600'}`}
                                    aria-pressed={cat === activeCategory}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Document list */}
                    <div className="bg-white rounded-lg border border-gray-100 overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.05)]">
                        {filtered.length === 0 && (
                            <p className="text-center py-12 text-gray-400 text-sm">No documents match your search.</p>
                        )}
                        {filtered.map((doc, i) => (
                            <div
                                key={doc.id}
                                className={`flex items-start gap-5 p-5 lg:p-6 group hover:bg-blue-50/50 transition-colors ${i < filtered.length - 1 ? 'border-b border-gray-100' : ''}`}
                            >
                                {/* File icon */}
                                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-red-50 flex items-center justify-center shrink-0 group-hover:bg-red-100 transition-colors">
                                    <FileText size={18} className="text-red-600" />
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                        <span className={`badge ${categoryColors[doc.category] || 'badge-gray'} text-[10px]`}>
                                            {doc.category}
                                        </span>
                                        <span className="text-gray-300 text-xs">{doc.year}</span>
                                        <span className="text-gray-300 text-xs font-mono">{doc.type}</span>
                                    </div>
                                    <h2 className="text-gray-900 font-semibold text-sm lg:text-base leading-snug mb-1 group-hover:text-blue-600 transition-colors">
                                        {doc.title}
                                    </h2>
                                    <p className="text-gray-500 text-sm leading-relaxed">{doc.description}</p>
                                </div>

                                {/* Action */}
                                <div className="shrink-0 flex items-center gap-2">
                                    <a
                                        href="#"
                                        className="hidden sm:inline-flex items-center gap-1.5 btn-outline text-xs py-2 px-3"
                                        aria-label={`Download ${doc.title}`}
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <Download size={12} />
                                        Access
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Info note */}
                    <p className="mt-4 text-center text-gray-400 text-xs">
                        For access to restricted documents, please contact INSA directly at{' '}
                        <a href="mailto:contact@insa.gov.et" className="text-blue-600 hover:underline">contact@insa.gov.et</a>
                    </p>
                </div>
            </section>
        </>
    )
}
