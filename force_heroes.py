import glob
import re

for filepath in glob.glob('/home/kalilinux/Documents/portal/app/**/*.tsx', recursive=True):
    if 'app/page.tsx' in filepath: continue
    
    with open(filepath, 'r') as f:
        content = f.read()

    # RESTORE DARK HERO BACKGROUNDS
    # We replace the class with the dark class + style block + grid block.
    # Note: the grid block might be already present as an empty div due to my previous cleanup.
    # So we replace the entire block up to container-insa.
    regex_hero = r'<section\s+className="relative py-20 lg:py-2[48] overflow-hidden bg-slate-50 border-b border-gray-200"\s*>.*?<div className="relative z-10 container-insa">'
    
    replacement_hero = """<section
                className="relative py-20 lg:py-28 overflow-hidden"
                style={{ background: 'linear-gradient(160deg, #060c1a 0%, #111827 100%)' }}
            >
                <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(34,211,238,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.04) 1px, transparent 1px)', backgroundSize: '52px 52px' }} />
                <div className="relative z-10 container-insa">"""
    
    if re.search(regex_hero, content, flags=re.DOTALL):
        # We matched a light hero! Let's restore the dark styling and text colors
        content = re.sub(regex_hero, replacement_hero, content, flags=re.DOTALL)
        
        # Now convert text-gray/slate inside the hero ONLY to white.
        # It's tricky to do ONLY inside hero via simple replace without parsing. But in these interior pages,
        # generally replacing text-gray-900 with text-white is bad for the grid below.
        # We can target exactly what we know is in the heroes.
        
        # Breadcrumbs
        content = content.replace('text-gray-500 text-sm mb-8', 'text-white/40 text-sm mb-8')
        content = content.replace('hover:text-gray-900 transition-colors">Home', 'hover:text-white transition-colors">Home')
        content = content.replace('className="text-gray-900">About', 'className="text-white/70">About')
        content = content.replace('className="text-gray-900">Services', 'className="text-white/70">Services')
        content = content.replace('className="text-gray-900">News', 'className="text-white/70">News')
        content = content.replace('className="text-gray-900">Products', 'className="text-white/70">Products')
        content = content.replace('className="text-gray-900">Documents', 'className="text-white/70">Documents')
        content = content.replace('className="text-gray-900">Report', 'className="text-white/70">Report')
        content = content.replace('className="text-gray-900">Contact', 'className="text-white/70">Contact')
        
        # Hero Titles H1
        content = content.replace('h1 className="text-gray-900 font-bold', 'h1 className="text-white font-bold')
        content = content.replace('p className="text-gray-600 text-body-lg', 'p className="text-white/60 text-body-lg')
        
    # REMOVE TEXT GRADIENTS EVERYWHERE
    # Look for style={{ background: 'linear-gradient... WebkitBackgroundClip: 'text'... }}
    # We will just strip the style entirely and add a text-brand-blue class if there's a span, OR just strip the gradient.
    # Actually, often it's `<span style={{ background: 'linear-gradient... WebkitBackgroundClip...' }}>`
    
    # We can regex it away. 
    # Example:  <span style={{ background: 'linear-gradient(135deg, #3b82f6, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
    gradient_text_regex = r'style=\{\{\s*background:\s*\'linear-gradient.*?WebkitBackgroundClip.*?\}\}'
    if re.search(gradient_text_regex, content):
        content = re.sub(gradient_text_regex, 'className="text-brand-blue"', content)

    with open(filepath, 'w') as f:
        f.write(content)
