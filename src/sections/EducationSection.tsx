import { useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { GraduationCap } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function EducationSection() {
  const { lang, t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const title = titleRef.current
    const cards = cardsRef.current
    if (!section || !title || !cards) return

    const ctx = gsap.context(() => {
      // Title zoom & blur reveal
      gsap.fromTo(
        title,
        { opacity: 0, scale: 1.4, filter: 'blur(20px)' },
        {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      )

      // Cards stagger
      const cardEls = cards.querySelectorAll('.edu-card')
      gsap.fromTo(
        cardEls,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: cards,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32"
      style={{ background: 'linear-gradient(180deg, #0B1120 0%, #131c31 50%, #0B1120 100%)' }}
    >
      {/* Decorative gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#4fd1c5]/5 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            {t('section_education')}
          </h2>
          <p className="text-base md:text-lg text-white/50 max-w-xl mx-auto">
            {t('section_education_sub')}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#63b3ed] to-[#f687b3] mx-auto mt-6 rounded-full" />
        </div>

        {/* Education Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* CUPL */}
          <div className="edu-card glass-card rounded-3xl overflow-hidden group">
            <div className="relative h-56 overflow-hidden">
              <img
                src="/edu-cupl.jpg"
                alt={t('edu_cupl_name')}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/30 to-transparent" />
              <div className="absolute bottom-4 left-5 right-5">
                <div className="flex items-center gap-2 text-[#4fd1c5] mb-1">
                  <GraduationCap size={18} />
                  <span className="font-mono text-xs">{t('edu_cupl_degree')}</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-1">
                {lang === 'zh' ? t('edu_cupl_name') : t('edu_cupl_name_en')}
              </h3>
              <p className="font-mono text-sm text-white/40 mb-4">
                {lang === 'zh' ? t('edu_cupl_name_en') : t('edu_cupl_name')}
              </p>
              <p className="text-sm text-white/60 leading-relaxed">
                {t('edu_cupl_desc')}
              </p>
            </div>
          </div>

          {/* CUHK */}
          <div className="edu-card glass-card rounded-3xl overflow-hidden group">
            <div className="relative h-56 overflow-hidden">
              <img
                src="/edu-cuhk.jpg"
                alt={t('edu_cuhk_name')}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/30 to-transparent" />
              <div className="absolute bottom-4 left-5 right-5">
                <div className="flex items-center gap-2 text-[#f687b3] mb-1">
                  <GraduationCap size={18} />
                  <span className="font-mono text-xs">{t('edu_cuhk_degree')}</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-1">
                {lang === 'zh' ? t('edu_cuhk_name') : t('edu_cuhk_name_en')}
              </h3>
              <p className="font-mono text-sm text-white/40 mb-4">
                {lang === 'zh' ? t('edu_cuhk_name_en') : t('edu_cuhk_name')}
              </p>
              <p className="text-sm text-white/60 leading-relaxed">
                {t('edu_cuhk_desc')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
