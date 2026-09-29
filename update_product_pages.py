import os

# 1. Update app/products/page.tsx
page_file = "/home/kalilinux/Documents/portal/app/products/page.tsx"
with open(page_file, 'r') as f:
    content = f.read()

old_page_icon = "{Icon && <Icon size={18} />}"
new_page_icon = """{/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={`/assets/uploads/products/${product.slug}.png`} alt={product.name} className="w-7 h-7 object-contain" onError={(e) => { e.currentTarget.src = '/assets/uploads/products/placeholder.png' }} />"""

content = content.replace(old_page_icon, new_page_icon)
with open(page_file, 'w') as f:
    f.write(content)


# 2. Update app/products/[slug]/page.tsx
slug_file = "/home/kalilinux/Documents/portal/app/products/[slug]/page.tsx"
with open(slug_file, 'r') as f:
    content = f.read()

old_slug_main = "{Icon && <Icon size={24} />}"
new_slug_main = """{/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={`/assets/uploads/products/${product.slug}.png`} alt={product.name} className="w-10 h-10 object-contain" onError={(e) => { e.currentTarget.src = '/assets/uploads/products/placeholder.png' }} />"""
content = content.replace(old_slug_main, new_slug_main)


old_slug_other = "{OtherIcon && <OtherIcon size={12} />}"
new_slug_other = """{/* eslint-disable-next-line @next/next/no-img-element */}
                                                            <img src={`/assets/uploads/products/${p.slug}.png`} alt={p.name} className="w-4 h-4 object-contain opacity-70 group-hover:opacity-100 transition-opacity" onError={(e) => { e.currentTarget.src = '/assets/uploads/products/placeholder.png' }} />"""

content = content.replace(old_slug_other, new_slug_other)

with open(slug_file, 'w') as f:
    f.write(content)
