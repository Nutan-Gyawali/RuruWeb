import { Mail, MapPin, Phone } from 'lucide-react'
import type { Language } from '../types'

export const Footer = ({ language }: { language: Language }) => {
    return (
        <footer className="mt-16 border-t-2 border-brand bg-ink px-6 pt-12 pb-0 text-paper/70">
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 sm:grid-cols-4">
                <div>
                    <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-brand">{language === 'ne' ? 'पुराना सामग्री' : 'Archives'}</h3>
                    <p className="text-sm leading-relaxed">{language === 'ne' ? 'समुदायको पुरानी अभिलेख तथा heritage records।' : 'Archive and heritage records for the community.'}</p>
                </div>
                <div>
                    <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-brand">{language === 'ne' ? 'सम्पर्क' : 'Contact'}</h3>
                    <ul className="space-y-1.5 text-sm">
                        <li className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 shrink-0" /> info@thorga.com</li>
                        <li className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 shrink-0" /> +977-1-4000000</li>
                        <li className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 shrink-0" /> Kathmandu, Nepal</li>
                    </ul>
                </div>
                <div>
                    <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-brand">{language === 'ne' ? 'समुदाय' : 'Community'}</h3>
                    <ul className="space-y-1.5 text-sm">
                        <li>{language === 'ne' ? 'स्कूल' : 'School'}</li>
                        <li>{language === 'ne' ? 'शाकारी' : 'Shakari'}</li>
                    </ul>
                </div>
                <div>
                    <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-brand">{language === 'ne' ? 'प्रकाशन' : 'Publications'}</h3>
                    <p className="text-sm leading-relaxed">{language === 'ne' ? 'बुलेटिन, डायरी, क्यालेन्डर र स्मृतिहरू।' : 'Bulletin, diary, calendar, and memories.'}</p>
                </div>
            </div>
            <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 py-5 text-center text-xs">
                &copy; {new Date().getFullYear()} Thorga Kathmandu · All rights reserved
            </div>
        </footer>
    )
}
