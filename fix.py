import re

path = '/home/kalilinux/Documents/portal/components/sections/HeroSection.tsx'
with open(path, 'r') as f:
    content = f.read()

# 1. Change DIGITAL FUTURE to Digital Future.
content = content.replace('"DIGITAL FUTURE."', '"Digital Future."')

# 2. Insert INSA Identity Assembly above {/* EYEBROW */}
insa_block = """                        {/* 1. INSA Identity Assembly */}
                        <div className="flex items-center mb-6 select-none relative" aria-label="INSA — Information Network Security Administration">
                            <motion.div initial={init} animate={anim} variants={headerContainerVar} custom={0.5}>
                                {['I', 'N', 'S', 'A'].map((ch, i) => (
                                    <motion.span
                                        key={ch}
                                        variants={bounceCharVar}
                                        style={{
                                            display: 'inline-block',
                                            fontFamily: 'var(--font-inter), Inter, sans-serif',
                                            fontSize: 'clamp(1.55rem, 3vw, 2.4rem)',
                                            fontWeight: 800,
                                            color: '#ffffff',
                                            letterSpacing: '0.07em',
                                            lineHeight: 1,
                                        }}
                                    >
                                        {ch}
                                    </motion.span>
                                ))}
                            </motion.div>
                            {/* Eyebrow / Name */}
                            <motion.div
                                initial={init} animate={anim}
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: { opacity: 1, transition: { delay: 1.0, duration: 0.8 } }
                                }}
                                className="flex items-center h-full ml-4"
                                aria-hidden="true"
                            >
                                <div style={{ width: 1, height: '1.3em', background: 'rgba(255,255,255,0.22)', marginRight: 15 }} />
                                <span style={{
                                    fontFamily: 'var(--font-inter), Inter, sans-serif',
                                    fontSize: '0.575rem', fontWeight: 600, color: 'rgba(255,255,255,0.40)',
                                    letterSpacing: '0.13em', textTransform: 'uppercase', lineHeight: 1.45,
                                    maxWidth: '10rem',
                                }}>
                                    Information<br />Network Security<br />Administration
                                </span>
                            </motion.div>
                        </div>

                        {/* EYEBROW */}"""

content = content.replace('{/* EYEBROW */}', insa_block)

with open(path, 'w') as f:
    f.write(content)
