import { ArrowUpRight } from 'lucide-react'
import type { Language } from '../types'

export const CtaBanner = ({ language }: { language: Language }) => {
    const isNe = language === 'ne'

    return (
        <section className="mx-auto w-full max-w-7xl px-6 py-14">
            <div className="relative isolate overflow-hidden rounded-[var(--radius-page)] bg-brand-fill px-8 py-14 text-center text-on-brand-fill sm:px-16">
                <div className="blob -bottom-28 left-1/4 h-72 w-72 bg-sage opacity-25" />
                <div className="blob -top-24 right-10 hidden h-52 w-52 bg-[color-mix(in_oklab,var(--color-background-surface)_45%,transparent)] sm:block" />

                <span className="relative mb-3 block text-xs font-semibold uppercase tracking-[0.18em] opacity-90">
                    {isNe ? 'सामेल हुनुहोस्' : 'Join Us'}
                </span>
                <h2 className="relative mx-auto max-w-xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                    {isNe ? 'थोरगा काठमाडौँ समुदायको सदस्य बन्नुहोस्' : 'Become a Member of Thorga Kathmandu'}
                </h2>
                <p className="relative mx-auto mt-3 max-w-md text-sm leading-relaxed opacity-90">
                    {isNe
                        ? 'हाम्रो संस्कृति, स्थानीय कार्यक्रमहरू र सामुदायिक सहयोगमा सहभागी हुन हामीसँग जोडिनुहोस्।'
                        : 'Connect with our community, participate in local events, and support one another.'}
                </p>
                <button className="relative mx-auto mt-8 flex items-center gap-2 rounded-full bg-paper px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-brand transition-transform hover:brightness-105 active:scale-[0.97]">
                    {isNe ? 'सदस्य बन्नुहोस्' : 'Become a Member'}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
            </div>
        </section>
    )
}
