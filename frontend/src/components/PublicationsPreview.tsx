import { ArrowUpRight, BookOpen } from 'lucide-react'
import type { Language, SiteContent } from '../types'
import { getLocalizedContent } from '../utils'

type PublicationsPreviewProps = {
    language: Language
    publications: SiteContent[]
    onViewAll: () => void
}

export const PublicationsPreview = ({ language, publications, onViewAll }: PublicationsPreviewProps) => {
    const recentPubs = publications.slice(0, 3)

    return (
        <section className="bg-paper-muted">
            <div className="mx-auto w-full max-w-7xl px-6 py-14">
                <div className="mb-8 flex items-end justify-between">
                    <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
                        {language === 'ne' ? 'पछिल्ला प्रकाशनहरू' : 'Recent Publications'}
                    </h2>
                    <button
                        onClick={onViewAll}
                        className="group flex shrink-0 items-center gap-1 rounded-full py-1.5 pl-3.5 pr-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-brand transition-colors hover:bg-brand-muted"
                    >
                        {language === 'ne' ? 'सबै हेर्नुहोस्' : 'View All'}
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {recentPubs.map((pub) => {
                        const localized = getLocalizedContent(language, pub)
                        return (
                            <article key={pub.id} className="tactile flex flex-col rounded-[var(--radius-page)] bg-card p-6">
                                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-sage-tint text-sage-ink">
                                    <BookOpen className="h-5 w-5" />
                                </div>
                                <h3 className="mb-3 font-display text-lg font-semibold text-ink line-clamp-2">{localized.title || pub.title}</h3>
                                <p className="text-sm leading-relaxed text-ink-muted line-clamp-3 mb-4 flex-1">
                                    {localized.body || pub.body}
                                </p>
                            </article>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
