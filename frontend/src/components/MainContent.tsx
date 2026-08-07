import { ArrowUpRight, FileText, ImageOff, Info, Megaphone, ScrollText, User, Wallet } from 'lucide-react'
import type { Language, MainPage, IntroductionPage, PublicationPage, SiteContent, PersonProfile, SiteImage } from '../types'
import { getLocalizedContent, getLocalizedPerson, getLocalizedImage, getInitials } from '../utils'
import { HeroSection } from './HeroSection'
import { StatsStrip } from './StatsStrip'
import { ValuePropsSection } from './ValuePropsSection'
import { ActivityPreview } from './ActivityPreview'
import { CtaBanner } from './CtaBanner'
import { LeadershipPreview } from './LeadershipPreview'
import { PublicationsPreview } from './PublicationsPreview'

type MainContentProps = {
    language: Language
    selectedMainPage: MainPage
    selectedIntroPage: IntroductionPage
    selectedPublicationPage: PublicationPage
    content: Record<string, SiteContent[]>
    people: Record<string, PersonProfile[]>
    images: SiteImage[]
    openSimplePage: (page: MainPage) => void
}

const introMenuItems = [
    { id: 'company-intro', labelEn: 'Company Intro', labelNe: 'संस्था परिचय' },
    { id: 'thorga-intro', labelEn: "Thorga's Introduction", labelNe: 'थोर्गाको परिचय' },
    { id: 'current-members', labelEn: 'Current Members', labelNe: 'वर्तमान सदस्य' },
    { id: 'current-advisors', labelEn: 'Current Advisors', labelNe: 'वर्तमान सल्लाहकार' },
    { id: 'past-members', labelEn: 'Past Members', labelNe: 'पूर्व सदस्य' },
    { id: 'past-advisors', labelEn: 'Past Advisors', labelNe: 'पूर्व सल्लाहकार' },
]

const publicationMenuItems = [
    { id: 'calendar', labelEn: 'Calendar', labelNe: 'क्यालेन्डर' },
    { id: 'phone-diary', labelEn: 'Phone Diary', labelNe: 'फोन डायरी' },
    { id: 'bulletin', labelEn: 'Bulletin', labelNe: 'बुलेटिन' },
    { id: 'memories', labelEn: 'Memories', labelNe: 'स्मृतिहरू' },
    { id: 'others', labelEn: 'Others', labelNe: 'अन्य' },
]

const quickLinks = [
    { icon: FileText, labelEn: 'Membership Form', labelNe: 'सदस्यता फारम' },
    { icon: ScrollText, labelEn: 'Organization Rules', labelNe: 'संस्थाको विधान' },
    { icon: Wallet, labelEn: 'Financial Report', labelNe: 'आर्थिक प्रतिवेदन' },
    { icon: Info, labelEn: 'About Us', labelNe: 'हाम्रो बारेमा' },
]

const SectionHeading = ({ label }: { label: string }) => (
    <div className="mb-6">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">{label}</h2>
    </div>
)

const EmptyState = ({ message }: { message: string }) => (
    <p className="rounded-[var(--radius-container)] border border-dashed border-line-strong py-10 text-center text-sm text-ink-faint">{message}</p>
)

const PersonGrid = ({ people: personList, language, emptyMsg }: { people: PersonProfile[]; language: Language; emptyMsg: string }) => (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {personList.length > 0 ? personList.map((person) => {
            const localized = getLocalizedPerson(language, person)
            const initials = getInitials(localized.name)
            return (
                <div key={person.id} className="tactile group flex flex-col items-center rounded-[var(--radius-page)] bg-card p-6 text-center">
                    <div className="mb-3 flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-muted text-sm font-semibold text-brand ring-4 ring-paper transition-shadow group-hover:ring-brand-muted">
                        {person.imageUrl ? (
                            <img src={person.imageUrl} alt={localized.name} className="h-full w-full object-cover" />
                        ) : initials ? (
                            <span>{initials}</span>
                        ) : (
                            <User className="h-6 w-6" />
                        )}
                    </div>
                    <strong className="text-sm font-semibold text-ink">{localized.name}</strong>
                    <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-brand">{localized.position}</span>
                </div>
            )
        }) : <div className="col-span-full"><EmptyState message={emptyMsg} /></div>}
    </div>
)

const ListArticle = ({ title, body }: { title: string; body: string }) => (
    <article className="group rounded-[var(--radius-container)] bg-card p-5">
        <h3 className="mb-1.5 flex items-center gap-2.5 text-sm font-semibold text-ink">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
            {title}
        </h3>
        <p className="pl-4 text-sm leading-relaxed text-ink-muted">{body}</p>
    </article>
)

export const MainContent = (props: MainContentProps) => {
    const { language, selectedMainPage, selectedIntroPage, selectedPublicationPage, content, people, images, openSimplePage } = props

    const isHomepage = selectedMainPage === 'introduction' && selectedIntroPage === 'company-intro'

    const introduction = content.introduction?.[0]
    const hometown = content.hometownIntroduction?.[0]
    const aims = content.aims?.[0]
    const rules = content.rules?.[0]

    const introText = getLocalizedContent(language, introduction)
    const hometownText = getLocalizedContent(language, hometown)
    const aimsText = getLocalizedContent(language, aims)
    const rulesText = getLocalizedContent(language, rules)

    const currentMembers = people.currentMembers ?? []
    const currentAdvisors = people.currentAdvisors ?? []
    const pastMembers = people.pastMembers ?? []
    const pastAdvisors = people.pastAdvisors ?? []

    const introActiveItem = introMenuItems.find((item) => item.id === selectedIntroPage)
    const introActiveLabel = introActiveItem ? (language === 'ne' ? introActiveItem.labelNe : introActiveItem.labelEn) : ''

    const pubActiveItem = publicationMenuItems.find((item) => item.id === selectedPublicationPage)
    const pubActiveLabel = pubActiveItem ? (language === 'ne' ? pubActiveItem.labelNe : pubActiveItem.labelEn) : ''

    const homepageStats = [
        { value: currentMembers.length, labelEn: 'Members', labelNe: 'सदस्यहरू' },
        { value: currentAdvisors.length, labelEn: 'Advisors', labelNe: 'सल्लाहकारहरू' },
        { value: (content.worksDone ?? []).length, labelEn: 'Activities', labelNe: 'गतिविधिहरू' },
        { value: images.length, labelEn: 'Gallery Photos', labelNe: 'ग्यालेरी तस्बिरहरू' },
    ]

    const noItemsMsg = language === 'ne' ? 'हाल कुनै सामग्री उपलब्ध छैन।' : 'No items available yet.'
    const emptyMemberMsg = language === 'ne' ? 'कुनै सदस्य फेला परेन।' : 'No members found.'
    const emptyAdvisorMsg = language === 'ne' ? 'कुनै सल्लाहकार फेला परेन।' : 'No advisors found.'

    return (
        <>
            {selectedMainPage === 'introduction' && selectedIntroPage === 'company-intro' && (
                <HeroSection
                    language={language}
                    heroImage={images[0]}
                    eyebrow={language === 'ne' ? 'स्थापित समुदाय, काठमाण्डौं' : 'Est. Community, Kathmandu'}
                    headline={language === 'ne' ? 'थोर्गा काठमाण्डौंमा स्वागत छ' : 'Welcome to Thorga Kathmandu'}
                    body={introText.body || 'A community-oriented social and cultural organization bringing people together for learning, heritage, support, and development.'}
                />
            )}
            {isHomepage && <StatsStrip language={language} stats={homepageStats} />}
            <main id="content-start" className="mx-auto w-full max-w-7xl flex-1 scroll-mt-20 px-6 py-10">
                <div className="grid items-start gap-12 lg:grid-cols-[1fr_296px]">
                    {/* Main content */}
                    <div className="min-w-0">
                        {selectedMainPage === 'introduction' && (
                            <div>
                                <SectionHeading label={introActiveLabel} />

                                {selectedIntroPage === 'company-intro' && (
                                    <>
                                        <p className="mb-8 max-w-2xl text-base leading-relaxed text-ink-muted">
                                            {introText.body || 'Thorga is a community-oriented social and cultural organization bringing people together for learning, heritage, support, and development.'}
                                        </p>
                                        <dl className="grid gap-4 sm:grid-cols-2">
                                            <div className="rounded-[var(--radius-page)] bg-brand-fill p-6 text-on-brand-fill">
                                                <dt className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] opacity-80">{language === 'ne' ? 'उद्देश्य' : 'Mission'}</dt>
                                                <dd className="text-sm leading-relaxed opacity-95">{aimsText.body || 'Promote social development, cultural preservation, and public coordination.'}</dd>
                                            </div>
                                            <div className="rounded-[var(--radius-page)] bg-sage p-6 text-on-sage">
                                                <dt className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] opacity-80">{language === 'ne' ? 'समुदाय' : 'Community'}</dt>
                                                <dd className="text-sm leading-relaxed opacity-95">{hometownText.body || 'A shared village and community connection that supports people from Thorga in Kathmandu.'}</dd>
                                            </div>
                                        </dl>
                                        <div className="mt-10">
                                            <ValuePropsSection language={language} embedded />
                                        </div>
                                    </>
                                )}

                                {selectedIntroPage === 'thorga-intro' && (
                                    <div className="max-w-2xl space-y-4">
                                        <p className="leading-relaxed text-ink-muted">{hometownText.body || 'Thorga is a place-based identity connecting families and traditions through shared belonging.'}</p>
                                        <p className="leading-relaxed text-ink-muted">{rulesText.body || 'The association strengthens ties among members through mutual support and good governance.'}</p>
                                    </div>
                                )}

                                {selectedIntroPage === 'current-members' && <PersonGrid people={currentMembers} language={language} emptyMsg={emptyMemberMsg} />}
                                {selectedIntroPage === 'current-advisors' && <PersonGrid people={currentAdvisors} language={language} emptyMsg={emptyAdvisorMsg} />}
                                {selectedIntroPage === 'past-members' && <PersonGrid people={pastMembers} language={language} emptyMsg={emptyMemberMsg} />}
                                {selectedIntroPage === 'past-advisors' && <PersonGrid people={pastAdvisors} language={language} emptyMsg={emptyAdvisorMsg} />}
                            </div>
                        )}

                        {selectedMainPage === 'activities' && (
                            <div>
                                <SectionHeading label={language === 'ne' ? 'हालका गतिविधिहरू' : 'Recent Activities'} />
                                {(content.worksDone ?? []).length > 0 ? (
                                    <div className="flex flex-col gap-2">
                                        {(content.worksDone ?? []).map((item) => {
                                            const localized = getLocalizedContent(language, item)
                                            return <ListArticle key={item.id} title={localized.title || item.title} body={localized.body || item.body} />
                                        })}
                                    </div>
                                ) : <EmptyState message={noItemsMsg} />}
                            </div>
                        )}

                        {selectedMainPage === 'publications' && (
                            <div>
                                <SectionHeading label={pubActiveLabel} />
                                {(content.publication ?? []).length > 0 ? (
                                    <div className="flex flex-col gap-2">
                                        {(content.publication ?? []).map((item) => {
                                            const localized = getLocalizedContent(language, item)
                                            return <ListArticle key={item.id} title={localized.title || item.title} body={localized.body || item.body} />
                                        })}
                                    </div>
                                ) : <EmptyState message={noItemsMsg} />}
                            </div>
                        )}

                        {selectedMainPage === 'notices' && (
                            <div>
                                <SectionHeading label={language === 'ne' ? 'सूचना' : 'Notices'} />
                                {(content.others ?? []).length > 0 ? (
                                    <div className="flex flex-col gap-2">
                                        {(content.others ?? []).map((item) => {
                                            const localized = getLocalizedContent(language, item)
                                            return <ListArticle key={item.id} title={localized.title || item.title} body={localized.body || item.body} />
                                        })}
                                    </div>
                                ) : <EmptyState message={noItemsMsg} />}
                            </div>
                        )}

                        {selectedMainPage === 'gallery' && (
                            <div>
                                <SectionHeading label={language === 'ne' ? 'फोटो ग्यालेरी' : 'Gallery'} />
                                {images.length > 0 ? (
                                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                        {images.map((image) => {
                                            const localized = getLocalizedImage(language, image)
                                            return (
                                                <figure key={image.id} className="tactile group overflow-hidden rounded-[var(--radius-container)] bg-card">
                                                    <div className="overflow-hidden">
                                                        <img
                                                            src={image.imageUrl}
                                                            alt={localized.title}
                                                            className="h-44 w-full object-cover saturate-[0.85] transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                                                        />
                                                    </div>
                                                    <figcaption className="px-3.5 py-2.5 text-xs font-medium text-ink-muted">{localized.title}</figcaption>
                                                </figure>
                                            )
                                        })}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-2 rounded-[var(--radius-container)] border border-dashed border-line-strong py-14 text-ink-faint">
                                        <ImageOff className="h-6 w-6" />
                                        <p className="text-sm">{noItemsMsg}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Sidebar — one cohesive panel so it reads as a single design
                        object instead of loose blocks trailing off next to the
                        (often taller) main column. */}
                    <aside className="flex flex-col gap-7 self-start rounded-[var(--radius-page)] bg-card p-6 lg:sticky lg:top-24">
                        {/* Notice */}
                        <div className="rounded-[var(--radius-container)] bg-brand-fill p-5 text-on-brand-fill">
                            <div className="mb-3 flex items-center gap-2">
                                <Megaphone className="h-4 w-4" />
                                <h3 className="text-xs font-semibold uppercase tracking-[0.15em]">{language === 'ne' ? 'सूचना' : 'Notice'}</h3>
                            </div>
                            <p className="mb-4 text-sm leading-relaxed opacity-95">
                                {language === 'ne'
                                    ? 'वार्षिक साधारण सभा र नयाँ सदस्यता खुल्ला गरिएको छ।'
                                    : 'Annual General Meeting and new membership are now open.'}
                            </p>
                            <button className="flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-80">
                                {language === 'ne' ? 'थप पढ्नुहोस्' : 'Learn More'}
                                <ArrowUpRight className="h-3.5 w-3.5" />
                            </button>
                        </div>

                        {/* Quick links */}
                        <div className="border-t border-line pt-6">
                            <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-ink-muted">{language === 'ne' ? 'द्रुत लिङ्क' : 'Quick Links'}</h3>
                            <ul className="flex flex-col gap-1">
                                {quickLinks.map((link) => {
                                    const Icon = link.icon
                                    return (
                                        <li key={link.labelEn}>
                                            <button className="group flex w-full items-center gap-3 rounded-full py-2 pl-2 pr-3 text-left text-sm text-ink-muted transition-colors hover:bg-paper-muted hover:text-ink">
                                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-tint text-brand transition-colors group-hover:bg-brand group-hover:text-on-brand">
                                                    <Icon className="h-4 w-4" />
                                                </span>
                                                <span className="flex-1">{language === 'ne' ? link.labelNe : link.labelEn}</span>
                                                <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-ink-faint transition-all group-hover:translate-x-0.5 group-hover:text-brand" />
                                            </button>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </aside>
                </div>
            </main>
            {isHomepage && (
                <>
                    <LeadershipPreview language={language} members={currentMembers} onViewAll={() => openSimplePage('introduction')} />
                    <PublicationsPreview language={language} publications={content.publication ?? []} onViewAll={() => openSimplePage('publications')} />
                    <ActivityPreview
                        language={language}
                        activities={content.worksDone ?? []}
                        images={images}
                        onViewActivities={() => openSimplePage('activities')}
                        onViewGallery={() => openSimplePage('gallery')}
                    />
                    <CtaBanner language={language} />
                </>
            )}
        </>
    )
}
