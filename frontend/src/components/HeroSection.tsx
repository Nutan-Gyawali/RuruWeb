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
        <section className="relative isolate flex min-h-[460px] items-end overflow-hidden bg-ink text-paper sm:min-h-[600px] lg:min-h-[85vh]">
            <img
                src={heroImage ? heroImage.imageUrl : FALLBACK_HERO_SRC}
                alt={localizedImage?.title || (language === 'ne' ? 'गुल्मी जिल्ला, नेपाल' : 'Gulmi District, Nepal')}
                className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />

            <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 pt-32 sm:pb-20">
                <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.22em] text-brand">{eyebrow}</span>
                <h2 className="max-w-2xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-paper drop-shadow-sm sm:text-6xl">{headline}</h2>
                <p className="mt-5 max-w-md text-base leading-relaxed text-paper/90 drop-shadow-sm">{body}</p>
                <button
                    onClick={scrollToContent}
                    className="mt-9 flex items-center gap-2 border border-paper/40 bg-ink/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-paper backdrop-blur-sm transition-colors hover:border-brand hover:text-brand"
                >
                    {language === 'ne' ? 'अन्वेषण गर्नुहोस्' : 'Explore'}
                    <ArrowDown className="h-3.5 w-3.5" />
                </button>
            </div>
        </section>
    )
}
