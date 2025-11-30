import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Toaster } from '@/components/ui/sonner'
import Header from '@/components/sections/Header'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Leadership from '@/components/sections/Leadership'
import Events from '@/components/sections/Events'
import MediaGallery from '@/components/sections/MediaGallery'
import Publications from '@/components/sections/Publications'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'
import AdminPanel from '@/components/admin/AdminPanel'
import { Leader, Event, YouTubeVideo, OrganizationInfo, NewspaperPublication } from '@/lib/types'

function App() {
  const [showAdmin, setShowAdmin] = useState(false)
  const [leaders] = useKV<Leader[]>('leaders', [])
  const [events] = useKV<Event[]>('events', [])
  const [videos] = useKV<YouTubeVideo[]>('videos', [])
  const [publications] = useKV<NewspaperPublication[]>('publications', [])
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

  return (
    <div className="min-h-screen">
      <Header onAdminClick={() => setShowAdmin(true)} />
      <main>
        <Hero mission={orgInfo?.mission || ''} />
        <About orgInfo={orgInfo!} />
        <Leadership leaders={leaders || []} />
        <Events events={events || []} />
        <Publications publications={publications || []} />
        <MediaGallery videos={videos || []} youtubeChannel={orgInfo?.youtubeChannel || ''} />
        <Contact orgInfo={orgInfo!} />
      </main>
      <Footer orgInfo={orgInfo!} />
      <AdminPanel open={showAdmin} onOpenChange={setShowAdmin} />
      <Toaster />
    </div>
  )
}

export default App
