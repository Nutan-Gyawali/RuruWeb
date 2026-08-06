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
                <div className="mb-8 flex items-end justify-between border-b border-line pb-4">
                    <div>
                        <div className="mb-2 h-[3px] w-9 bg-brand" />
                        <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
                            {language === 'ne' ? 'पछिल्ला प्रकाशनहरू' : 'Recent Publications'}
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

                <div className="grid gap-6 md:grid-cols-3">
                    {recentPubs.map((pub) => {
                        const localized = getLocalizedContent(language, pub)
                        return (
                            <article key={pub.id} className="tactile flex flex-col border border-line bg-paper p-6">
                                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center bg-brand-muted text-brand">
                                    <BookOpen className="h-5 w-5" />
                                </div>
                                <h3 className="mb-3 font-semibold text-ink line-clamp-2">{localized.title || pub.title}</h3>
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
