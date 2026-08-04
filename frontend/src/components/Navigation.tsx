import { useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'
import type { Language, MainPage, IntroductionPage, PublicationPage } from '../types'
import { getLocalizedMenuLabel } from '../utils'

const introMenuItems: { id: IntroductionPage; labelEn: string; labelNe: string }[] = [
    { id: 'company-intro', labelEn: 'Company Intro', labelNe: 'संस्था परिचय' },
    { id: 'thorga-intro', labelEn: "Thorga's Introduction", labelNe: 'थोर्गाको परिचय' },
    { id: 'current-members', labelEn: 'Current Members', labelNe: 'वर्तमान सदस्य' },
    { id: 'current-advisors', labelEn: 'Current Advisors', labelNe: 'वर्तमान सल्लाहकार' },
    { id: 'past-members', labelEn: 'Past Members', labelNe: 'पूर्व सदस्य' },
    { id: 'past-advisors', labelEn: 'Past Advisors', labelNe: 'पूर्व सल्लाहकार' },
]

const publicationMenuItems: { id: PublicationPage; labelEn: string; labelNe: string }[] = [
    { id: 'calendar', labelEn: 'Calendar', labelNe: 'क्यालेन्डर' },
    { id: 'phone-diary', labelEn: 'Phone Diary', labelNe: 'फोन डायरी' },
    { id: 'bulletin', labelEn: 'Bulletin', labelNe: 'बुलेटिन' },
    { id: 'memories', labelEn: 'Memories', labelNe: 'स्मृतिहरू' },
    { id: 'others', labelEn: 'Others', labelNe: 'अन्य' },
]

type NavigationProps = {
    language: Language
    selectedMainPage: MainPage
    selectedIntroPage: IntroductionPage
    selectedPublicationPage: PublicationPage
    openSimplePage: (page: MainPage) => void
    openIntroductionPage: (page: IntroductionPage) => void
    openPublicationPage: (page: PublicationPage) => void
}

export const Navigation = (props: NavigationProps) => {
    const { language, selectedMainPage, selectedIntroPage, selectedPublicationPage, openSimplePage, openIntroductionPage, openPublicationPage } = props

    const [mobileOpen, setMobileOpen] = useState(false)
    const [mobileSection, setMobileSection] = useState<'introduction' | 'publications' | null>(null)

    const navBtnBase = 'relative flex items-center gap-1 px-4 py-4 text-xs font-semibold uppercase tracking-[0.1em] transition-colors border-b-2 -mb-px'
    const navBtnActive = 'text-ink border-brand'
    const navBtnInactive = 'text-ink-muted border-transparent hover:text-ink hover:border-line-strong'

    const closeMobile = () => {
        setMobileOpen(false)
        setMobileSection(null)
    }

    return (
        <nav className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-lg">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
                {/* Desktop nav */}
                <div className="hidden md:flex md:flex-wrap md:items-center">
                    {/* Introduction dropdown */}
                    <div className="group relative">
                        <button className={`${navBtnBase} ${selectedMainPage === 'introduction' ? navBtnActive : navBtnInactive}`} onClick={() => openSimplePage('introduction')}>
                            {language === 'ne' ? 'परिचय' : 'Introduction'}
                            <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                        </button>
                        <div className="pointer-events-none absolute left-0 top-full z-50 min-w-56 border border-line bg-paper p-1.5 opacity-0 shadow-[6px_6px_0_0_var(--color-ink)] transition-all group-hover:pointer-events-auto group-hover:opacity-100">
                            {introMenuItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => openIntroductionPage(item.id)}
                                    className={`block w-full px-3 py-2 text-left text-sm transition-colors ${
                                        selectedMainPage === 'introduction' && selectedIntroPage === item.id
                                            ? 'bg-brand-muted font-medium text-brand'
                                            : 'text-ink-muted hover:bg-paper-muted hover:text-ink'
                                    }`}
                                >
                                    {getLocalizedMenuLabel(language, item.labelEn, item.labelNe)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button className={`${navBtnBase} ${selectedMainPage === 'activities' ? navBtnActive : navBtnInactive}`} onClick={() => openSimplePage('activities')}>
                        {language === 'ne' ? 'गतिविधिहरू' : 'Activities'}
                    </button>

                    {/* Publications dropdown */}
                    <div className="group relative">
                        <button className={`${navBtnBase} ${selectedMainPage === 'publications' ? navBtnActive : navBtnInactive}`} onClick={() => openSimplePage('publications')}>
                            {language === 'ne' ? 'प्रकाशन' : 'Publications'}
                            <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                        </button>
                        <div className="pointer-events-none absolute left-0 top-full z-50 min-w-56 border border-line bg-paper p-1.5 opacity-0 shadow-[6px_6px_0_0_var(--color-ink)] transition-all group-hover:pointer-events-auto group-hover:opacity-100">
                            {publicationMenuItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => openPublicationPage(item.id)}
                                    className={`block w-full px-3 py-2 text-left text-sm transition-colors ${
                                        selectedMainPage === 'publications' && selectedPublicationPage === item.id
                                            ? 'bg-brand-muted font-medium text-brand'
                                            : 'text-ink-muted hover:bg-paper-muted hover:text-ink'
                                    }`}
                                >
                                    {getLocalizedMenuLabel(language, item.labelEn, item.labelNe)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button className={`${navBtnBase} ${selectedMainPage === 'notices' ? navBtnActive : navBtnInactive}`} onClick={() => openSimplePage('notices')}>
                        {language === 'ne' ? 'सूचना' : 'Notices'}
                    </button>
                    <button className={`${navBtnBase} ${selectedMainPage === 'gallery' ? navBtnActive : navBtnInactive}`} onClick={() => openSimplePage('gallery')}>
                        {language === 'ne' ? 'ग्यालेरी' : 'Gallery'}
                    </button>
                </div>

                {/* Mobile toggle */}
                <button
                    onClick={() => setMobileOpen((open) => !open)}
                    aria-label={language === 'ne' ? 'मेनु खोल्नुहोस्' : 'Toggle menu'}
                    aria-expanded={mobileOpen}
                    className="flex items-center gap-2 py-4 text-xs font-semibold uppercase tracking-[0.1em] text-ink md:hidden"
                >
                    {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    {language === 'ne' ? 'मेनु' : 'Menu'}
                </button>
            </div>

            {/* Mobile panel */}
            {mobileOpen && (
                <div className="border-t border-line bg-paper px-4 py-3 md:hidden">
                    <div className="flex flex-col gap-1">
                        {/* Introduction accordion */}
                        <button
                            onClick={() => setMobileSection((s) => (s === 'introduction' ? null : 'introduction'))}
                            className={`flex items-center justify-between px-3 py-2.5 text-left text-sm font-semibold ${selectedMainPage === 'introduction' ? 'text-brand' : 'text-ink'}`}
                        >
                            {language === 'ne' ? 'परिचय' : 'Introduction'}
                            <ChevronDown className={`h-4 w-4 transition-transform ${mobileSection === 'introduction' ? 'rotate-180' : ''}`} />
                        </button>
                        {mobileSection === 'introduction' && (
                            <div className="mb-1 flex flex-col gap-0.5 pl-3">
                                {introMenuItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            openIntroductionPage(item.id)
                                            closeMobile()
                                        }}
                                        className={`px-3 py-2 text-left text-sm ${
                                            selectedMainPage === 'introduction' && selectedIntroPage === item.id
                                                ? 'bg-brand-muted font-medium text-brand'
                                                : 'text-ink-muted hover:bg-paper-muted hover:text-ink'
                                        }`}
                                    >
                                        {getLocalizedMenuLabel(language, item.labelEn, item.labelNe)}
                                    </button>
                                ))}
                            </div>
                        )}

                        <button
                            onClick={() => {
                                openSimplePage('activities')
                                closeMobile()
                            }}
                            className={`px-3 py-2.5 text-left text-sm font-semibold ${selectedMainPage === 'activities' ? 'text-brand' : 'text-ink hover:bg-paper-muted'}`}
                        >
                            {language === 'ne' ? 'गतिविधिहरू' : 'Activities'}
                        </button>

                        {/* Publications accordion */}
                        <button
                            onClick={() => setMobileSection((s) => (s === 'publications' ? null : 'publications'))}
                            className={`flex items-center justify-between px-3 py-2.5 text-left text-sm font-semibold ${selectedMainPage === 'publications' ? 'text-brand' : 'text-ink'}`}
                        >
                            {language === 'ne' ? 'प्रकाशन' : 'Publications'}
                            <ChevronDown className={`h-4 w-4 transition-transform ${mobileSection === 'publications' ? 'rotate-180' : ''}`} />
                        </button>
                        {mobileSection === 'publications' && (
                            <div className="mb-1 flex flex-col gap-0.5 pl-3">
                                {publicationMenuItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            openPublicationPage(item.id)
                                            closeMobile()
                                        }}
                                        className={`px-3 py-2 text-left text-sm ${
                                            selectedMainPage === 'publications' && selectedPublicationPage === item.id
                                                ? 'bg-brand-muted font-medium text-brand'
                                                : 'text-ink-muted hover:bg-paper-muted hover:text-ink'
                                        }`}
                                    >
                                        {getLocalizedMenuLabel(language, item.labelEn, item.labelNe)}
                                    </button>
                                ))}
                            </div>
                        )}

                        <button
                            onClick={() => {
                                openSimplePage('notices')
                                closeMobile()
                            }}
                            className={`px-3 py-2.5 text-left text-sm font-semibold ${selectedMainPage === 'notices' ? 'text-brand' : 'text-ink hover:bg-paper-muted'}`}
                        >
                            {language === 'ne' ? 'सूचना' : 'Notices'}
                        </button>
                        <button
                            onClick={() => {
                                openSimplePage('gallery')
                                closeMobile()
                            }}
                            className={`px-3 py-2.5 text-left text-sm font-semibold ${selectedMainPage === 'gallery' ? 'text-brand' : 'text-ink hover:bg-paper-muted'}`}
                        >
                            {language === 'ne' ? 'ग्यालेरी' : 'Gallery'}
                        </button>
                    </div>
                </div>
            )}
        </nav>
    )
}
