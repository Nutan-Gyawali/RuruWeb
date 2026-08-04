import type { Language } from '../types'

export const Footer = ({ language }: { language: Language }) => {
    return (
        <footer className="mt-10 bg-sky-200 px-6 pt-12 pb-0 text-black">
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 sm:grid-cols-4">
                <div>
                    <h3 className="mb-3 text-sm font-semibold text-black">{language === 'ne' ? 'पुराना सामग्री' : 'Archives'}</h3>
                    <p className="text-sm leading-relaxed text-black">{language === 'ne' ? 'समुदायको पुरानी अभिलेख तथा heritage records।' : 'Archive and heritage records for the community.'}</p>
                </div>
                <div>
                    <h3 className="mb-3 text-sm font-semibold text-black">{language === 'ne' ? 'सम्पर्क' : 'Contact'}</h3>
                    <p className="text-sm text-black">info@thorga.com</p>
                    <p className="text-sm text-black">+977-1-4000000</p>
                    <p className="text-sm text-black">Kathmandu, Nepal</p>
                </div>
                <div>
                    <h3 className="mb-3 text-sm font-semibold text-black">{language === 'ne' ? 'समुदाय' : 'Community'}</h3>
                    <p className="text-sm text-black">{language === 'ne' ? 'स्कूल' : 'School'}</p>
                    <p className="text-sm text-black">{language === 'ne' ? 'शाकारी' : 'Shakari'}</p>
                </div>
                <div>
                    <h3 className="mb-3 text-sm font-semibold text-black">{language === 'ne' ? 'प्रकाशन' : 'Publications'}</h3>
                    <p className="text-sm leading-relaxed text-black">{language === 'ne' ? 'बुलेटिन, डायरी, क्यालेन्डर र स्मृतिहरू।' : 'Bulletin, diary, calendar, and memories.'}</p>
                </div>
            </div>
            <div className="mx-auto mt-10 max-w-7xl border-t border-sky-300 py-5 text-center text-xs text-black">
                &copy; {new Date().getFullYear()} Thorga Kathmandu · All rights reserved
            </div>
        </footer>
    )
}
