import os
import re

import glob

# Search for all interior page.tsx files that might have the dark hero section
files = [
    "/home/kalilinux/Documents/portal/app/services/page.tsx",
    "/home/kalilinux/Documents/portal/app/services/[slug]/page.tsx",
    "/home/kalilinux/Documents/portal/app/products/page.tsx",
    "/home/kalilinux/Documents/portal/app/products/[slug]/page.tsx",
    "/home/kalilinux/Documents/portal/app/news/page.tsx",
    "/home/kalilinux/Documents/portal/app/news/[slug]/page.tsx"
]

def clean_file(filepath):
    if not os.path.exists(filepath):
        return
    with open(filepath, 'r') as f:
        content = f.read()

    # Remove the dark gradient backgrounds for heroes
    content = re.sub(
        r'className="relative py-20 lg:py-28 overflow-hidden"\s+style=\{\{\s*background:\s*\'linear-gradient\(.*?\}\}',
        'className="relative py-20 lg:py-28 overflow-hidden bg-slate-50 border-b border-gray-200"',
        content, flags=re.DOTALL
    )

    # Remove the grid overlay gradient
    content = re.sub(
        r'backgroundImage:\s*\'linear-gradient.*?backgroundSize:\s*\'52px 52px\'(\s*\}\})?',
        '}',
        content, flags=re.DOTALL
    )

    # Convert floating 3D elements bounding box if they exist to flat layout
    content = content.replace("style={{ transformStyle: 'preserve-3d' }}", "")
    
    # Fix light text to dark text on the light background
    # Since these are in the hero sections, we carefully replace the text colors.
    # Note: this might overreach if there are dark sections below, but standardizing to light backgrounds allows text-gray-900.
    # To be safe, we'll only replace within the specific hero nav structure if possible, 
    # but since these interior pages generally follow the "white background" rule everywhere now, it's safer.
    
    # Actually let's just do targeted replaces for the class strings widely used in the header
    content = content.replace('text-white/40', 'text-gray-500')
    content = content.replace('text-white/70', 'text-gray-900')
    content = content.replace('text-white/60', 'text-gray-600')
    content = content.replace('text-white', 'text-gray-900')

    # Remove glass cards
    content = content.replace('shadow-card', 'shadow-sm')
    
    # Write back
    with open(filepath, 'w') as f:
        f.write(content)

for file in files:
    clean_file(file)
