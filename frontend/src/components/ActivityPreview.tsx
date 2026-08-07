import { ArrowUpRight } from 'lucide-react'
import type { Language, SiteContent, SiteImage } from '../types'
import { getLocalizedContent, getLocalizedImage } from '../utils'

type ActivityPreviewProps = {
    language: Language
    activities: SiteContent[]
    images: SiteImage[]
    onViewActivities: () => void
    onViewGallery: () => void
}

const PreviewHeading = ({ label, onViewAll, viewAllLabel }: { label: string; onViewAll: () => void; viewAllLabel: string }) => (
    <div className="mb-6 flex items-end justify-between">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">{label}</h2>
        <button
            onClick={onViewAll}
            className="group flex shrink-0 items-center gap-1 rounded-full py-1.5 pl-3.5 pr-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-brand transition-colors hover:bg-brand-muted"
        >
            {viewAllLabel}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
    </div>
)

export const ActivityPreview = ({ language, activities, images, onViewActivities, onViewGallery }: ActivityPreviewProps) => {
    const recentActivities = activities.slice(0, 3)
    const recentImages = images.slice(0, 4)

    if (recentActivities.length === 0 && recentImages.length === 0) return null

    const showBoth = recentActivities.length > 0 && recentImages.length > 0

    return (
        <section className="mx-auto w-full max-w-7xl px-6 py-14">
            <div className={`grid gap-12 ${showBoth ? 'lg:grid-cols-2' : ''}`}>
                {recentActivities.length > 0 && (
                    <div>
                        <PreviewHeading
                            label={language === 'ne' ? 'हालका गतिविधिहरू' : 'Recent Activities'}
                            onViewAll={onViewActivities}
                            viewAllLabel={language === 'ne' ? 'सबै हेर्नुहोस्' : 'View All'}
                        />
                        <div className="flex flex-col gap-2">
                            {recentActivities.map((item) => {
                                const localized = getLocalizedContent(language, item)
                                return (
                                    <article key={item.id} className="group rounded-[var(--radius-container)] bg-card p-5 transition-colors">
                                        <h3 className="mb-1.5 flex items-center gap-2.5 text-sm font-semibold text-ink">
                                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                                            {localized.title || item.title}
                                        </h3>
                                        <p className="line-clamp-2 pl-4 text-sm leading-relaxed text-ink-muted">{localized.body || item.body}</p>
                                    </article>
                                )
                            })}
                        </div>
                    </div>
                )}

                {recentImages.length > 0 && (
                    <div>
                        <PreviewHeading
                            label={language === 'ne' ? 'फोटो ग्यालेरी' : 'Gallery'}
                            onViewAll={onViewGallery}
                            viewAllLabel={language === 'ne' ? 'सबै हेर्नुहोस्' : 'View All'}
                        />
                        <div className="grid grid-cols-2 gap-3">
                            {recentImages.map((image) => {
                                const localized = getLocalizedImage(language, image)
                                return (
                                    <figure key={image.id} className="tactile overflow-hidden rounded-[var(--radius-container)]">
                                        <img
                                            src={image.imageUrl}
                                            alt={localized.title}
                                            className="h-28 w-full object-cover saturate-[0.85] transition-transform duration-500 ease-out group-hover:scale-[1.04] sm:h-32"
                                        />
                                    </figure>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
