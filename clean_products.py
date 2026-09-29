import os
import re

# Refactor ProductsSection.tsx
products_file = "/home/kalilinux/Documents/portal/components/sections/ProductsSection.tsx"
with open(products_file, 'r') as f:
    products = f.read()

# Remove the background gradient
products = re.sub(
    r'style=\{\{\s*background:\s*\'linear-gradient.*?\}\}',
    '',
    products, flags=re.DOTALL
)
products = products.replace('className="section-py"', 'className="section-py bg-slate-900"')

# Strip cyan from eyebrow and replace with slate-400/300
products = products.replace('bg-cyan-400/70', 'bg-slate-400')
products = products.replace('text-cyan-400/80', 'text-slate-400')
products = products.replace('text-cyan-300', 'text-white')

# Strip cyan border hovers
products = products.replace('group-hover:bg-cyan-400/40', 'group-hover:bg-slate-500/50')
products = products.replace('rgba(34,211,238,0.08)', 'rgba(255,255,255,0.05)')
products = products.replace('rgba(34,211,238,0.12)', 'rgba(255,255,255,0.10)')

# Text hovers
products = products.replace('group-hover:text-cyan-200', 'group-hover:text-white')
products = products.replace('text-cyan-400/70', 'text-slate-300')
products = products.replace('hover:text-cyan-300', 'hover:text-white')

with open(products_file, 'w') as f:
    f.write(products)

