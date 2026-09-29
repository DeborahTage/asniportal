import re
with open('next.config.ts', 'r') as f:
    text = f.read()
text = re.sub(r'devIndicators:.*?\},', '', text, flags=re.DOTALL)
with open('next.config.ts', 'w') as f:
    f.write(text)
