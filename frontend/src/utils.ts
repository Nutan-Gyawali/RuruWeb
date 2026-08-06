import type { Language } from './types'

export const getLocalizedValue = (language: Language, english?: string | null, nepali?: string | null, fallback?: string | null) => {
    if (language === 'ne') {
        return nepali?.trim() || english?.trim() || fallback?.trim() || ''
    }

    return english?.trim() || fallback?.trim() || ''
}

export const getLocalizedMenuLabel = (language: Language, english: string, nepali: string) => (language === 'ne' ? nepali : english)

export const getLocalizedContent = (language: Language, item?: any) => ({
    title: getLocalizedValue(language, item?.titleEn, item?.titleNe, item?.title),
    body: getLocalizedValue(language, item?.bodyEn, item?.bodyNe, item?.body),
    summary: getLocalizedValue(language, item?.summaryEn, item?.summaryNe, item?.summary),
})

export const getLocalizedPerson = (language: Language, item?: any) => ({
    name: getLocalizedValue(language, item?.nameEn, item?.nameNe, item?.name),
    position: getLocalizedValue(language, item?.positionEn, item?.positionNe, item?.position),
    description: getLocalizedValue(language, item?.descriptionEn, item?.descriptionNe, item?.description),
})

export const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/).filter(Boolean)
    if (parts.length === 0) return ''
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export const getLocalizedImage = (language: Language, item?: any) => ({
    title: getLocalizedValue(language, item?.titleEn, item?.titleNe, item?.title),
    description: getLocalizedValue(language, item?.descriptionEn, item?.descriptionNe, item?.description),
})
