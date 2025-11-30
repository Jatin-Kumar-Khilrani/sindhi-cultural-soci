import { Separator } from '@/components/ui/separator'
import { YoutubeLogo, Envelope, Phone } from '@phosphor-icons/react'
import { OrganizationInfo } from '@/lib/types'

interface FooterProps {
  orgInfo: OrganizationInfo
}

export default function Footer({ orgInfo }: FooterProps) {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-secondary-foreground/10 rounded-full flex items-center justify-center text-secondary-foreground font-bold">
                SCS
              </div>
              <div>
                <h3 className="font-bold text-lg">{orgInfo.name}</h3>
                <p className="text-sm opacity-80">Jodhpur, Rajasthan</p>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              Preserving and promoting Indian culture, art, and the Sindhi language since {orgInfo.foundedYear}.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                  className="opacity-80 hover:opacity-100 transition-opacity"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('leadership')?.scrollIntoView({ behavior: 'smooth' })}
                  className="opacity-80 hover:opacity-100 transition-opacity"
                >
                  Leadership
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
                  className="opacity-80 hover:opacity-100 transition-opacity"
                >
                  Events
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('media')?.scrollIntoView({ behavior: 'smooth' })}
                  className="opacity-80 hover:opacity-100 transition-opacity"
                >
                  Media Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="opacity-80 hover:opacity-100 transition-opacity"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={16} weight="bold" />
                <a href={`tel:${orgInfo.phone}`} className="opacity-80 hover:opacity-100 transition-opacity">
                  {orgInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Envelope size={16} weight="bold" />
                <a href={`mailto:${orgInfo.email}`} className="opacity-80 hover:opacity-100 transition-opacity break-all">
                  {orgInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-2 mt-4">
                <button
                  onClick={() => window.open(orgInfo.youtubeChannel, '_blank')}
                  className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity"
                >
                  <YoutubeLogo size={20} weight="fill" />
                  YouTube Channel
                </button>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-secondary-foreground/20" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-80">
          <p>
            © {new Date().getFullYear()} {orgInfo.name}. All rights reserved.
          </p>
          <p>
            Registered under Societies Registration Act, {orgInfo.registeredYear}
          </p>
        </div>
      </div>
    </footer>
  )
}
