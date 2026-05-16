import { useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { Github, Star, ExternalLink } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Project {
  name: string
  nameCn: string
  description: string
  descriptionEn: string
  tags: string[]
  stars: number
  image: string
  url: string
}

const projects: Project[] = [
  {
    name: 'CNKI-PDF-Downloader',
    nameCn: '知网 PDF 批量下载助手',
    description: 'CNKI 论文 PDF 批量下载助手。支持抓取本页、批量抓链、期刊等级补全、批量下载与 WebVPN 场景。',
    descriptionEn: 'CNKI paper PDF batch download assistant. Supports page scraping, batch link capture, journal level completion, batch download and WebVPN scenarios.',
    tags: ['JavaScript', 'Legal Tech'],
    stars: 5,
    image: '/project-data-compliance.jpg',
    url: 'https://github.com/sunyifeisb-art/CNKI-PDF-Downloader'
  },
  {
    name: 'lawyer-skills',
    nameCn: '法律 AI 技能集',
    description: '12 个自创法律实务场景 skill，覆盖合同审查、法律检索、案例分析等核心法律工作流。',
    descriptionEn: '12 custom legal practice scenario skills, covering contract review, legal search, case analysis and other core legal workflows.',
    tags: ['Python', 'AI', 'Legal Tech'],
    stars: 1,
    image: '/project-interview-review.jpg',
    url: 'https://github.com/sunyifeisb-art/lawyer-skills'
  },
  {
    name: 'data-compliance-review',
    nameCn: '数据合规智能审查系统',
    description: '数据合规智能审查系统，用于企业数据合规性审查和评估，结合 AI 辅助合规分析。',
    descriptionEn: 'Intelligent data compliance review system for enterprise compliance auditing and assessment with AI-assisted analysis.',
    tags: ['Python', 'Legal Tech'],
    stars: 0,
    image: '/project-email-organizer.jpg',
    url: 'https://github.com/sunyifeisb-art/data-compliance-review'
  },
  {
    name: 'openclaw-codex-account-panel',
    nameCn: 'OpenClaw Codex 账户面板',
    description: 'macOS 应用，查看和管理 OpenClaw Codex 账户、配额、工作空间和使用历史。',
    descriptionEn: 'macOS app for viewing and managing OpenClaw Codex accounts, quotas, workspaces, and usage history.',
    tags: ['JavaScript', 'macOS'],
    stars: 1,
    image: '/project-stock-monitor.jpg',
    url: 'https://github.com/sunyifeisb-art/openclaw-codex-account-panel'
  },
  {
    name: 'openclaw-skill-auto-sync',
    nameCn: 'OpenClaw 技能自动同步',
    description: '本地优先的技能和记忆同步工具，支持 OpenClaw、Codex、Claude Code 和 Workbuddy。',
    descriptionEn: 'Local-first skill and memory sync tool for OpenClaw, Codex, Claude Code, and Workbuddy.',
    tags: ['Python', 'DevOps'],
    stars: 0,
    image: '/project-hetu-lyrics.jpg',
    url: 'https://github.com/sunyifeisb-art/openclaw-skill-auto-sync'
  },
  {
    name: 'agent-keepawake',
    nameCn: 'Agent 防睡眠服务',
    description: 'macOS 笔记本防睡眠与电源感知服务管理。插电唤醒、拔电省电、组件化设计。',
    descriptionEn: 'macOS anti-sleep and power-aware service management. Wake on AC, sleep on battery, modular design.',
    tags: ['Shell', 'macOS'],
    stars: 0,
    image: '/project-transcript-organizer.jpg',
    url: 'https://github.com/sunyifeisb-art/agent-keepawake'
  }
]

export default function ProjectsSection() {
  const { lang, t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const title = titleRef.current
    const grid = gridRef.current
    if (!section || !title || !grid) return

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        title,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      )

      // Cards staggered animation
      const cards = grid.querySelectorAll('.project-card')
      gsap.fromTo(
        cards,
        { opacity: 0, y: 80, rotateX: 15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: grid,
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
      id="projects"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32"
      style={{ background: 'linear-gradient(180deg, #0B1120 0%, #0f172a 50%, #0B1120 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            {t('section_projects')}
          </h2>
          <p className="text-base md:text-lg text-white/50 max-w-xl mx-auto">
            {t('section_projects_sub')}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#4fd1c5] to-[#63b3ed] mx-auto mt-6 rounded-full" />
        </div>

        {/* Projects Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-1000"
        >
          {projects.map((project) => (
            <div
              key={project.name}
              className="project-card glass-card rounded-2xl overflow-hidden group hover:scale-[1.02] transition-all duration-500"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={lang === 'zh' ? project.nameCn : project.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent" />
                {/* Stars badge */}
                {project.stars > 0 && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    <span className="font-mono text-xs text-white">{project.stars}</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#4fd1c5] transition-colors">
                      {lang === 'zh' ? project.nameCn : project.name}
                    </h3>
                    <p className="font-mono text-xs text-white/40 mt-0.5">{project.name}</p>
                  </div>
                </div>

                <p className="text-sm text-white/60 leading-relaxed mb-4 line-clamp-3">
                  {lang === 'zh' ? project.description : project.descriptionEn}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="tag-badge">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#4fd1c5] hover:text-[#63b3ed] transition-colors group/link"
                >
                  <Github size={15} />
                  {t('view_github')}
                  <ExternalLink size={12} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
