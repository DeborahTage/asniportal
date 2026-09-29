import os

# 1. Update ProductsSection.tsx
section_file = "/home/kalilinux/Documents/portal/components/sections/ProductsSection.tsx"
with open(section_file, 'r') as f:
    content = f.read()

# Replace the featured mapping
old_featured = """                                        {(product as any).image ? (
                                            /* eslint-disable-next-line @next/next/no-img-element */
                                            <img src={(product as any).image} alt={product.name} className="w-7 h-7 object-contain" />
                                        ) : (
                                            Icon && <Icon size={17} />
                                        )}"""
new_featured = """                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={`/assets/uploads/products/${product.slug}.png`} alt={product.name} className="w-7 h-7 object-contain" onError={(e) => { e.currentTarget.src = '/assets/uploads/products/placeholder.png' }} />"""

content = content.replace(old_featured, new_featured)

old_other = """                                    {(product as any).image ? (
                                        /* eslint-disable-next-line @next/next/no-img-element */
                                        <img src={(product as any).image} alt={product.name} className="w-5 h-5 object-contain" />
                                    ) : (
                                        Icon && <Icon size={13} />
                                    )}"""
new_other = """                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={`/assets/uploads/products/${product.slug}.png`} alt={product.name} className="w-5 h-5 object-contain" onError={(e) => { e.currentTarget.src = '/assets/uploads/products/placeholder.png' }} />"""

content = content.replace(old_other, new_other)

with open(section_file, 'w') as f:
    f.write(content)

# 2. Make sure the files are mapped correctly inside public/assets/uploads/products/
os.system('mkdir -p /home/kalilinux/Documents/portal/public/assets/uploads/products')
os.system('cp /home/kalilinux/Documents/portal/public/assets/uploads/products/enyuma.png /home/kalilinux/Documents/portal/public/assets/uploads/products/enyuma-iam.png')

# Create a transparent placeholder for missing items
import base64
placeholder = b'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
with open('/home/kalilinux/Documents/portal/public/assets/uploads/products/placeholder.png', 'wb') as f:
    f.write(base64.b64decode(placeholder))

