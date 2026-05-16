import { useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { Code2, Scale, Brain, Globe } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AboutSection() {
  const { lang } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    if (!section || !content) return

    const ctx = gsap.context(() => {
      const items = content.querySelectorAll('.about-item')
      gsap.fromTo(
        items,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: content,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  const highlights = [
    {
      icon: Scale,
      title: lang === 'zh' ? '法律专业' : 'Legal Expertise',
      desc: lang === 'zh'
        ? '扎实的法学功底，深入理解法律体系与合规要求'
        : 'Solid legal foundation with deep understanding of legal systems and compliance requirements',
      color: '#4fd1c5'
    },
    {
      icon: Code2,
      title: lang === 'zh' ? '工程能力' : 'Engineering',
      desc: lang === 'zh'
        ? '全栈开发技能，从 Python 后端到 React 前端，构建实用工具'
        : 'Full-stack development skills, from Python backend to React frontend, building practical tools',
      color: '#63b3ed'
    },
    {
      icon: Brain,
      title: lang === 'zh' ? 'AI 应用' : 'AI Applications',
      desc: lang === 'zh'
        ? '将大语言模型与法律实务结合，开发智能助手和自动化工具'
        : 'Integrating LLMs with legal practice, developing intelligent assistants and automation tools',
      color: '#f687b3'
    },
    {
      icon: Globe,
      title: lang === 'zh' ? '前沿视野' : 'Frontier Perspective',
      desc: lang === 'zh'
        ? '在顶尖学术环境中培养跨学科思维，追踪法律科技前沿动态'
        : 'Cultivating interdisciplinary thinking in top academic environments, tracking legal tech frontier trends',
      color: '#a78bfa'
    }
  ]

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32"
      style={{ background: 'linear-gradient(180deg, #0B1120 0%, #0f172a 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Avatar and intro */}
          <div className="text-center lg:text-left">
            <div className="relative inline-block mb-8">
              <div className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-2 border-[#4fd1c5]/30 ring-4 ring-[#4fd1c5]/10 mx-auto lg:mx-0">
                <img
                  src="https://avatars.githubusercontent.com/u/260176615?v=4"
                  alt="Lu Hang"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-[#0B1120] border border-[#4fd1c5]/30 flex items-center justify-center">
                <Code2 size={20} className="text-[#4fd1c5]" />
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              {lang === 'zh' ? '关于我' : 'About Me'}
            </h2>
            <p className="text-lg text-white/60 leading-relaxed max-w-lg mx-auto lg:mx-0">
              {lang === 'zh'
                ? '我是路航，一名在法律与人工智能交叉领域探索的开发者。我相信技术可以让法律服务更高效、更普惠。'
                : 'I am Lu Hang, a developer exploring the intersection of Law and AI. I believe technology can make legal services more efficient and accessible.'}
            </p>
          </div>

          {/* Right: Highlights grid */}
          <div ref={contentRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="about-item glass-card rounded-2xl p-5 hover:scale-[1.02] transition-all duration-300 group"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <item.icon size={20} style={{ color: item.color }} />
                </div>
                <h3 className="text-base font-bold text-white mb-1.5">{item.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
