import os

files_to_fix = [
    "/home/kalilinux/Documents/portal/components/sections/ProductsSection.tsx",
    "/home/kalilinux/Documents/portal/app/products/page.tsx",
    "/home/kalilinux/Documents/portal/app/products/[slug]/page.tsx"
]

to_remove = " onError={(e) => { e.currentTarget.src = '/assets/uploads/products/placeholder.png' }}"

for file_path in files_to_fix:
    with open(file_path, 'r') as f:
        content = f.read()
    
    content = content.replace(to_remove, "")
    
    with open(file_path, 'w') as f:
        f.write(content)
