export type SiteContent = {
    id: number
    category: string
    title: string
    body: string
    summary?: string | null
    titleEn?: string | null
    titleNe?: string | null
    bodyEn?: string | null
    bodyNe?: string | null
    summaryEn?: string | null
    summaryNe?: string | null
    sortOrder: number
    isActive: boolean
}

export type PersonProfile = {
    id: number
    category: string
    name: string
    position?: string | null
    description?: string | null
    imageUrl?: string | null
    externalLink?: string | null
    nameEn?: string | null
    nameNe?: string | null
    positionEn?: string | null
    positionNe?: string | null
    descriptionEn?: string | null
    descriptionNe?: string | null
    sortOrder: number
    isActive: boolean
}

export type SiteImage = {
    id: number
    category: string
    title: string
    description?: string | null
    imageUrl: string
    titleEn?: string | null
    titleNe?: string | null
    descriptionEn?: string | null
    descriptionNe?: string | null
    sortOrder: number
    isActive: boolean
}

export type Language = 'en' | 'ne'
export type MainPage = 'introduction' | 'activities' | 'publications' | 'notices' | 'gallery' | 'financial' | 'organization-page' | 'related-publications' | 'old-materials'
export type IntroductionPage = 'company-intro' | 'thorga-intro' | 'current-members' | 'current-advisors' | 'past-members' | 'past-advisors' | 'rules' | 'lifetime-members' | 'certificates'
export type PublicationPage = 'calendar' | 'phone-diary' | 'bulletin' | 'memories' | 'others'
