import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, Seal } from '@phosphor-icons/react'
import { OrganizationInfo } from '@/lib/types'

interface AboutProps {
  orgInfo: OrganizationInfo
}

export default function About({ orgInfo }: AboutProps) {
  return (
    <section id="about" className="py-16 md:py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Us</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary via-accent to-secondary mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Seal size={24} className="text-primary" weight="fill" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Our Heritage</h3>
                  <p className="text-muted-foreground">
                    Founded in {orgInfo.foundedYear}, registered in {orgInfo.registeredYear}
                  </p>
                </div>
              </div>
              <p className="leading-relaxed">
                {orgInfo.description}
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle size={24} className="text-secondary" weight="fill" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                  <p className="text-muted-foreground">Preserving culture since 1982</p>
                </div>
              </div>
              <p className="leading-relaxed">
                {orgInfo.mission}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 border-accent/30 bg-accent/5">
          <CardContent className="p-6 md:p-8">
            <h3 className="text-2xl font-semibold mb-6 text-center">Prestigious Affiliations</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {orgInfo.affiliations.map((affiliation, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-primary mt-1 flex-shrink-0" weight="bold" />
                  <span className="leading-relaxed">{affiliation}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
