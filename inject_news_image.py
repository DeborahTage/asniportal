import os
import re
import glob

def flatten_hero(filepath):
    if not os.path.exists(filepath):
        return
    with open(filepath, 'r') as f:
        content = f.read()

    # 1. Dark background -> bg-slate-50 border-b border-gray-200
    if 'style={{ background: \'linear-gradient(160deg, #060c1a 0%, #111827 100%)\' }}' in content:
        content = content.replace(
            '''style={{ background: 'linear-gradient(160deg, #060c1a 0%, #111827 100%)' }}''', 
            '''className="bg-slate-50 border-b border-gray-200"'''
        )
        content = content.replace(
            '''className="relative py-20 lg:py-24 overflow-hidden"''',
            '''className="relative py-20 lg:py-24 overflow-hidden bg-slate-50 border-b border-gray-200"'''
        )
        content = content.replace(
            '''className="relative py-20 lg:py-28 overflow-hidden"''',
            '''className="relative py-20 lg:py-28 overflow-hidden bg-slate-50 border-b border-gray-200"'''
        )
        content = content.replace(
            '''style={{ background: 'linear-gradient(160deg, #060c1a 0%, #111827 100%)' }}''',
            ''
        )
        
    # 2. Text color adjustments in light context
    content = content.replace('text-white/40', 'text-gray-500')
    content = content.replace('text-white/70', 'text-gray-900')
    content = content.replace('text-white/60', 'text-gray-600')
    content = content.replace('text-white', 'text-gray-900')
    
    # 3. Clean up the grid overylay gently
    import re
    content = re.sub(r'<div className="absolute inset-0" style=\{\{ backgroundImage: \'linear-gradient.*?\}\}\s*/>', '', content, flags=re.DOTALL)
    
    with open(filepath, 'w') as f:
        f.write(content)

for filepath in glob.glob('/home/kalilinux/Documents/portal/app/**/page.tsx', recursive=True):
    if 'app/page.tsx' in filepath: continue
    if 'app/about/page.tsx' in filepath: continue
    flatten_hero(filepath)

# Now specifically add the image to the news slug article body
slug_file = '/home/kalilinux/Documents/portal/app/news/[slug]/page.tsx'
with open(slug_file, 'r') as f:
    slug_content = f.read()

# Insert the image before the text content
if '<div className="max-w-2xl prose prose-gray prose-lg">' in slug_content:
    replacement = """<div className="max-w-2xl prose prose-gray prose-lg">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img 
                                    src={`/assets/uploads/news/${article.slug}.jpg`} 
                                    alt={article.title} 
                                    className="w-full h-auto aspect-video object-cover rounded-md mb-8 border border-gray-100" 
                                />"""
    slug_content = slug_content.replace('<div className="max-w-2xl prose prose-gray prose-lg">', replacement)

    with open(slug_file, 'w') as f:
        f.write(slug_content)
