import os

filepath = "/home/kalilinux/Documents/portal/app/products/page.tsx"
with open(filepath, 'r') as f:
    content = f.read()

# 1. Hero background flatten
content = content.replace(
'''            <section
                className="relative py-20 lg:py-28 overflow-hidden"
                style={{ background: 'linear-gradient(160deg, #060c1a 0%, #111827 100%)' }}
            >''',
'''            <section className="relative py-20 lg:py-28 overflow-hidden bg-slate-50 border-b border-gray-200">'''
)

# 2. Kill the grid
content = content.replace(
'''<div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(34,211,238,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.04) 1px, transparent 1px)', backgroundSize: '52px 52px' }} />''',
''
)

# 3. Text color fixes in hero natively
content = content.replace(
'''<nav aria-label="Breadcrumb" className="flex items-center gap-2 text-white/40 text-sm mb-8">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <ChevronRight size={13} />
                        <span className="text-white/70">Products</span>
                    </nav>''',
'''<nav aria-label="Breadcrumb" className="flex items-center gap-2 text-gray-500 text-sm mb-8">
                        <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
                        <ChevronRight size={13} />
                        <span className="text-gray-900">Products</span>
                    </nav>'''
)

content = content.replace(
'''<h1 className="text-white font-bold mb-5" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1 }}>''',
'''<h1 className="text-gray-900 font-bold mb-5" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1 }}>'''
)
content = content.replace('text-white/60', 'text-gray-600')

# 4. Products grid section
content = content.replace(
'''            <section
                className="section-py"
                style={{ background: 'linear-gradient(180deg, #060c1a 0%, #0a1020 100%)' }}
                aria-labelledby="products-list-heading"
            >''',
'''            <section className="section-py bg-slate-900" aria-labelledby="products-list-heading">'''
)

# 5. Fix the cards to Solid Slate
content = content.replace(
'''                                <article
                                    key={product.slug}
                                    className="rounded-lg p-6 group relative overflow-hidden"
                                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                                >
                                    {/* Hover glow */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                        style={{ background: 'radial-gradient(ellipse at 30% 0%, rgba(37,99,235,0.18), transparent 70%)' }} />''',
'''                                <article
                                    key={product.slug}
                                    className="rounded-lg p-6 group relative overflow-hidden bg-slate-800 border-none hover:bg-slate-700/80 transition-colors"
                                >'''
)

# 6. Change icon to IMG 
content = content.replace(
'''                                    <div className="relative z-10">
                                        <div className="w-10 h-10 rounded-md flex items-center justify-center text-cyan-400 mb-4"
                                            style={{ background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.18)' }}>
                                            {Icon && <Icon size={18} />}
                                        </div>''',
'''                                    <div className="relative z-10">
                                        <div className="w-10 h-10 rounded-md flex items-center justify-center text-slate-200 mb-4"
                                            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={`/assets/uploads/products/${product.slug}.png`} alt={product.name} className="w-7 h-7 object-contain" />
                                        </div>'''
)

# 7. Labels
content = content.replace('text-cyan-400', 'text-slate-200')
content = content.replace('bg-cyan-400', 'bg-slate-400')
content = content.replace('rgba(34,211,238,0.06)', 'rgba(255,255,255,0.1)')
content = content.replace('1px solid rgba(34,211,238,0.1)', '1px solid rgba(255,255,255,0.08)')
content = content.replace('text-cyan-300', 'text-white')

with open(filepath, 'w') as f:
    f.write(content)
