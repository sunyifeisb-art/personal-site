import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

type Lang = 'zh' | 'en'

interface Translations {
  [key: string]: string
}

const translations: Record<Lang, Translations> = {
  zh: {
    nav_projects: '项目',
    nav_education: '教育背景',
    nav_about: '关于我',
    nav_github: 'GitHub',
    hero_tag: 'Law × AI Developer',
    hero_name_cn: '路航',
    hero_name_en: 'LU HANG',
    hero_subtitle: '法律与人工智能交叉领域的开发者',
    hero_subtitle_en: 'Developer at the intersection of Law & AI',
    hero_cta_projects: '浏览项目',
    hero_cta_github: 'GitHub 主页',
    section_projects: '开源项目',
    section_projects_sub: '我在 GitHub 上构建的工具与应用',
    section_education: '教育背景',
    section_education_sub: '法律与技术的学术旅程',
    edu_cupl_name: '中国海洋大学',
    edu_cupl_name_en: 'Ocean University of China',
    edu_cupl_degree: '法学学士',
    edu_cupl_desc: '系统学习法学理论与实务，建立扎实的法律分析功底，为法律科技方向奠定专业基础。',
    edu_cuhk_name: '上海交通大学',
    edu_cuhk_name_en: 'Shanghai Jiao Tong University',
    edu_cuhk_degree: '法学硕士',
    edu_cuhk_desc: '在顶尖学术环境中深入研究法律与科技交叉领域，拓展跨学科思维与前沿视野。',
    footer_made_with: '用代码与热情构建',
    footer_copyright: '© 2025 Lu Hang. All rights reserved.',
    view_github: '查看仓库',
    stars: 'Stars',
  },
  en: {
    nav_projects: 'Projects',
    nav_education: 'Education',
    nav_about: 'About',
    nav_github: 'GitHub',
    hero_tag: 'Law × AI Developer',
    hero_name_cn: '路航',
    hero_name_en: 'LU HANG',
    hero_subtitle: 'Developer at the intersection of Law & AI',
    hero_subtitle_en: 'Bridging legal expertise with intelligent systems',
    hero_cta_projects: 'Browse Projects',
    hero_cta_github: 'GitHub Profile',
    section_projects: 'Open Source Projects',
    section_projects_sub: 'Tools and applications I built on GitHub',
    section_education: 'Education',
    section_education_sub: 'My academic journey in Law and Technology',
    edu_cupl_name: 'Ocean University of China',
    edu_cupl_name_en: 'OUC',
    edu_cupl_degree: 'Bachelor of Law',
    edu_cupl_desc: 'Systematic study of legal theory and practice, building a solid foundation in legal analysis for the legal tech direction.',
    edu_cuhk_name: 'Shanghai Jiao Tong University',
    edu_cuhk_name_en: 'SJTU',
    edu_cuhk_degree: 'Master of Law',
    edu_cuhk_desc: 'In-depth research at the intersection of law and technology in a top academic environment, expanding interdisciplinary thinking and frontier perspectives.',
    footer_made_with: 'Built with code and passion',
    footer_copyright: '© 2025 Lu Hang. All rights reserved.',
    view_github: 'View Repo',
    stars: 'Stars',
  }
}

interface LanguageContextType {
  lang: Lang
  t: (key: string) => string
  toggleLang: () => void
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'zh',
  t: (key: string) => key,
  toggleLang: () => {}
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('zh')

  const t = useCallback((key: string) => {
    return translations[lang][key] || key
  }, [lang])

  const toggleLang = useCallback(() => {
    setLang(prev => prev === 'zh' ? 'en' : 'zh')
  }, [])

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
