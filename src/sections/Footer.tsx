import { useLanguage } from '../context/LanguageContext'
import { Github, Mail, Heart } from 'lucide-react'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="relative w-full py-12 border-t border-white/5" style={{ background: '#0B1120' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Brand */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-lg font-bold text-white">LH</span>
            <span className="text-white/30">|</span>
            <span className="text-sm text-white/50">{t('footer_made_with')} <Heart size={12} className="inline text-[#f687b3]" /></span>
          </div>

          {/* Center: Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/sunyifeisb-art"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-[#4fd1c5] transition-colors flex items-center gap-1.5 text-sm"
            >
              <Github size={16} />
              GitHub
            </a>
            <a
              href="mailto:sunyifeisb-art@example.com"
              className="text-white/50 hover:text-[#4fd1c5] transition-colors flex items-center gap-1.5 text-sm"
            >
              <Mail size={16} />
              Email
            </a>
          </div>

          {/* Right: Copyright */}
          <p className="text-xs text-white/30 font-mono">
            {t('footer_copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}
