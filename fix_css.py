import re
with open('app/globals.css', 'r') as f:
    css = f.read()

theme_block = """
@theme {
  --font-sans: var(--font-inter), Inter, system-ui, sans-serif;
  --font-mono: var(--font-jetbrains), JetBrains Mono, monospace;

  --color-navy-950: #060c1a;
  --color-navy-900: #0a1020;
  --color-navy-800: #111827;
  --color-navy-700: #141d38;
  --color-navy-600: #1a2748;
  --color-navy-500: #1e3a8a;
  
  --color-brand-blue: #2563eb;
  --color-brand-blue-light: #3b82f6;
  --color-brand-cyan: #22d3ee;
  --color-brand-cyan-light: #67e8f9;
  --color-brand-red: #dc2626;
  --color-brand-red-light: #ef4444;

  --spacing-18: 4.5rem;
  --spacing-22: 5.5rem;
  --spacing-26: 6.5rem;
  --spacing-30: 7.5rem;
  --spacing-34: 8.5rem;
  --spacing-38: 9.5rem;

  --shadow-glow-blue: 0 0 20px rgba(37, 99, 235, 0.3);
  --shadow-glow-cyan: 0 0 20px rgba(34, 211, 238, 0.3);
  --shadow-glow-red: 0 0 20px rgba(220, 38, 38, 0.4);
  --shadow-glass: 0 8px 32px rgba(0, 0, 0, 0.3);
  --shadow-card: 0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05);
  --shadow-card-hover: 0 4px 16px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.08);

  --animate-fade-in: fadeIn 0.6s ease-out forwards;
  --animate-slide-up: slideUp 0.6s ease-out forwards;
  --animate-pulse-glow: pulseGlow 3s ease-in-out infinite;
  --animate-float: float 6s ease-in-out infinite;
  --animate-network-flow: networkFlow 20s linear infinite;
  --animate-scanline: scanline 4s linear infinite;

  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  @keyframes slideUp {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulseGlow {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.05); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  @keyframes networkFlow {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes scanline {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100%); }
  }
}
"""

css = re.sub(r'@config "\./tailwind\.config\.ts";\n', '', css)
css = re.sub(r'/\* ===== CSS CUSTOM PROPERTIES ===== \*/\n:root \{.*?\n\}\n', theme_block, css, flags=re.DOTALL)

# Fix apply rules
css = css.replace('@apply', '@apply') # Keep as is, it might work in v4 but needs correct setup

with open('app/globals.css', 'w') as f:
    f.write(css)

print("CSS Fixed")
