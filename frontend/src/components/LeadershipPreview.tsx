import { ArrowUpRight, User } from 'lucide-react'
import type { Language, PersonProfile } from '../types'
import { getLocalizedPerson, getInitials } from '../utils'

type LeadershipPreviewProps = {
    language: Language
    members: PersonProfile[]
    onViewAll: () => void
}

export const LeadershipPreview = ({ language, members, onViewAll }: LeadershipPreviewProps) => {
    const topMembers = members.slice(0, 4)

    return (
        <section className="mx-auto w-full max-w-7xl px-6 py-14">
            <div className="mb-8 flex items-end justify-between border-b border-line pb-4">
                <div>
                    <div className="mb-2 h-[3px] w-9 bg-brand" />
                    <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
                        {language === 'ne' ? 'हाम्रो नेतृत्व' : 'Our Leadership'}
                    </h2>
                </div>
                <button
                    onClick={onViewAll}
                    className="group flex shrink-0 items-center gap-1 pb-1 text-xs font-semibold uppercase tracking-[0.1em] text-brand transition-colors hover:text-ink"
                >
                    {language === 'ne' ? 'सबै हेर्नुहोस्' : 'View All'}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {topMembers.map((member) => {
                    const localized = getLocalizedPerson(language, member)
                    const initials = getInitials(localized.name)
                    return (
                        <article key={member.id} className="tactile group flex flex-col items-center border border-line bg-paper p-5 text-center">
                            <div className="mb-4 aspect-square w-full overflow-hidden border border-line bg-brand-muted text-brand">
                                {member.imageUrl ? (
                                    <img src={member.imageUrl} alt={localized.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
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
                            
                            <h3 className="font-display text-base font-semibold text-ink transition-colors group-hover:text-brand">{localized.name}</h3>
                            {localized.position && (
                                <span className="mt-1.5 inline-block border border-brand bg-brand-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-brand">
                                    {localized.position}
                                </span>
                            )}
                        </article>
                    )
                })}
            </div>
        </section>
    )
}
