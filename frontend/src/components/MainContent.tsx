import type { Language, MainPage, IntroductionPage, PublicationPage, SiteContent, PersonProfile, SiteImage } from '../types'
import { getLocalizedContent, getLocalizedPerson, getLocalizedImage } from '../utils'

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

const PersonGrid = ({ people: personList, language, emptyMsg }: { people: PersonProfile[]; language: Language; emptyMsg: string }) => (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {personList.length > 0 ? personList.map((person) => {
            const localized = getLocalizedPerson(language, person)
            return (
                <div key={person.id} className="group flex flex-col items-center rounded-md border border-sky-200 bg-white p-5 text-center transition-all hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md">
                    <div className="mb-3 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-sky-100 text-2xl shadow-sm text-black">
                        {person.imageUrl ? <img src={person.imageUrl} alt={localized.name} className="h-full w-full object-cover" /> : <span>👤</span>}
                    </div>
                    <strong className="text-sm font-semibold text-black">{localized.name}</strong>
                    <span className="mt-0.5 text-xs text-black">{localized.position}</span>
                </div>
            )
        }) : <p className="col-span-full text-sm text-black">{emptyMsg}</p>}
    </div>
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

    return (
        <main className="mx-auto max-w-7xl px-6 py-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
                {/* Main content */}
                <div className="min-w-0">
                    {selectedMainPage === 'introduction' && (
                        <div>
                            {selectedIntroPage === 'company-intro' && (
                                <div className="mb-8 flex min-h-80 items-center justify-center rounded-lg bg-gradient-to-br from-sky-200 via-sky-100 to-white p-10 text-center border border-sky-200">
                                    <div className="max-w-xl">
                                        <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-black">{language === 'ne' ? 'थोर्गा काठमाण्डौंमा स्वागत छ' : 'Welcome to Thorga Kathmandu'}</h2>
                                        <p className="text-lg leading-relaxed text-black">{introText.body || 'A community-oriented social and cultural organization bringing people together for learning, heritage, support, and development.'}</p>
                                    </div>
                                </div>
                            )}

                            <div className="rounded-lg border border-sky-200 bg-white p-6 shadow-sm">
                                <div className="mb-5 flex items-center gap-3 border-b border-sky-100 pb-4">
                                    <div className="h-6 w-1 rounded-full bg-sky-400" />
                                    <h2 className="text-xl font-bold text-black">{introActiveLabel}</h2>
                                </div>

                                {selectedIntroPage === 'company-intro' && (
                                    <>
                                        <p className="mb-6 text-base leading-relaxed text-black">
                                            {introText.body || 'Thorga is a community-oriented social and cultural organization bringing people together for learning, heritage, support, and development.'}
                                        </p>
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <div className="rounded-md border border-sky-200 bg-white p-5 shadow-sm transition-all hover:border-sky-300">
                                                <h3 className="mb-2 text-sm font-semibold text-black">{language === 'ne' ? 'उद्देश्य' : 'Mission'}</h3>
                                                <p className="text-sm leading-relaxed text-black">{aimsText.body || 'Promote social development, cultural preservation, and public coordination.'}</p>
                                            </div>
                                            <div className="rounded-md border border-sky-200 bg-white p-5 shadow-sm transition-all hover:border-sky-300">
                                                <h3 className="mb-2 text-sm font-semibold text-black">{language === 'ne' ? 'समुदाय' : 'Community'}</h3>
                                                <p className="text-sm leading-relaxed text-black">{hometownText.body || 'A shared village and community connection that supports people from Thorga in Kathmandu.'}</p>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {selectedIntroPage === 'thorga-intro' && (
                                    <>
                                        <p className="mb-4 leading-relaxed text-black">{hometownText.body || 'Thorga is a place-based identity connecting families and traditions through shared belonging.'}</p>
                                        <p className="leading-relaxed text-black">{rulesText.body || 'The association strengthens ties among members through mutual support and good governance.'}</p>
                                    </>
                                )}

                                {selectedIntroPage === 'current-members' && <PersonGrid people={currentMembers} language={language} emptyMsg="No current members found." />}
                                {selectedIntroPage === 'current-advisors' && <PersonGrid people={currentAdvisors} language={language} emptyMsg="No current advisors found." />}
                                {selectedIntroPage === 'past-members' && <PersonGrid people={pastMembers} language={language} emptyMsg="No past members found." />}
                                {selectedIntroPage === 'past-advisors' && <PersonGrid people={pastAdvisors} language={language} emptyMsg="No past advisors found." />}
                            </div>
                        </div>
                    )}

                    {selectedMainPage === 'activities' && (
                        <div className="rounded-lg border border-sky-200 bg-white p-6 shadow-sm">
                            <div className="mb-5 flex items-center gap-3 border-b border-sky-100 pb-4">
                                <div className="h-6 w-1 rounded-full bg-sky-400" />
                                <h2 className="text-xl font-bold text-black">{language === 'ne' ? 'हालका गतिविधिहरू' : 'Recent Activities'}</h2>
                            </div>
                            <div className="space-y-3">
                                {(content.worksDone ?? []).map((item) => {
                                    const localized = getLocalizedContent(language, item)
                                    return (
                                        <article key={item.id} className="rounded-md border border-sky-200 bg-white p-4 shadow-sm transition-all hover:border-sky-300">
                                            <h3 className="mb-1 text-sm font-semibold text-black">{localized.title || item.title}</h3>
                                            <p className="text-sm leading-relaxed text-black">{localized.body || item.body}</p>
                                        </article>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {selectedMainPage === 'publications' && (
                        <div className="rounded-lg border border-sky-200 bg-white p-6 shadow-sm">
                            <div className="mb-5 flex items-center gap-3 border-b border-sky-100 pb-4">
                                <div className="h-6 w-1 rounded-full bg-sky-400" />
                                <h2 className="text-xl font-bold text-black">{pubActiveLabel}</h2>
                            </div>
                            <div className="space-y-3">
                                {(content.publication ?? []).map((item) => {
                                    const localized = getLocalizedContent(language, item)
                                    return (
                                        <article key={item.id} className="rounded-md border border-sky-200 bg-white p-4 shadow-sm transition-all hover:border-sky-300">
                                            <h3 className="mb-1 text-sm font-semibold text-black">{localized.title || item.title}</h3>
                                            <p className="text-sm leading-relaxed text-black">{localized.body || item.body}</p>
                                        </article>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {selectedMainPage === 'notices' && (
                        <div className="rounded-lg border border-sky-200 bg-white p-6 shadow-sm">
                            <div className="mb-5 flex items-center gap-3 border-b border-sky-100 pb-4">
                                <div className="h-6 w-1 rounded-full bg-sky-400" />
                                <h2 className="text-xl font-bold text-black">{language === 'ne' ? 'सूचना' : 'Notices'}</h2>
                            </div>
                            <div className="space-y-3">
                                {(content.others ?? []).map((item) => {
                                    const localized = getLocalizedContent(language, item)
                                    return (
                                        <article key={item.id} className="rounded-md border border-sky-200 bg-white p-4 shadow-sm transition-all hover:border-sky-300">
                                            <h3 className="mb-1 text-sm font-semibold text-black">{localized.title || item.title}</h3>
                                            <p className="text-sm leading-relaxed text-black">{localized.body || item.body}</p>
                                        </article>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {selectedMainPage === 'gallery' && (
                        <div className="rounded-lg border border-sky-200 bg-white p-6 shadow-sm">
                            <div className="mb-5 flex items-center gap-3 border-b border-sky-100 pb-4">
                                <div className="h-6 w-1 rounded-full bg-sky-400" />
                                <h2 className="text-xl font-bold text-black">{language === 'ne' ? 'फोटो ग्यालेरी' : 'Gallery'}</h2>
                            </div>
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                                {images.map((image) => {
                                    const localized = getLocalizedImage(language, image)
                                    return (
                                        <figure key={image.id} className="group overflow-hidden rounded-md border border-sky-200">
                                            <img src={image.imageUrl} alt={localized.title} className="h-44 w-full object-cover transition-transform group-hover:scale-105" />
                                            <figcaption className="bg-sky-50 px-3 py-2 text-xs font-medium text-black">{localized.title}</figcaption>
                                        </figure>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <aside className="flex flex-col gap-5">
                    {/* Notice card */}
                    <div className="overflow-hidden rounded-lg border border-sky-200 bg-white shadow-sm">
                        <div className="bg-sky-200 px-5 py-3">
                            <h3 className="text-sm font-semibold text-black">📢 {language === 'ne' ? 'सूचना' : 'Notice'}</h3>
                        </div>
                        <div className="p-5">
                            <p className="mb-4 text-sm leading-relaxed text-black">
                                {language === 'ne'
                                    ? 'वार्षिक साधारण सभा र नयाँ सदस्यता खुल्ला गरिएको छ।'
                                    : 'Annual General Meeting and new membership are now open.'}
                            </p>
                            <button className="w-full rounded-md bg-sky-300 px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-sky-400">
                                {language === 'ne' ? 'थप पढ्नुहोस्' : 'Learn More'}
                            </button>
                        </div>
                    </div>

                    {/* Quick links */}
                    <div className="rounded-lg border border-sky-200 bg-white p-5 shadow-sm">
                        <h3 className="mb-3 border-b border-sky-100 pb-3 text-sm font-semibold text-black">{language === 'ne' ? 'द्रुत लिङ्क' : 'Quick Links'}</h3>
                        <ul className="space-y-0">
                            {[
                                language === 'ne' ? 'सदस्यता फारम' : 'Membership Form',
                                language === 'ne' ? 'संस्थाको विधान' : 'Organization Rules',
                                language === 'ne' ? 'आर्थिक प्रतिवेदन' : 'Financial Report',
                                language === 'ne' ? 'हाम्रो बारेमा' : 'About Us',
                            ].map((label) => (
                                <li key={label} className="border-b border-sky-50 last:border-0">
                                    <button className="group flex w-full items-center gap-2 py-2.5 text-left text-sm text-black transition-colors hover:bg-sky-50 rounded-md px-2 -mx-2">
                                        <span className="text-xs text-black transition-transform group-hover:translate-x-0.5">→</span> {label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Map */}
                    <div className="overflow-hidden rounded-lg border border-sky-200 bg-white shadow-sm">
                        <div className="flex items-center gap-2 bg-sky-100 px-5 py-3">
                            <h3 className="text-sm font-semibold text-black">📍 {language === 'ne' ? 'स्थान' : 'Location'}</h3>
                        </div>
                        <iframe
                            title="Thorga map"
                            src="https://www.google.com/maps?q=Kathmandu&z=12&output=embed"
                            loading="lazy"
                            className="h-44 w-full border-0"
                        />
                    </div>
                </aside>
            </div>
        </main>
    )
}
