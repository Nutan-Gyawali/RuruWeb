import { ArrowUpRight } from 'lucide-react'
import type { Language } from '../types'

export const CtaBanner = ({ language }: { language: Language }) => {
    const isNe = language === 'ne'

    return (
        <section className="mx-auto w-full max-w-7xl px-6 py-14">
            <div className="border border-ink bg-ink px-8 py-12 text-center text-paper shadow-[8px_8px_0_0_var(--color-brand)] sm:px-16">
                <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.15em] text-brand-on-ink">
                    {isNe ? 'सामेल हुनुहोस्' : 'Join Us'}
                </span>
                <h2 className="mx-auto max-w-xl font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
                    {isNe ? 'थोरगा काठमाडौँ समुदायको सदस्य बन्नुहोस्' : 'Become a Member of Thorga Kathmandu'}
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-paper/80">
                    {isNe
                        ? 'हाम्रो संस्कृति, स्थानीय कार्यक्रमहरू र सामुदायिक सहयोगमा सहभागी हुन हामीसँग जोडिनुहोस्।'
                        : 'Connect with our community, participate in local events, and support one another.'}
                </p>
                <button className="mx-auto mt-7 flex items-center gap-2 border border-paper/40 bg-paper/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-paper backdrop-blur-sm transition-colors hover:border-brand-on-ink hover:text-brand-on-ink">
                    {isNe ? 'सदस्य बन्नुहोस्' : 'Become a Member'}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
            </div>
        </section>
    )
}
