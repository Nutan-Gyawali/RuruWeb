import type { Language } from '../types'

export const Header = ({ language, setLanguage }: { language: Language; setLanguage: (l: Language) => void }) => {
    const brandTitle = language === 'ne' ? 'थोर्गा काठमाण्डौं' : 'Thorga Kathmandu'
    const brandAltTitle = language === 'ne' ? 'Thorga Kathmandu' : 'थोर्गा काठमाण्डौं'
    const brandTag = language === 'ne' ? 'थोर्गा समुदाय' : 'Thorga Community'

    return (
        <header>
            {/* Top bar */}
            <div className="flex items-center justify-between bg-sky-200 px-6 py-2 text-xs text-black">
                <span>✉ info@thorga.com · ☎ +977-1-4000000</span>
                <button
                    onClick={() => setLanguage(language === 'en' ? 'ne' : 'en')}
                    className="rounded-md border border-sky-400 bg-sky-300 px-3 py-1 text-xs font-medium text-black transition-colors hover:bg-sky-400 hover:text-black"
                >
                    {language === 'en' ? 'नेपाली' : 'English'}
                </button>
            </div>

            {/* Main header */}
            <div className="flex items-center gap-4 border-b border-sky-200 bg-white px-6 py-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-sky-300 text-xl font-extrabold text-black shadow-sm">
                    T
                </div>
                <div>
                    <h1 className="text-2xl font-extrabold tracking-tight text-black">{brandTitle}</h1>
                    <div className="mt-0.5 flex items-center gap-3">
                        <span className="text-xs font-semibold uppercase tracking-widest text-black">{brandTag}</span>
                        <span className="text-xs text-black">{brandAltTitle}</span>
                    </div>
                </div>
            </div>
        </header>
    )
}
