import { ArrowUpRight, User } from 'lucide-react'
import type { Language, PersonProfile } from '../types'
import { getLocalizedPerson } from '../utils'

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

            <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                {topMembers.map((member) => {
                    const localized = getLocalizedPerson(language, member)
                    return (
                        <article key={member.id} className="group relative bg-paper p-6 transition-colors hover:bg-paper-muted">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-line text-ink-muted ring-2 ring-paper">
                                {member.imageUrl ? (
                                    <img src={member.imageUrl} alt={localized.name} className="h-full w-full object-cover" />
                                ) : (
                                    <User className="h-6 w-6" />
                                )}
                            </div>
                            <h3 className="font-semibold text-ink">{localized.name}</h3>
                            <p className="mt-1 text-sm text-ink-muted">{localized.position}</p>
                        </article>
                    )
                })}
            </div>
        </section>
    )
}
