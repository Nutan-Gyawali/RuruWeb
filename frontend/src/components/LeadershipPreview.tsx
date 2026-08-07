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
            <div className="mb-8 flex items-end justify-between">
                <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
                    {language === 'ne' ? 'हाम्रो नेतृत्व' : 'Our Leadership'}
                </h2>
                <button
                    onClick={onViewAll}
                    className="group flex shrink-0 items-center gap-1 rounded-full py-1.5 pl-3.5 pr-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-brand transition-colors hover:bg-brand-muted"
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
                        <article key={member.id} className="tactile group flex flex-col items-center rounded-[var(--radius-page)] bg-card p-6 text-center">
                            <div className="mb-4 flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-muted text-lg font-semibold text-brand ring-4 ring-paper transition-shadow group-hover:ring-brand-muted">
                                {member.imageUrl ? (
                                    <img src={member.imageUrl} alt={localized.name} className="h-full w-full object-cover" />
                                ) : initials ? (
                                    <span>{initials}</span>
                                ) : (
                                    <User className="h-7 w-7" />
                                )}
                            </div>
                            <h3 className="font-display text-base font-semibold text-ink">{localized.name}</h3>
                            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-brand">{localized.position}</p>
                        </article>
                    )
                })}
            </div>
        </section>
    )
}
