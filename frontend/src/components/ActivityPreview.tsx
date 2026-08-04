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
    <div className="mb-6 flex items-end justify-between border-b border-line pb-4">
        <div>
            <div className="mb-2 h-[3px] w-9 bg-brand" />
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">{label}</h2>
        </div>
        <button
            onClick={onViewAll}
            className="group flex shrink-0 items-center gap-1 pb-1 text-xs font-semibold uppercase tracking-[0.1em] text-brand transition-colors hover:text-ink"
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
                        <div className="divide-y divide-line border-t border-line">
                            {recentActivities.map((item) => {
                                const localized = getLocalizedContent(language, item)
                                return (
                                    <article key={item.id} className="group py-5">
                                        <h3 className="mb-1.5 flex items-baseline gap-2 text-sm font-semibold text-ink">
                                            <span className="text-brand transition-transform group-hover:translate-x-0.5">—</span>
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
                        <div className="grid grid-cols-2 gap-px border border-line bg-line">
                            {recentImages.map((image) => {
                                const localized = getLocalizedImage(language, image)
                                return (
                                    <figure key={image.id} className="group overflow-hidden bg-paper">
                                        <img
                                            src={image.imageUrl}
                                            alt={localized.title}
                                            className="h-28 w-full object-cover grayscale transition-all duration-500 ease-out group-hover:scale-[1.04] group-hover:grayscale-0 sm:h-32"
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
