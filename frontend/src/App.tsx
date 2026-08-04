import { useEffect, useState } from 'react'
import { AlertTriangle, Loader2, X } from 'lucide-react'
import './index.css'
import type { Language, MainPage, IntroductionPage, PublicationPage, SiteContent, PersonProfile, SiteImage } from './types'
import { Header } from './components/Header'
import { Navigation } from './components/Navigation'
import { MainContent } from './components/MainContent'
import { Footer } from './components/Footer'

function App() {
    const [siteLoading, setSiteLoading] = useState(true)
    const [siteMessage, setSiteMessage] = useState('')
    const [language, setLanguage] = useState<Language>('ne')
    const [content, setContent] = useState<Record<string, SiteContent[]>>({})
    const [people, setPeople] = useState<Record<string, PersonProfile[]>>({})
    const [images, setImages] = useState<SiteImage[]>([])

    const [selectedMainPage, setSelectedMainPage] = useState<MainPage>('introduction')
    const [selectedIntroPage, setSelectedIntroPage] = useState<IntroductionPage>('company-intro')
    const [selectedPublicationPage, setSelectedPublicationPage] = useState<PublicationPage>('calendar')

    const goToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

    const openIntroductionPage = (page: IntroductionPage) => {
        setSelectedMainPage('introduction')
        setSelectedIntroPage(page)
        goToTop()
    }

    const openPublicationPage = (page: PublicationPage) => {
        setSelectedMainPage('publications')
        setSelectedPublicationPage(page)
        goToTop()
    }

    const openSimplePage = (page: MainPage) => {
        setSelectedMainPage(page)
        goToTop()
    }

    const fetchJson = async (path: string) => {
        const response = await fetch(path)
        if (!response.ok) throw new Error(`Unable to load ${path}`)
        return response.json()
    }

    const loadSiteContent = async () => {
        try {
            const [intro, publication, works, others, hometown, aims, rules] = await Promise.all([
                fetchJson('/api/SiteContent/content?category=Introduction'),
                fetchJson('/api/SiteContent/content?category=Publication'),
                fetchJson('/api/SiteContent/content?category=Works%20Done'),
                fetchJson('/api/SiteContent/content?category=Others'),
                fetchJson('/api/SiteContent/content?category=Hometown%20Introduction'),
                fetchJson('/api/SiteContent/content?category=Aims'),
                fetchJson('/api/SiteContent/content?category=Rules'),
            ])

            const [board, currentMembers, pastMembers, advisors, currentAdvisors, pastAdvisors, lifetimeMembers] = await Promise.all([
                fetchJson('/api/SiteContent/people?category=Board%20of%20Members'),
                fetchJson('/api/SiteContent/people?category=Current%20Members'),
                fetchJson('/api/SiteContent/people?category=Past%20Members'),
                fetchJson('/api/SiteContent/people?category=Advisors'),
                fetchJson('/api/SiteContent/people?category=Current%20Advisors'),
                fetchJson('/api/SiteContent/people?category=Past%20Advisors'),
                fetchJson('/api/SiteContent/people?category=Lifetime%20Members'),
            ])

            const gallery = await fetchJson('/api/SiteContent/images?category=Gallery')

            setContent({
                introduction: intro as SiteContent[],
                publication: publication as SiteContent[],
                worksDone: works as SiteContent[],
                others: others as SiteContent[],
                hometownIntroduction: hometown as SiteContent[],
                aims: aims as SiteContent[],
                rules: rules as SiteContent[],
            })

            setPeople({
                boardOfMembers: board as PersonProfile[],
                currentMembers: currentMembers as PersonProfile[],
                pastMembers: pastMembers as PersonProfile[],
                advisors: advisors as PersonProfile[],
                currentAdvisors: currentAdvisors as PersonProfile[],
                pastAdvisors: pastAdvisors as PersonProfile[],
                lifetimeMembers: lifetimeMembers as PersonProfile[],
            })

            setImages(gallery as SiteImage[])
        } catch {
            setSiteMessage('The site content API is not reachable yet. Please start the backend first.')
        } finally {
            setSiteLoading(false)
        }
    }

    useEffect(() => {
        void loadSiteContent()
    }, [])

    return (
        <div className={`flex min-h-screen flex-col bg-paper text-ink font-sans antialiased ${language === 'ne' ? 'font-nepali' : ''}`}>
            <Header language={language} setLanguage={setLanguage} onLogoClick={() => openIntroductionPage('company-intro')} />

            <Navigation
                language={language}
                selectedMainPage={selectedMainPage}
                selectedIntroPage={selectedIntroPage}
                selectedPublicationPage={selectedPublicationPage}
                openSimplePage={openSimplePage}
                openIntroductionPage={openIntroductionPage}
                openPublicationPage={openPublicationPage}
            />

            {siteMessage && (
                <div className="border-b border-line bg-[var(--color-warning-muted)] px-6 py-3">
                    <div className="mx-auto flex max-w-7xl items-start gap-3 text-sm text-[var(--color-on-warning)]">
                        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                        <p className="flex-1 leading-relaxed">{siteMessage}</p>
                        <button
                            onClick={() => setSiteMessage('')}
                            aria-label={language === 'ne' ? 'बन्द गर्नुहोस्' : 'Dismiss'}
                            className="shrink-0 p-1 text-[var(--color-on-warning)] opacity-70 transition-opacity hover:opacity-100"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            )}

            {siteLoading ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 py-24 text-ink-faint">
                    <Loader2 className="h-8 w-8 animate-spin text-brand" />
                    <p className="text-sm">{language === 'ne' ? 'सामग्री लोड हुँदैछ...' : 'Loading content...'}</p>
                </div>
            ) : (
                <MainContent
                    language={language}
                    selectedMainPage={selectedMainPage}
                    selectedIntroPage={selectedIntroPage}
                    selectedPublicationPage={selectedPublicationPage}
                    content={content}
                    people={people}
                    images={images}
                    openSimplePage={openSimplePage}
                />
            )}

            <Footer language={language} />
        </div>
    )
}

export default App