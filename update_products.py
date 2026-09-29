import re

data_file = "/home/kalilinux/Documents/portal/lib/data.ts"
with open(data_file, 'r') as f:
    data_content = f.read()

# Add images to Data.ts
data_content = re.sub(
    r"(slug:\s*'sirkuni',.*?icon:\s*'MessageSquare',)",
    r"\1\n        image: '/assets/uploads/products/sirkuni.png',",
    data_content,
    flags=re.DOTALL
)

data_content = re.sub(
    r"(slug:\s*'debo',.*?icon:\s*'Server',)",
    r"\1\n        image: '/assets/uploads/products/debo.png',",
    data_content,
    flags=re.DOTALL
)

data_content = re.sub(
    r"(slug:\s*'enyuma-iam',.*?icon:\s*'Users',)",
    r"\1\n        image: '/assets/uploads/products/enyuma.png',",
    data_content,
    flags=re.DOTALL
)

with open(data_file, 'w') as f:
    f.write(data_content)

# Update ProductsSection.tsx
section_file = "/home/kalilinux/Documents/portal/components/sections/ProductsSection.tsx"
with open(section_file, 'r') as f:
    section_content = f.read()

replace_icon_featured = """                                        {(product as any).image ? (
                                            /* eslint-disable-next-line @next/next/no-img-element */
                                            <img src={(product as any).image} alt={product.name} className="w-7 h-7 object-contain" />
                                        ) : (
                                            Icon && <Icon size={17} />
                                        )}"""

section_content = section_content.replace("{Icon && <Icon size={17} />}", replace_icon_featured)

replace_icon_other = """                                    {(product as any).image ? (
                                        /* eslint-disable-next-line @next/next/no-img-element */
                                        <img src={(product as any).image} alt={product.name} className="w-5 h-5 object-contain" />
                                    ) : (
                                        Icon && <Icon size={13} />
                                    )}"""

section_content = section_content.replace("{Icon && <Icon size={13} />}", replace_icon_other)

with open(section_file, 'w') as f:
    f.write(section_content)
