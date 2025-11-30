import { Button } from '@/components/ui/button'
import { ArrowDown } from '@phosphor-icons/react'
import { Language, useTranslation } from '@/lib/i18n'

interface HeroProps {
  mission: string
  language: Language
}

export default function Hero({ mission, language }: HeroProps) {
  const t = useTranslation(language)
  
  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10">
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="25" cy="25" r="2" fill="currentColor" />
              <circle cx="75" cy="75" r="2" fill="currentColor" />
              <path d="M 50 10 L 60 30 L 80 30 L 65 45 L 70 65 L 50 50 L 30 65 L 35 45 L 20 30 L 40 30 Z" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pattern)" />
        </svg>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 md:px-6 py-24 md:py-32 text-center">
        <div className="inline-block mb-6 px-4 py-2 bg-primary/10 rounded-full">
          <span className="text-sm font-medium text-primary">Established 1982</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
          Sindhi Cultural Society
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-4 max-w-3xl mx-auto">
          {t.hero.subtitle}
        </p>
        
        <div className="w-24 h-1 bg-gradient-to-r from-primary via-accent to-secondary mx-auto mb-8"></div>
        
        <p className="text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-12">
          {mission}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" onClick={scrollToContact} className="gap-2 min-w-[160px]">
            {t.contact.contactUs}
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="gap-2 min-w-[160px]"
          >
            {t.nav.about}
          </Button>
        </div>

        <button
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground hover:text-primary transition-colors"
          aria-label="Scroll down"
        >
          <ArrowDown size={32} />
        </button>
      </div>
    </section>
  )
}
