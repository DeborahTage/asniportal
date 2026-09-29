import re

file_path = "/home/kalilinux/Documents/portal/app/news/page.tsx"
with open(file_path, 'r') as f:
    text = f.read()

# Replace the gradient block with an image box using the slug pattern
gradient_visual_regex = r'<div\n\s*className="h-40 relative overflow-hidden"\n\s*style=\{\{.*?backgroundSize: \'24px 24px\' \}\}.*?</div>'

replacement = """<div className="h-40 relative overflow-hidden bg-gray-100">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img 
                                        src={`/assets/uploads/news/${article.slug}.jpg`} 
                                        alt={article.title} 
                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                    />"""

text = re.sub(gradient_visual_regex, replacement, text, flags=re.DOTALL)

with open(file_path, 'w') as f:
    f.write(text)
