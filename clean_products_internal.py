import re

file_path = "/home/kalilinux/Documents/portal/app/products/page.tsx"
with open(file_path, 'r') as f:
    text = f.read()

# Make section stark navy
text = re.sub(
    r'style=\{\{\s*background:\s*\'linear-gradient\(180deg.*?\}\}', 
    '', 
    text, flags=re.DOTALL
)
text = text.replace('className="section-py"', 'className="section-py bg-slate-900"')

# Strip the hover glow bubbles
text = re.sub(
    r'<div className="absolute inset-0.*?radial-gradient.*?/>',
    '',
    text, flags=re.DOTALL
)

# Convert cards to flat solid
text = text.replace(
    '''style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}''',
    '''className="rounded-lg p-6 group relative overflow-hidden bg-slate-800 border-none hover:bg-slate-700/80 transition-colors"'''
)

# Clean up cyan in products
text = text.replace('text-cyan-400', 'text-slate-200')
text = text.replace('bg-cyan-400', 'bg-slate-400')
text = text.replace('rgba(34,211,238,0.1)', 'rgba(255,255,255,0.08)')
text = text.replace('rgba(34,211,238,0.18)', 'rgba(255,255,255,0.12)')
text = text.replace('rgba(34,211,238,0.06)', 'rgba(255,255,255,0.1)')
text = text.replace('text-cyan-300', 'text-white')

with open(file_path, 'w') as f:
    f.write(text)
