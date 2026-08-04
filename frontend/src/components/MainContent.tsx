import { ArrowUpRight, ImageOff, Megaphone, MapPin, User } from 'lucide-react'
import type { Language, MainPage, IntroductionPage, PublicationPage, SiteContent, PersonProfile, SiteImage } from '../types'
import { getLocalizedContent, getLocalizedPerson, getLocalizedImage } from '../utils'
import { HeroSection } from './HeroSection'

type MainContentProps = {
    language: Language
    selectedMainPage: MainPage
    selectedIntroPage: IntroductionPage
    selectedPublicationPage: PublicationPage
    content: Record<string, SiteContent[]>
    people: Record<string, PersonProfile[]>
    images: SiteImage[]
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
    <div className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3 lg:grid-cols-4">
        {personList.length > 0 ? personList.map((person) => {
            const localized = getLocalizedPerson(language, person)
            return (
                <div key={person.id} className="group flex flex-col items-center bg-paper p-6 text-center transition-colors hover:bg-paper-muted">
                    <div className="mb-3 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-paper-muted text-ink-faint ring-1 ring-line">
                        {person.imageUrl ? <img src={person.imageUrl} alt={localized.name} className="h-full w-full object-cover" /> : <User className="h-7 w-7" />}
                    </div>
                    <strong className="text-sm font-semibold text-ink">{localized.name}</strong>
                    <span className="mt-0.5 text-xs text-ink-muted">{localized.position}</span>
                </div>
            )
        }) : <div className="col-span-full bg-paper"><EmptyState message={emptyMsg} /></div>}
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
    const { language, selectedMainPage, selectedIntroPage, selectedPublicationPage, content, people, images } = props

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
            <main id="content-start" className="mx-auto w-full max-w-7xl flex-1 scroll-mt-20 px-6 py-10">
                <div className="grid gap-12 lg:grid-cols-[1fr_296px]">
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
                                {images.length > 0 ? (
                                    <div className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3">
                                        {images.map((image) => {
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
                    </div>

                    {/* Sidebar */}
                    <aside className="flex flex-col gap-10">
                        {/* Notice card */}
                        <div className="border border-ink bg-ink p-5 text-paper shadow-[6px_6px_0_0_var(--color-brand)]">
                            <div className="mb-3 flex items-center gap-2">
                                <Megaphone className="h-4 w-4 text-brand" />
                                <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-paper">{language === 'ne' ? 'सूचना' : 'Notice'}</h3>
                            </div>
                            <p className="mb-4 text-sm leading-relaxed text-paper/80">
                                {language === 'ne'
                                    ? 'वार्षिक साधारण सभा र नयाँ सदस्यता खुल्ला गरिएको छ।'
                                    : 'Annual General Meeting and new membership are now open.'}
                            </p>
                            <button className="flex items-center gap-1.5 text-sm font-semibold text-brand transition-opacity hover:opacity-80">
                                {language === 'ne' ? 'थप पढ्नुहोस्' : 'Learn More'}
                                <ArrowUpRight className="h-3.5 w-3.5" />
                            </button>
                        </div>

                        {/* Quick links */}
                        <div>
                            <h3 className="mb-3 border-b border-line pb-3 text-xs font-semibold uppercase tracking-[0.15em] text-ink-muted">{language === 'ne' ? 'द्रुत लिङ्क' : 'Quick Links'}</h3>
                            <ul className="divide-y divide-line">
                                {[
                                    language === 'ne' ? 'सदस्यता फारम' : 'Membership Form',
                                    language === 'ne' ? 'संस्थाको विधान' : 'Organization Rules',
                                    language === 'ne' ? 'आर्थिक प्रतिवेदन' : 'Financial Report',
                                    language === 'ne' ? 'हाम्रो बारेमा' : 'About Us',
                                ].map((label) => (
                                    <li key={label}>
                                        <button className="group flex w-full items-center justify-between py-2.5 text-left text-sm text-ink-muted transition-colors hover:text-brand">
                                            {label}
                                            <ArrowUpRight className="h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                                        </button>
                                    </li>
                                ))}
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
        </>
    )
}
