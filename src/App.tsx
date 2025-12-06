import { useState } from 'react'
import { useKV } from '@/lib/useKV'
import { Toaster } from '@/components/ui/sonner'
import Header from '@/components/sections/Header'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Leadership from '@/components/sections/Leadership'
import Events from '@/components/sections/Events'
import MediaGallery from '@/components/sections/MediaGallery'
import Publications from '@/components/sections/Publications'
import AnnualReports from '@/components/sections/AnnualReports'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'
import AdminPanel from '@/components/admin/AdminPanel'
import AdminLogin from '@/components/admin/AdminLogin'
import { Leader, Event, YouTubeVideo, OrganizationInfo, NewspaperPublication, AnnualReport, SiteSettings } from '@/lib/types'
import { Language } from '@/lib/i18n'

function App() {
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [showAdmin, setShowAdmin] = useState(false)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en')
  
  const [leaders] = useKV<Leader[]>('leaders', [])
  const [events] = useKV<Event[]>('events', [])
  const [videos] = useKV<YouTubeVideo[]>('videos', [])
  const [publications] = useKV<NewspaperPublication[]>('publications', [])
  const [annualReports] = useKV<AnnualReport[]>('annualReports', [])
  const [siteSettings] = useKV<SiteSettings>('siteSettings', {
    adminUsername: 'admin',
    adminPassword: 'admin123',
    facebookUrl: 'https://www.facebook.com/share/p/PWAzvbuxp9VD7WS9/?mibextid=Nif5oz',
    benevityUrl: 'https://benevity.com'
  })
  
  const [orgInfo] = useKV<OrganizationInfo>('organizationInfo', {
    name: 'Sindhi Cultural Society',
    foundedYear: 1982,
    registeredYear: 1984,
    mission: 'To preserve and promote Indian culture, art, and the Sindhi language through theatre, workshops, and cultural programs. We aim to empower youth with cultural values and skills, enrich students with knowledge about theatre, dance, and music, and foster environmental and social consciousness through community activities.',
    description: 'Sindhi Cultural Society, Jodhpur is a registered institution. Established in 1982, the institution was registered under the Societies Registration Act in 1984. The society is also affiliated with the Central Sahitya Akademi, New Delhi, Rajasthan Sangeet Natak Akademi, Jodhpur, and Rajasthan Sindhi Akademi, Jaipur. This institution organizes programs with the collaboration of the Ministry of Culture, Government of India, New Delhi.',
    affiliations: [
      'Central Sahitya Akademi, New Delhi',
      'Rajasthan Sangeet Natak Akademi, Jodhpur',
      'Rajasthan Sindhi Akademi, Jaipur',
      'Ministry of Culture, Government of India'
    ],
    address: '17 E/70 Chopasani Housing Board, Jodhpur – 342008',
    phone: '9414411805',
    email: 'sindhicultural@gmail.com',
    pan: 'AAATS8265M',
    youtubeChannel: 'https://www.youtube.com/@sindhiculturalsocietyjodhp7658'
  })

  const handleAdminClick = () => {
    setShowAdminLogin(true)
  }

  const handleAuthenticated = () => {
    setIsAdminAuthenticated(true)
    setShowAdmin(true)
  }

  return (
    <div className="min-h-screen">
      <Header 
        onAdminClick={handleAdminClick}
        language={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        facebookUrl={siteSettings?.facebookUrl}
        logoUrl={siteSettings?.logoUrl}
      />
      <main>
        <Hero mission={orgInfo?.mission || ''} language={currentLanguage} />
        <About orgInfo={orgInfo!} language={currentLanguage} />
        <Leadership leaders={leaders || []} language={currentLanguage} />
        <Events events={events || []} language={currentLanguage} />
        <Publications publications={publications || []} language={currentLanguage} />
        <AnnualReports reports={annualReports || []} language={currentLanguage} />
        <MediaGallery videos={videos || []} youtubeChannel={orgInfo?.youtubeChannel || ''} language={currentLanguage} />
        <Contact orgInfo={orgInfo!} language={currentLanguage} benevityUrl={siteSettings?.benevityUrl} />
      </main>
      <Footer orgInfo={orgInfo!} language={currentLanguage} facebookUrl={siteSettings?.facebookUrl} logoUrl={siteSettings?.logoUrl} />
      <AdminLogin 
        open={showAdminLogin} 
        onOpenChange={setShowAdminLogin}
        onAuthenticated={handleAuthenticated}
      />
      <AdminPanel 
        open={showAdmin} 
        onOpenChange={setShowAdmin}
        isAuthenticated={isAdminAuthenticated}
      />
      <Toaster />
    </div>
  )
}

export default App
