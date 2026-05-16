import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { Github, Menu, X } from 'lucide-react'

export default function Navigation() {
  const { lang, t, toggleLang } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#projects', label: t('nav_projects') },
    { href: '#education', label: t('nav_education') },
    { href: '#about', label: t('nav_about') },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0B1120]/80 backdrop-blur-xl border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#"
            className="font-mono text-lg font-bold tracking-wider text-white hover:text-[#4fd1c5] transition-colors"
          >
            LH
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4fd1c5] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <a
              href="https://github.com/sunyifeisb-art"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-white/70 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Github size={16} />
              {t('nav_github')}
            </a>
            <button
              onClick={toggleLang}
              className="glass-button px-3 py-1.5 rounded-full text-xs font-mono font-medium text-white/80 hover:text-white"
            >
              {lang === 'zh' ? 'EN' : '中文'}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={toggleLang}
              className="glass-button px-2.5 py-1 rounded-full text-xs font-mono font-medium text-white/80"
            >
              {lang === 'zh' ? 'EN' : '中文'}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0B1120]/95 backdrop-blur-xl border-b border-white/10">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block text-base font-medium text-white/70 hover:text-white transition-colors py-2"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://github.com/sunyifeisb-art"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-base font-medium text-white/70 hover:text-white transition-colors py-2"
            >
              <Github size={18} />
              {t('nav_github')}
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
