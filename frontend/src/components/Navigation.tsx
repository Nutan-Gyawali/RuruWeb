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

    const navBtnBase = 'relative px-4 py-3 text-sm font-medium transition-colors'
    const navBtnActive = 'text-black after:absolute after:inset-x-4 after:bottom-0 after:h-0.5 after:rounded-full after:bg-black'
    const navBtnInactive = 'text-black hover:text-black hover:bg-sky-100 rounded-md'

    return (
        <nav className="sticky top-0 z-40 border-b border-sky-200 bg-white/95 backdrop-blur-lg">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center px-6">
                {/* Introduction dropdown */}
                <div className="group relative">
                    <button className={`${navBtnBase} ${selectedMainPage === 'introduction' ? navBtnActive : navBtnInactive}`} onClick={() => openSimplePage('introduction')}>
                        {language === 'ne' ? 'परिचय' : 'Introduction'} ▾
                    </button>
                    <div className="pointer-events-none absolute left-0 top-full z-50 min-w-52 rounded-md border border-sky-200 bg-white p-1.5 opacity-0 shadow-lg transition-all group-hover:pointer-events-auto group-hover:opacity-100">
                        {introMenuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => openIntroductionPage(item.id)}
                                className={`block w-full rounded-md px-3 py-2 text-left text-sm transition-colors text-black ${
                                    selectedMainPage === 'introduction' && selectedIntroPage === item.id
                                        ? 'bg-sky-200 font-medium'
                                        : 'hover:bg-sky-100'
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
                        {language === 'ne' ? 'प्रकाशन' : 'Publications'} ▾
                    </button>
                    <div className="pointer-events-none absolute left-0 top-full z-50 min-w-52 rounded-md border border-sky-200 bg-white p-1.5 opacity-0 shadow-lg transition-all group-hover:pointer-events-auto group-hover:opacity-100">
                        {publicationMenuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => openPublicationPage(item.id)}
                                className={`block w-full rounded-md px-3 py-2 text-left text-sm transition-colors text-black ${
                                    selectedMainPage === 'publications' && selectedPublicationPage === item.id
                                        ? 'bg-sky-200 font-medium'
                                        : 'hover:bg-sky-100'
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
        </nav>
    )
}
