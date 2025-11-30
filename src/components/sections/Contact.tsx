import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Phone, Envelope, MapPin, IdentificationCard } from '@phosphor-icons/react'
import { OrganizationInfo } from '@/lib/types'
import { Language, useTranslation } from '@/lib/i18n'

interface ContactProps {
  orgInfo: OrganizationInfo
  language: Language
  benevityUrl?: string
}

export default function Contact({ orgInfo, language, benevityUrl }: ContactProps) {
  const t = useTranslation(language)
  
  return (
    <section id="contact" className="py-16 md:py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.contact.title}</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary via-accent to-secondary mx-auto mb-4"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone size={24} className="text-primary" weight="bold" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{t.contact.phone}</h3>
                  <a
                    href={`tel:${orgInfo.phone}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {orgInfo.phone}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Envelope size={24} className="text-secondary" weight="bold" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{t.contact.email}</h3>
                  <a
                    href={`mailto:${orgInfo.email}`}
                    className="text-muted-foreground hover:text-secondary transition-colors break-all"
                  >
                    {orgInfo.email}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin size={24} className="text-accent-foreground" weight="bold" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{t.contact.address}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {orgInfo.address}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                  <IdentificationCard size={24} className="text-foreground" weight="bold" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{t.contact.pan}</h3>
                  <p className="text-muted-foreground font-mono">
                    {orgInfo.pan}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {t.contact.panSubtitle}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 border-2 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-3">{t.contact.supportTitle}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {t.contact.supportText}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {benevityUrl && (
                  <Button size="lg" onClick={() => window.open(benevityUrl, '_blank')}>
                    {t.contact.donate}
                  </Button>
                )}
                <Button size="lg" variant={benevityUrl ? "outline" : "default"} onClick={() => window.location.href = `mailto:${orgInfo.email}`}>
                  {t.contact.contactUs}
                </Button>
                <Button size="lg" variant="outline" onClick={() => window.location.href = `tel:${orgInfo.phone}`}>
                  {t.contact.callNow}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
