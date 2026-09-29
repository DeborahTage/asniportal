import os
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

def fix_file(filepath):
    if not os.path.exists(filepath):
        return
    with open(filepath, 'r') as f:
        content = f.read()

    # Fix the bracket error
    content = content.replace('style={{ } />', 'style={{}} />')
    
    # Check if there are other syntax errors in the file, specially app/products/page.tsx
    if 'products/page.tsx' in filepath:
        # Wait, the products page had an error at line 47?
        pass

    with open(filepath, 'w') as f:
        f.write(content)

for file in files:
    fix_file(file)

# The products script might have caused a JSX fragment destruction? Let's check products/page.tsx
