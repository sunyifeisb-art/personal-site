import { useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import StarfieldCanvas from './StarfieldCanvas'
import { ArrowDown, Github } from 'lucide-react'
import gsap from 'gsap'

export default function HeroSection() {
  const { t } = useLanguage()
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const tagRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })

    tl.fromTo(
      tagRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )
    .fromTo(
      titleRef.current?.querySelectorAll('.hero-char') || [],
      { opacity: 0, y: 60, rotateX: 45 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.08
      },
      '-=0.4'
    )
    .fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    )
    .fromTo(
      ctaRef.current?.children || [],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.1 },
      '-=0.3'
    )

    return () => { tl.kill() }
  }, [])

  const nameChars = t('hero_name_en').split('')

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      <StarfieldCanvas />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Tag */}
        <span
          ref={tagRef}
          className="inline-block font-mono text-sm md:text-base text-[#4fd1c5] tracking-[0.3em] mb-6 opacity-0"
        >
          {t('hero_tag')}
        </span>

        {/* Name */}
        <div ref={titleRef} className="perspective-1000 mb-4">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-none">
            {nameChars.map((char, i) => (
              <span
                key={i}
                className="hero-char inline-block text-gradient opacity-0"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white/90 mt-2 tracking-widest opacity-0 hero-char">
            {t('hero_name_cn')}
          </p>
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 opacity-0"
        >
          {t('hero_subtitle')}
          <span className="block text-white/40 text-sm mt-1">{t('hero_subtitle_en')}</span>
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#projects"
            className="glass-button px-8 py-3.5 rounded-full text-sm font-semibold text-white flex items-center gap-2"
          >
            {t('hero_cta_projects')}
            <ArrowDown size={16} />
          </a>
          <a
            href="https://github.com/sunyifeisb-art"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-button px-8 py-3.5 rounded-full text-sm font-semibold text-white flex items-center gap-2"
          >
            <Github size={16} />
            {t('hero_cta_github')}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
          <div className="w-1 h-2 rounded-full bg-[#4fd1c5]" />
        </div>
      </div>
    </section>
  )
}
