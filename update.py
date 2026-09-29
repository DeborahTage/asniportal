import re

with open("/home/kalilinux/Documents/portal/components/sections/HeroSection.tsx", "r") as f:
    content = f.read()

new_variants = """/* ─── EASING & VARIANTS ──────────────────────────────────────────── */
const PREMIUM_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const eyebrowVar = {
    hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { delay: 0.8, duration: 1.2, ease: PREMIUM_EASE }
    }
}

const headline1Var = {
    hidden: { opacity: 0, y: 35, filter: 'blur(8px)' },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { delay: 2.0, duration: 1.2, ease: PREMIUM_EASE }
    }
}

const headline2Var = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { delay: 3.3, duration: 1.2, ease: PREMIUM_EASE }
    }
}

const descVar = {
    hidden: { opacity: 0, y: 15, filter: 'blur(4px)' },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { delay: 4.6, duration: 0.9, ease: PREMIUM_EASE }
    }
}

const btn1Var = {
    hidden: { opacity: 0, y: 12 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { delay: 5.5, duration: 0.8, ease: PREMIUM_EASE }
    }
}

const btn2Var = {
    hidden: { opacity: 0, y: 12 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { delay: 5.7, duration: 0.8, ease: PREMIUM_EASE }
    }
}
"""

new_jsx = """                        {/* EYEBROW */}
                        <motion.div
                            className="flex items-center gap-3 mb-8 h-[24px]"
                            initial={init} animate={anim}
                            variants={eyebrowVar}
                        >
                            <span aria-hidden="true" style={{ display: 'block', width: 24, height: 1, background: 'rgba(255,255,255,0.30)', flexShrink: 0 }} />
                            <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.42)' }}>
                                Information Network Security Administration
                            </span>
                        </motion.div>

                        {/* HEADLINE */}
                        <h1 className="mb-7 relative">
                            {/* Line 1 */}
                            <motion.span 
                                className="block mb-1" 
                                initial={init} animate={anim} variants={headline1Var}
                                style={{
                                    fontFamily: 'var(--font-inter), Inter, sans-serif',
                                    fontSize: 'clamp(1.75rem, 3.4vw, 2.6rem)', fontWeight: 400,
                                    color: 'rgba(255,255,255,0.80)', lineHeight: 1.08, letterSpacing: '-0.02em',
                                }}
                            >
                                Securing Ethiopia&#39;s
                            </motion.span>

                            {/* Line 2 */}
                            <motion.span 
                                className="block relative" 
                                initial={init} animate={anim} variants={headline2Var}
                                style={{
                                    fontFamily: 'var(--font-inter), Inter, sans-serif',
                                    fontSize: 'clamp(2.75rem, 5.8vw, 4.75rem)', fontWeight: 800,
                                    color: '#ffffff', lineHeight: 1.00, letterSpacing: '-0.035em',
                                }}
                            >
                                DIGITAL FUTURE.
                            </motion.span>
                        </h1>

                        {/* DESCRIPTION */}
                        <motion.p
                            variants={descVar}
                            initial={init} animate={anim}
                            style={{
                                fontFamily: 'var(--font-inter), Inter, sans-serif',
                                fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)', fontWeight: 300,
                                color: 'rgba(255,255,255,0.55)', lineHeight: 1.78,
                                maxWidth: '36rem', marginBottom: '2.25rem',
                            }}
                        >
                            Protecting Ethiopia&#39;s digital infrastructure through secure,
                            resilient, and trusted technology.
                        </motion.p>

                        {/* CTA BUTTONS */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', alignItems: 'center' }}>
                            <motion.a
                                variants={btn1Var} initial={init} animate={anim}
                                href={INSA_INFO.reportUrl} target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-2.5 font-semibold text-sm px-7 py-3.5 text-white"
                                style={{
                                    background: '#dc2626', borderRadius: 2, textDecoration: 'none', cursor: 'pointer',
                                    transition: 'background 0.2s ease',
                                }}
                                onMouseEnter={e => { e.currentTarget.style.background = '#b91c1c' }}
                                onMouseLeave={e => { e.currentTarget.style.background = '#dc2626' }}
                            >
                                <AlertTriangle size={15} strokeWidth={2.2} />
                                Report a Cyber Incident
                            </motion.a>

                            <motion.div variants={btn2Var} initial={init} animate={anim}>
                                <Link
                                    href="/services"
                                    className="inline-flex items-center gap-2 font-medium text-sm px-7 py-3.5 text-white group"
                                    style={{
                                        border: '1px solid rgba(255,255,255,0.20)', borderRadius: 2, background: 'transparent',
                                        transition: 'border-color .2s ease, background .2s ease',
                                    }}
                                    onMouseEnter={e => {
                                        const el = e.currentTarget
                                        el.style.borderColor = 'rgba(255,255,255,0.50)'
                                        el.style.background = 'rgba(255,255,255,0.05)'
                                    }}
                                    onMouseLeave={e => {
                                        const el = e.currentTarget
                                        el.style.borderColor = 'rgba(255,255,255,0.20)'
                                        el.style.background = 'transparent'
                                    }}
                                >
                                    Explore Our Services
                                    <ArrowRight size={14} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>
                            </motion.div>
                        </div>"""

# Find variants block
start_str = "/* ─── EASING & VARIANTS ──────────────────────────────────────────── */"
end_str = "const ctaVar = {"
idx1 = content.find(start_str)
idx2 = content.find(end_str)
idx2 = content.find("}", idx2) + 1 # wait, ctaVar has a nested function which returns an object so there are multiple bracket levels.
# Let's just use regex for the ctaVar
match = re.search(r'const ctaVar = \{.*?\n\}', content, re.DOTALL)
if match:
    idx2 = match.end()

content = content[:idx1] + new_variants + content[idx2:]

# Now replace the jsx
import re
jsx_start_str = "{/* 1. INSA Identity Assembly */}"
idx3 = content.find(jsx_start_str)
end_jsx = "</div>"

# Find the specific </div> that ends the CTA block. It's right before `{/* 2. RECONSTRUCTION HEADLINE */}`? No, the CTA block is at the bottom of that div.
match2 = re.search(r'\{/\* CTA BUTTONS.*?</div>', content[idx3:], re.DOTALL)
if match2:
    idx4 = idx3 + match2.end()
    content = content[:idx3] + new_jsx + content[idx4:]

# Also remove line1Str and line1Chars
content = re.sub(r'\s*const line1Str = "SECURING ETHIOPIA\'S"\s*const line1Chars = line1Str\.split\(""\)', '', content)

with open("/home/kalilinux/Documents/portal/components/sections/HeroSection.tsx", "w") as f:
    f.write(content)
