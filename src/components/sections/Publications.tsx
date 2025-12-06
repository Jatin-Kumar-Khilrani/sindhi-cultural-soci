import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowSquareOut, Newspaper } from '@phosphor-icons/react'
import { NewspaperPublication } from '@/lib/types'
import { Language, useTranslation } from '@/lib/i18n'

// Check if URL is likely a valid image URL
function isImageUrl(url: string): boolean {
  if (!url) return false
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp']
  const lowerUrl = url.toLowerCase()
  // Check for image extensions or blob storage URLs
  return imageExtensions.some(ext => lowerUrl.includes(ext)) || 
         lowerUrl.includes('blob.core.windows.net')
}

interface PublicationsProps {
  publications: NewspaperPublication[]
  language: Language
}

// Component for publication image with fallback
function PublicationImage({ url, title }: { url: string; title: string }) {
  const [hasError, setHasError] = useState(false)
  
  if (!url || hasError || !isImageUrl(url)) {
    // Show placeholder with newspaper icon
    return (
      <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 flex items-center justify-center">
        <Newspaper size={64} className="text-primary/40" weight="duotone" />
      </div>
    )
  }
  
  return (
    <div className="aspect-[4/3] overflow-hidden bg-muted">
      <img
        src={url}
        alt={title}
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        onError={() => setHasError(true)}
      />
    </div>
  )
}

export default function Publications({ publications, language }: PublicationsProps) {
  const t = useTranslation(language)
  const sortedPublications = [...publications].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <section id="publications" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Newspaper size={32} className="text-primary" weight="duotone" />
            <h2 className="text-4xl font-bold">{t.publications.title}</h2>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.publications.subtitle}
          </p>
        </div>

        {sortedPublications.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No publications to display yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {sortedPublications.map((publication) => (
              <Card
                key={publication.id}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <PublicationImage url={publication.imageUrl || ''} title={publication.title} />
                <div className="p-6 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium text-primary">
                        {publication.publicationName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {t.publications.publishedOn} {new Date(publication.date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-lg leading-tight">
                    {publication.title}
                  </h3>
                  
                  {publication.description && (
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {publication.description}
                    </p>
                  )}
                  
                  {publication.externalLink && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-2"
                      asChild
                    >
                      <a
                        href={publication.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <ArrowSquareOut />
                        {t.publications.readMore}
                      </a>
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
