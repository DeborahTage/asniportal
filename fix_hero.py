with open('components/sections/HeroSection.tsx', 'r') as f:
    text = f.read()
text = text.replace('const bounceCharVar = {', 'const bounceCharVar: any = {')
with open('components/sections/HeroSection.tsx', 'w') as f:
    f.write(text)
