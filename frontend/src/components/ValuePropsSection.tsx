import { HeartHandshake, Landmark, TrendingUp, Users } from 'lucide-react'
import type { Language } from '../types'

const VALUE_PROPS = [
    {
        icon: Users,
        titleEn: 'Community & Belonging',
        titleNe: 'समुदाय र सम्बन्ध',
        descEn: 'Connecting people from Thorga living in Kathmandu to foster unity and belonging.',
        descNe: 'काठमाडौँमा रहेका थोर्गाबासीहरूबीच एकता र आत्मीय सम्बन्ध अभिवृद्धि गर्ने।',
    },
    {
        icon: Landmark,
        titleEn: 'Culture & Heritage',
        titleNe: 'संस्कृति र सम्पदा',
        descEn: 'Preserving our rich cultural heritage, traditions, and local identity.',
        descNe: 'हाम्रा मौलिक परम्परा, सांस्कृतिक पहिचान र सम्पदाको संरक्षण गर्ने।',
    },
    {
        icon: HeartHandshake,
        titleEn: 'Mutual Support',
        titleNe: 'पारस्परिक सहयोग',
        descEn: 'Standing together to assist community members in times of need.',
        descNe: 'सुख-दुःखमा एकआपसमा उभिँदै आवश्यक परेका सदस्यहरूलाई सहयोग पुर्‍याउने।',
    },
    {
        icon: TrendingUp,
        titleEn: 'Development',
        titleNe: 'विकास',
        descEn: 'Supporting social welfare and development initiatives for our home and community.',
        descNe: 'गाउँ तथा समुदायको सामाजिक उन्नति र विकासका कार्यहरूमा योगदान दिने।',
    },
]

type ValuePropsSectionProps = {
    language: Language
    embedded?: boolean
}

// Mostly green, with terracotta making one appearance — keeps the grid
// reading as "green-first" rather than a strict 50/50 split.
const ICON_TINTS = [
    'bg-brand-tint text-brand group-hover:bg-brand group-hover:text-on-brand',
    'bg-brand-tint text-brand group-hover:bg-brand group-hover:text-on-brand',
    'bg-sage-tint text-sage-ink group-hover:bg-sage group-hover:text-on-sage',
    'bg-brand-tint text-brand group-hover:bg-brand group-hover:text-on-brand',
] as const

export const ValuePropsSection = ({ language, embedded = false }: ValuePropsSectionProps) => {
    const content = (
        <>
            <div className="mb-6">
                <span className="inline-block rounded-full bg-brand-tint px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
                    {language === 'ne' ? 'हाम्रा कार्यहरू' : 'What We Do'}
                </span>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {VALUE_PROPS.map((prop, idx) => {
                    const Icon = prop.icon
                    return (
                        <div key={idx} className="tactile group flex flex-col gap-3 rounded-[var(--radius-container)] bg-card p-6">
                            <div className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors ${ICON_TINTS[idx % ICON_TINTS.length]}`}>
                                <Icon className="h-5 w-5" />
                            </div>
                            <h3 className="font-display text-base font-semibold text-ink">
                                {language === 'ne' ? prop.titleNe : prop.titleEn}
                            </h3>
                            <p className="text-sm leading-relaxed text-ink-muted">
                                {language === 'ne' ? prop.descNe : prop.descEn}
                            </p>
                        </div>
                    )
                })}
            </div>
        </>
    )

    if (embedded) return content

    return <section className="mx-auto w-full max-w-7xl px-6 py-14">{content}</section>
}
