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

export const StatsStrip = ({ language, stats }: StatsStripProps) => {
    const visibleStats = stats.filter((stat) => stat.value > 0)

    if (visibleStats.length === 0) return null

    return (
        <section className="border-y border-line bg-paper-muted">
            <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-px bg-line sm:grid-cols-4">
                {visibleStats.map((stat) => (
                    <div key={stat.labelEn} className="flex flex-col items-center gap-1 bg-paper-muted px-4 py-8 text-center">
                        <span className="font-display text-4xl font-semibold tracking-tight text-brand">{stat.value}+</span>
                        <span className="text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">
                            {language === 'ne' ? stat.labelNe : stat.labelEn}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    )
}
