import os
import re

# 1. Update globals.css
css_file = "/home/kalilinux/Documents/portal/app/globals.css"
with open(css_file, 'r') as f:
    css = f.read()

# Replace glass-card and animated border classes with clean institutional fallbacks
glass_card_replacement = """/* Clean Institutional Card */
.glass-card, .glass-card-hover {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
}

.glass-card-hover:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border-color: #d1d5db;
}"""

css = re.sub(r'/\* Glass card \(dark\).*?\.glass-card-hover:hover \{.*?\}', glass_card_replacement, css, flags=re.DOTALL)
css = re.sub(r'--shadow-glow-[a-z]+:.*?;', '', css)
css = re.sub(r'/\* Animated border.*?\.animated-border:hover::before \{.*?\}', '', css, flags=re.DOTALL)

with open(css_file, 'w') as f:
    f.write(css)


# 2. Update app/about/page.tsx
about_file = "/home/kalilinux/Documents/portal/app/about/page.tsx"
with open(about_file, 'r') as f:
    about = f.read()

# Remove the dark gradient from the hero
about = re.sub(
    r'className="relative py-20 lg:py-28 overflow-hidden"\s+style=\{\{\s*background:\s*\'linear-gradient\(.*?\}\}',
    'className="relative py-20 lg:py-28 overflow-hidden bg-slate-50 border-b border-gray-200"',
    about, flags=re.DOTALL
)

# Remove the grid overlay gradient
about = re.sub(
    r'backgroundImage:\s*\'linear-gradient.*?backgroundSize:\s*\'52px 52px\',',
    '',
    about, flags=re.DOTALL
)

# Text color fixes for the lightened hero
about = about.replace('text-white/40', 'text-gray-500')
about = about.replace('text-white/70', 'text-gray-900')
about = about.replace('text-white/60', 'text-gray-600')
about = about.replace('text-white', 'text-gray-900')

# Update contact box which was navy
about = about.replace('bg-navy-800', 'bg-slate-900')

with open(about_file, 'w') as f:
    f.write(about)
