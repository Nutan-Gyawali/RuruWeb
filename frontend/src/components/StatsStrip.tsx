import type { Language } from '../types'

export type StatItem = {
    value: number
    labelEn: string
    labelNe: string
}

type StatsStripProps = {
    language: Language
    stats: StatItem[]
}

const TINTS = [
    'bg-brand-tint text-brand',
    'bg-brand-tint text-brand',
    'bg-sage-tint text-sage-ink',
    'bg-paper-muted text-ink',
] as const

export const StatsStrip = ({ language, stats }: StatsStripProps) => {
    const visibleStats = stats.filter((stat) => stat.value > 0)

    if (visibleStats.length === 0) return null

    return (
        <section className="mx-auto w-full max-w-7xl px-6 py-10">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {visibleStats.map((stat, idx) => (
                    <div
                        key={stat.labelEn}
                        className={`flex flex-col items-center gap-1.5 rounded-[var(--radius-container)] px-4 py-7 text-center ${TINTS[idx % TINTS.length]}`}
                    >
                        <span className="font-display text-4xl font-semibold tracking-tight">{stat.value}+</span>
                        <span className="text-xs font-medium uppercase tracking-[0.12em] opacity-80">
                            {language === 'ne' ? stat.labelNe : stat.labelEn}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    )
}
