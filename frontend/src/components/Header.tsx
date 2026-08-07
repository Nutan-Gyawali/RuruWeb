import { Mail, Phone, Globe } from 'lucide-react'
import type { Language } from '../types'

type HeaderProps = {
    language: Language
    setLanguage: (l: Language) => void
    onLogoClick: () => void
}

export const Header = ({ language, setLanguage, onLogoClick }: HeaderProps) => {
    const brandTitle = language === 'ne' ? 'थोर्गा काठमाण्डौं' : 'Thorga Kathmandu'
    const brandAltTitle = language === 'ne' ? 'Thorga Kathmandu' : 'थोर्गा काठमाण्डौं'
    const brandTag = language === 'ne' ? 'थोर्गा समुदाय' : 'Thorga Community'
    const homeLabel = language === 'ne' ? 'गृहपृष्ठमा जानुहोस्' : 'Go to homepage'

    return (
        <header>
            {/* Top bar */}
            <div className="bg-ink text-paper">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs">
                    <div className="flex items-center gap-5 opacity-80">
                        <a href="mailto:info@thorga.com" className="flex items-center gap-1.5 transition-opacity hover:opacity-100">
                            <Mail className="h-3.5 w-3.5" /> info@thorga.com
                        </a>
                        <a href="tel:+97714000000" className="hidden items-center gap-1.5 transition-opacity hover:opacity-100 sm:flex">
                            <Phone className="h-3.5 w-3.5" /> +977-1-4000000
                        </a>
                    </div>
                    <button
                        onClick={() => setLanguage(language === 'en' ? 'ne' : 'en')}
                        className="flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-medium transition-colors hover:border-brand-on-ink hover:text-brand-on-ink"
                    >
                        <Globe className="h-3.5 w-3.5" />
                        {language === 'en' ? 'नेपाली' : 'English'}
                    </button>
                </div>
            </div>

            {/* Main header */}
            <div className="bg-paper">
                <div className="mx-auto max-w-7xl px-6 py-6">
                    <button
                        onClick={onLogoClick}
                        aria-label={homeLabel}
                        className="group flex w-full items-center gap-4 text-left"
                    >
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-fill text-2xl font-semibold text-on-brand-fill shadow-[var(--shadow-low)] transition-transform group-hover:scale-105">
                            थो
                        </div>
                        <div className="min-w-0">
                            <h1 className="truncate font-display text-[1.7rem] font-semibold tracking-tight text-ink">{brandTitle}</h1>
                            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">{brandTag}</span>
                                <span className="text-xs text-ink-faint">{brandAltTitle}</span>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </header>
    )
}
