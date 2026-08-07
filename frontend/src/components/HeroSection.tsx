import { ArrowDown } from 'lucide-react'
import type { Language, SiteImage } from '../types'
import { getLocalizedImage } from '../utils'

// Gulmi District, Nepal (Thorga's home district) — snow line of the Annapurna
// range above the mid-hills. Used until the org uploads its own gallery photos.
const FALLBACK_HERO_SRC = '/images/gulmi-hero.jpg'

type HeroSectionProps = {
    language: Language
    heroImage?: SiteImage
    eyebrow: string
    headline: string
    body: string
}

export const HeroSection = ({ language, heroImage, eyebrow, headline, body }: HeroSectionProps) => {
    const localizedImage = heroImage ? getLocalizedImage(language, heroImage) : null

    const scrollToContent = () => {
        document.getElementById('content-start')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section className="mx-auto w-full max-w-7xl px-6 pt-6">
            <div className="relative isolate grid gap-6 overflow-hidden rounded-[var(--radius-page)] bg-paper-muted px-6 py-6 sm:px-8 sm:py-7 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:px-10 lg:py-8">
                {/* Blob decoration — sage, drifting behind the copy */}
                <div className="blob -right-20 -top-24 h-64 w-64 bg-sage-muted sm:h-72 sm:w-72" />
                <div className="blob -bottom-16 left-1/3 hidden h-40 w-40 bg-brand-muted sm:block" />

                <div className="animate-hero-in relative">
                    <span className="inline-block rounded-full bg-sage-tint px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sage-ink">
                        {eyebrow}
                    </span>
                    <h2 className="mt-3 max-w-xl font-display text-2xl font-semibold leading-[1.15] tracking-tight text-ink sm:text-3xl lg:text-[2.25rem]">
                        {headline}
                    </h2>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted sm:text-base">{body}</p>
                    <button
                        onClick={scrollToContent}
                        className="mt-5 flex items-center gap-2 rounded-full bg-brand-fill px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-on-brand-fill transition-transform hover:brightness-105 active:scale-[0.97]"
                    >
                        {language === 'ne' ? 'अन्वेषण गर्नुहोस्' : 'Explore'}
                        <ArrowDown className="h-3.5 w-3.5" />
                    </button>
                </div>

                <div className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius-container)] shadow-[var(--shadow-high)] lg:aspect-[4/3]">
                    <img
                        src={heroImage ? heroImage.imageUrl : FALLBACK_HERO_SRC}
                        alt={localizedImage?.title || (language === 'ne' ? 'गुल्मी जिल्ला, नेपाल' : 'Gulmi District, Nepal')}
                        className="h-full w-full object-cover saturate-[0.85] contrast-[0.95] brightness-[1.05]"
                    />
                </div>
            </div>
        </section>
    )
}
