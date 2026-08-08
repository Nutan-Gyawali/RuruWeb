import { ArrowUpRight, FileText, ImageOff, Info, Megaphone, MapPin, ScrollText, User, Wallet } from 'lucide-react'
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
    { id: 'current-members', labelEn: 'Current Committee Members', labelNe: 'वर्तमान समितिका पदाधिकारीहरु' },
    { id: 'current-advisors', labelEn: 'Current Advisors', labelNe: 'वर्तमान सल्लाहाकारहरु' },
    { id: 'past-members', labelEn: 'Past Committee Members', labelNe: 'हालसम्मका पदाधिकारीहरु' },
    { id: 'past-advisors', labelEn: 'Past Advisors', labelNe: 'हालसम्मका सल्लाहाकारहरु' },
    { id: 'rules', labelEn: 'Statute of Organization', labelNe: 'संस्थाको विधान' },
    { id: 'lifetime-members', labelEn: 'Lifetime Members', labelNe: 'आजीवन सदस्यहरु' },
    { id: 'certificates', labelEn: 'Registration Certificates', labelNe: 'दर्ता प्रमाणपत्रहरु' },
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
    <div className="mb-6 border-b border-line pb-4">
        <div className="mb-2 h-[3px] w-9 bg-brand" />
        <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">{label}</h2>
    </div>
)

const EmptyState = ({ message }: { message: string }) => (
    <p className="border border-dashed border-line py-10 text-center text-sm text-ink-faint">{message}</p>
)

const PersonGrid = ({ people: personList, language, emptyMsg }: { people: PersonProfile[]; language: Language; emptyMsg: string }) => (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {personList.length > 0 ? personList.map((person) => {
            const localized = getLocalizedPerson(language, person)
            const initials = getInitials(localized.name)
            return (
                <div key={person.id} className="tactile group flex flex-col items-center border border-line bg-paper p-5 text-center">
                    <div className="mb-4 aspect-square w-full overflow-hidden border border-line bg-brand-muted text-brand">
                        {person.imageUrl ? (
                            <img src={person.imageUrl} alt={localized.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        ) : initials ? (
                            <div className="flex h-full w-full items-center justify-center">
                                <span className="text-4xl font-semibold opacity-50">{initials}</span>
                            </div>
                        ) : (
                            <div className="flex h-full w-full items-center justify-center">
                                <User className="h-12 w-12 opacity-50" />
                            </div>
                        )}
                    </div>
                    
                    <strong className="text-base font-semibold text-ink transition-colors group-hover:text-brand">{localized.name}</strong>
                    {localized.position && (
                        <span className="mt-1.5 inline-block border border-brand bg-brand-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-brand">
                            {localized.position}
                        </span>
                    )}
                </div>
            )
        }) : <div className="col-span-full"><EmptyState message={emptyMsg} /></div>}
    </div>
)

const ListArticle = ({ title, body }: { title: string; body: string }) => (
    <article className="group py-5">
        <h3 className="mb-1.5 flex items-baseline gap-2 text-sm font-semibold text-ink">
            <span className="text-brand transition-transform group-hover:translate-x-0.5">—</span>
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
    const lifetimeMembers = people.lifetimeMembers ?? []

    const pastMembersImages = images.filter(img => img.category === 'Past Members')
    const pastAdvisorsImages = images.filter(img => img.category === 'Past Advisors')
    const galleryImages = images.filter(img => img.category === 'Gallery')
    const certificateImages = images.filter(img => img.category === 'Certificates')
    const companyIntroImages = images.filter(img => img.category === "Company's Intro")
    const thorgaIntroImages = images.filter(img => img.category === "Thorga's Intro")

    const introActiveItem = introMenuItems.find((item) => item.id === selectedIntroPage)
    const introActiveLabel = introActiveItem ? (language === 'ne' ? introActiveItem.labelNe : introActiveItem.labelEn) : ''

    const pubActiveItem = publicationMenuItems.find((item) => item.id === selectedPublicationPage)
    const pubActiveLabel = pubActiveItem ? (language === 'ne' ? pubActiveItem.labelNe : pubActiveItem.labelEn) : ''

    const homepageStats = [
        { value: currentMembers.length, labelEn: 'Members', labelNe: 'सदस्यहरू' },
        { value: currentAdvisors.length, labelEn: 'Advisors', labelNe: 'सल्लाहकारहरू' },
        { value: (content.worksDone ?? []).length, labelEn: 'Activities', labelNe: 'गतिविधिहरू' },
        { value: galleryImages.length, labelEn: 'Gallery Photos', labelNe: 'ग्यालेरी तस्बिरहरू' },
    ]

    const noItemsMsg = language === 'ne' ? 'हाल कुनै सामग्री उपलब्ध छैन।' : 'No items available yet.'
    const emptyMemberMsg = language === 'ne' ? 'कुनै सदस्य फेला परेन।' : 'No members found.'
    const emptyAdvisorMsg = language === 'ne' ? 'कुनै सल्लाहकार फेला परेन।' : 'No advisors found.'

    return (
        <>
            {selectedMainPage === 'introduction' && selectedIntroPage === 'company-intro' && (
                <HeroSection
                    language={language}
                    heroImage={companyIntroImages[0] || images[0]}
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
                                        {companyIntroImages.length > 0 && (
                                            <div className="mb-8 overflow-hidden border border-line">
                                                <img src={companyIntroImages[0].imageUrl} alt="Company Introduction" className="max-h-96 w-full object-cover" />
                                            </div>
                                        )}
                                        <p className="mb-8 max-w-2xl text-base leading-relaxed text-ink-muted">
                                            {introText.body || 'Thorga is a community-oriented social and cultural organization bringing people together for learning, heritage, support, and development.'}
                                        </p>
                                        <dl className="grid gap-8 border-t border-line pt-8 sm:grid-cols-2">
                                            <div>
                                                <dt className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-brand">{language === 'ne' ? 'उद्देश्य' : 'Mission'}</dt>
                                                <dd className="text-sm leading-relaxed text-ink-muted">{aimsText.body || 'Promote social development, cultural preservation, and public coordination.'}</dd>
                                            </div>
                                            <div>
                                                <dt className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-brand">{language === 'ne' ? 'समुदाय' : 'Community'}</dt>
                                                <dd className="text-sm leading-relaxed text-ink-muted">{hometownText.body || 'A shared village and community connection that supports people from Thorga in Kathmandu.'}</dd>
                                            </div>
                                        </dl>
                                        <div className="mt-10">
                                            <ValuePropsSection language={language} embedded />
                                        </div>
                                    </>
                                )}

                                {selectedIntroPage === 'thorga-intro' && (
                                    <div className="max-w-2xl space-y-4">
                                        {thorgaIntroImages.length > 0 && (
                                            <div className="mb-8 overflow-hidden border border-line">
                                                <img src={thorgaIntroImages[0].imageUrl} alt="Thorga Introduction" className="max-h-96 w-full object-cover" />
                                            </div>
                                        )}
                                        <p className="leading-relaxed text-ink-muted">{hometownText.body || 'Thorga is a place-based identity connecting families and traditions through shared belonging.'}</p>
                                    </div>
                                )}
                                
                                {selectedIntroPage === 'rules' && (
                                    <div className="max-w-2xl space-y-4">
                                        <p className="leading-relaxed text-ink-muted">{rulesText.body || 'The association strengthens ties among members through mutual support and good governance.'}</p>
                                    </div>
                                )}
                                
                                {selectedIntroPage === 'certificates' && (
                                    <div>
                                        {certificateImages.length > 0 ? (
                                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                                {certificateImages.map((image) => {
                                                    const localized = getLocalizedImage(language, image)
                                                    return (
                                                        <figure key={image.id} className="group overflow-hidden border border-line bg-paper p-2">
                                                            <img
                                                                src={image.imageUrl}
                                                                alt={localized.title}
                                                                className="h-auto w-full object-contain"
                                                            />
                                                            <figcaption className="mt-2 text-center text-sm font-medium text-ink-muted">{localized.title}</figcaption>
                                                        </figure>
                                                    )
                                                })}
                                            </div>
                                        ) : (
                                            <EmptyState message={noItemsMsg} />
                                        )}
                                    </div>
                                )}

                                {selectedIntroPage === 'current-members' && <PersonGrid people={currentMembers} language={language} emptyMsg={emptyMemberMsg} />}
                                {selectedIntroPage === 'current-advisors' && <PersonGrid people={currentAdvisors} language={language} emptyMsg={emptyAdvisorMsg} />}
                                
                                {selectedIntroPage === 'past-members' && (
                                    <div>
                                        {pastMembersImages.length > 0 ? (
                                            <div className="flex flex-col items-center gap-8">
                                                {pastMembersImages.map((image) => {
                                                    const localized = getLocalizedImage(language, image)
                                                    return (
                                                        <figure key={image.id} className="w-full max-w-3xl border border-line bg-paper p-2 shadow-sm">
                                                            <div className="relative aspect-[1/1.414] w-full overflow-hidden bg-paper-muted">
                                                                <img src={image.imageUrl} alt={localized.title} className="absolute inset-0 h-full w-full object-contain" />
                                                            </div>
                                                            {localized.title && <figcaption className="mt-3 text-center text-sm font-semibold text-ink-muted">{localized.title}</figcaption>}
                                                        </figure>
                                                    )
                                                })}
                                            </div>
                                        ) : <EmptyState message={noItemsMsg} />}
                                    </div>
                                )}
                                
                                {selectedIntroPage === 'past-advisors' && (
                                    <div>
                                        {pastAdvisorsImages.length > 0 ? (
                                            <div className="flex flex-col items-center gap-8">
                                                {pastAdvisorsImages.map((image) => {
                                                    const localized = getLocalizedImage(language, image)
                                                    return (
                                                        <figure key={image.id} className="w-full max-w-3xl border border-line bg-paper p-2 shadow-sm">
                                                            <div className="relative aspect-[1/1.414] w-full overflow-hidden bg-paper-muted">
                                                                <img src={image.imageUrl} alt={localized.title} className="absolute inset-0 h-full w-full object-contain" />
                                                            </div>
                                                            {localized.title && <figcaption className="mt-3 text-center text-sm font-semibold text-ink-muted">{localized.title}</figcaption>}
                                                        </figure>
                                                    )
                                                })}
                                            </div>
                                        ) : <EmptyState message={noItemsMsg} />}
                                    </div>
                                )}
                                
                                {selectedIntroPage === 'lifetime-members' && <PersonGrid people={lifetimeMembers} language={language} emptyMsg={emptyMemberMsg} />}
                            </div>
                        )}

                        {selectedMainPage === 'activities' && (
                            <div>
                                <SectionHeading label={language === 'ne' ? 'हालका गतिविधिहरू' : 'Recent Activities'} />
                                {(content.worksDone ?? []).length > 0 ? (
                                    <div className="divide-y divide-line border-t border-line">
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
                                    <div className="divide-y divide-line border-t border-line">
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
                                    <div className="divide-y divide-line border-t border-line">
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
                                {galleryImages.length > 0 ? (
                                    <div className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3">
                                        {galleryImages.map((image) => {
                                            const localized = getLocalizedImage(language, image)
                                            return (
                                                <figure key={image.id} className="group bg-paper">
                                                    <div className="overflow-hidden">
                                                        <img
                                                            src={image.imageUrl}
                                                            alt={localized.title}
                                                            className="h-44 w-full object-cover grayscale transition-all duration-500 ease-out group-hover:scale-[1.04] group-hover:grayscale-0"
                                                        />
                                                    </div>
                                                    <figcaption className="border-t border-line px-3 py-2 text-xs font-medium text-ink-muted">{localized.title}</figcaption>
                                                </figure>
                                            )
                                        })}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-2 border border-dashed border-line py-14 text-ink-faint">
                                        <ImageOff className="h-6 w-6" />
                                        <p className="text-sm">{noItemsMsg}</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {selectedMainPage === 'financial' && (
                            <div>
                                <SectionHeading label={language === 'ne' ? 'वित्तीय' : 'Financial'} />
                                <EmptyState message={noItemsMsg} />
                            </div>
                        )}

                        {selectedMainPage === 'organization-page' && (
                            <div>
                                <SectionHeading label={language === 'ne' ? 'थोर्गेली संस्थाको पेज' : "Organization's Page"} />
                                <EmptyState message={noItemsMsg} />
                            </div>
                        )}

                        {selectedMainPage === 'related-publications' && (
                            <div>
                                <SectionHeading label={language === 'ne' ? 'थोर्गा सम्बन्धी प्रकाशनहरु' : 'Related Publications'} />
                                <EmptyState message={noItemsMsg} />
                            </div>
                        )}

                        {selectedMainPage === 'old-materials' && (
                            <div>
                                <SectionHeading label={language === 'ne' ? 'पुराना सामाग्री' : 'Old Materials'} />
                                <EmptyState message={noItemsMsg} />
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <aside className="flex flex-col gap-10">
                        {/* Notice card */}
                        <div className="border border-ink bg-ink p-5 text-paper shadow-[6px_6px_0_0_var(--color-brand)]">
                            <div className="mb-3 flex items-center gap-2">
                                <Megaphone className="h-4 w-4 text-brand-on-ink" />
                                <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-paper">{language === 'ne' ? 'सूचना' : 'Notice'}</h3>
                            </div>
                            <p className="mb-4 text-sm leading-relaxed text-paper/80">
                                {language === 'ne'
                                    ? 'वार्षिक साधारण सभा र नयाँ सदस्यता खुल्ला गरिएको छ।'
                                    : 'Annual General Meeting and new membership are now open.'}
                            </p>
                            <button className="flex items-center gap-1.5 text-sm font-semibold text-brand-on-ink transition-opacity hover:opacity-80">
                                {language === 'ne' ? 'थप पढ्नुहोस्' : 'Learn More'}
                                <ArrowUpRight className="h-3.5 w-3.5" />
                            </button>
                        </div>

                        {/* Quick links */}
                        <div>
                            <h3 className="mb-3 border-b border-line pb-3 text-xs font-semibold uppercase tracking-[0.15em] text-ink-muted">{language === 'ne' ? 'द्रुत लिङ्क' : 'Quick Links'}</h3>
                            <ul className="divide-y divide-line">
                                {quickLinks.map((link) => {
                                    const Icon = link.icon
                                    return (
                                        <li key={link.labelEn}>
                                            <button className="group -mx-2 flex w-full items-center gap-3 px-2 py-2.5 text-left text-sm text-ink-muted transition-colors hover:bg-paper-muted hover:text-ink">
                                                <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-brand-muted text-brand transition-colors group-hover:bg-brand group-hover:text-on-brand">
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

                        {/* Map */}
                        <div>
                            <div className="mb-3 flex items-center gap-2 border-b border-line pb-3">
                                <MapPin className="h-4 w-4 text-brand" />
                                <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-ink-muted">{language === 'ne' ? 'स्थान' : 'Location'}</h3>
                            </div>
                            <iframe
                                title="Thorga map"
                                src="https://www.google.com/maps?q=Thorga,Gulmi,Nepal&z=13&output=embed"
                                loading="lazy"
                                className="h-44 w-full border border-line grayscale-[0.3]"
                            />
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
