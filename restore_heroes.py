import glob

def restore_hero(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    original_content = content
    
    # Target exactly the specific hero elements
    if 'bg-slate-50 border-b border-gray-200' in content:
        # Standardize the py spacing for matching
        content = content.replace(
            '''<section className="relative py-20 lg:py-28 overflow-hidden bg-slate-50 border-b border-gray-200">''',
            '''<section
                className="relative py-20 lg:py-28 overflow-hidden"
                style={{ background: 'linear-gradient(160deg, #060c1a 0%, #111827 100%)' }}
            >
                <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(34,211,238,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.04) 1px, transparent 1px)', backgroundSize: '52px 52px' }} />'''
        )
        content = content.replace(
            '''<section className="relative py-20 lg:py-24 overflow-hidden bg-slate-50 border-b border-gray-200">''',
            '''<section
                className="relative py-20 lg:py-24 overflow-hidden"
                style={{ background: 'linear-gradient(160deg, #060c1a 0%, #111827 100%)' }}
            >
                <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(34,211,238,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.04) 1px, transparent 1px)', backgroundSize: '52px 52px' }} />'''
        )

        # Restore text colors inside the hero area.
        # We can just do a very targeted replace on the breadcrumbs and title blocks.
        content = content.replace('className="flex items-center gap-2 text-gray-500 text-sm mb-8"', 'className="flex items-center gap-2 text-white/40 text-sm mb-8"')
        content = content.replace('className="hover:text-gray-900 transition-colors"', 'className="hover:text-white transition-colors"')
        content = content.replace('className="text-gray-900"', 'className="text-white/70"')
        content = content.replace('className="text-gray-900 font-bold', 'className="text-white font-bold')
        content = content.replace('className="text-gray-600', 'className="text-white/60')

        with open(filepath, 'w') as f:
            f.write(content)

for filepath in glob.glob('/home/kalilinux/Documents/portal/app/**/*.tsx', recursive=True):
    if 'app/page.tsx' in filepath: continue
    if 'app/about/page.tsx' in filepath: continue
    restore_hero(filepath)

# For about page, let's treat it separately if needed
about_path = '/home/kalilinux/Documents/portal/app/about/page.tsx'
with open(about_path, 'r') as f:
    about_content = f.read()

about_content = about_content.replace(
    '''<section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-slate-50 border-b border-gray-200">''',
    '''<section
                className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden"
                style={{ background: 'linear-gradient(160deg, #060c1a 0%, #111827 100%)' }}
            >
                <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(34,211,238,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.04) 1px, transparent 1px)', backgroundSize: '52px 52px' }} />'''
)
about_content = about_content.replace('className="flex flex-wrap gap-4 text-gray-500 text-sm mb-12"', 'className="flex flex-wrap gap-4 text-white/40 text-sm mb-12"')
about_content = about_content.replace('text-gray-900 font-black mb-6', 'text-white font-black mb-6')
about_content = about_content.replace('text-gray-600 text-lg leading-relaxed', 'text-white/60 text-lg leading-relaxed')
about_content = about_content.replace('className="flex items-center gap-2 mb-2 text-gray-900"', 'className="flex items-center gap-2 mb-2 text-white"')

with open(about_path, 'w') as f:
    f.write(about_content)
