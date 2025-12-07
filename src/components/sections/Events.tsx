import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Calendar, MapPin, Ticket, Image as ImageIcon } from '@phosphor-icons/react'
import { Event } from '@/lib/types'
import { format } from 'date-fns'
import { Language, useTranslation } from '@/lib/i18n'

// Component to handle event images with fallback
function EventImage({ src, alt }: { src: string; alt: string }) {
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Check if URL is valid
  const isValidUrl = src && (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:'))

  if (!isValidUrl || hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted">
        <div className="text-center p-4">
          <ImageIcon size={48} className="text-muted-foreground mx-auto mb-2" weight="thin" />
          <p className="text-xs text-muted-foreground">No Image</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
          <ImageIcon size={32} className="text-muted-foreground" weight="thin" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onError={() => setHasError(true)}
        onLoad={() => setIsLoading(false)}
      />
    </>
  )
}

interface EventsProps {
  events: Event[]
  language: Language
}

export default function Events({ events, language }: EventsProps) {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all')
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const t = useTranslation(language)

  const upcomingEvents = events.filter(e => e.status === 'upcoming').sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  )
  const pastEvents = events.filter(e => e.status === 'past').sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const filteredEvents = filter === 'all' ? events : filter === 'upcoming' ? upcomingEvents : pastEvents

  const getTypeColor = (type: Event['type']) => {
    switch (type) {
      case 'play': return 'bg-primary/10 text-primary border-primary/20'
      case 'workshop': return 'bg-secondary/10 text-secondary border-secondary/20'
      case 'camp': return 'bg-accent/10 text-accent-foreground border-accent/20'
      case 'cultural-program': return 'bg-destructive/10 text-destructive border-destructive/20'
      default: return 'bg-muted text-muted-foreground border-border'
    }
  }

  const getTypeLabel = (type: Event['type']) => {
    switch (type) {
      case 'play': return 'Theatre Play'
      case 'workshop': return 'Workshop'
      case 'camp': return 'Training Camp'
      case 'cultural-program': return 'Cultural Program'
      default: return 'Event'
    }
  }

  return (
    <section id="events" className="py-16 md:py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calendar size={32} className="text-primary" weight="fill" />
            <h2 className="text-3xl md:text-4xl font-bold">{t.events.title}</h2>
          </div>
          <div className="w-20 h-1 bg-gradient-to-r from-primary via-accent to-secondary mx-auto mb-4"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.events.subtitle}
          </p>
        </div>

        <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)} className="mb-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="all">{t.events.all}</TabsTrigger>
            <TabsTrigger value="upcoming">{t.events.upcoming}</TabsTrigger>
            <TabsTrigger value="past">{t.events.past}</TabsTrigger>
          </TabsList>

          <TabsContent value={filter} className="mt-8">
            {filteredEvents.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map(event => (
                  <Card
                    key={event.id}
                    className="group hover:shadow-lg hover:scale-[1.02] transition-all duration-300 border-2 hover:border-primary/50 overflow-hidden cursor-pointer"
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div className="aspect-video overflow-hidden bg-muted relative">
                      <EventImage src={event.imageUrl || ''} alt={event.title} />
                      {event.images && event.images.length > 0 && (
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                          📷 +{event.images.length}
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <Badge className={getTypeColor(event.type)} variant="outline">
                          {getTypeLabel(event.type)}
                        </Badge>
                        <Badge variant={event.status === 'upcoming' ? 'default' : 'secondary'}>
                          {event.status === 'upcoming' ? t.events.upcoming : t.events.past}
                        </Badge>
                      </div>

                      <h3 className="text-xl font-semibold mb-2 line-clamp-2">{event.title}</h3>
                      
                      <div className="space-y-2 mb-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} weight="bold" />
                          <span>{format(new Date(event.date), 'PPP')}</span>
                        </div>
                        {event.venue && (
                          <div className="flex items-center gap-2">
                            <MapPin size={16} weight="bold" />
                            <span className="line-clamp-1">{event.venue}</span>
                          </div>
                        )}
                      </div>

                      <p className="text-sm leading-relaxed line-clamp-3">{event.description}</p>
                      {event.description.length > 150 && (
                        <Button
                          variant="link"
                          className="p-0 h-auto text-primary font-medium"
                          onClick={() => setSelectedEvent(event)}
                        >
                          {t.events.readMore} →
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="max-w-md mx-auto">
                <CardContent className="p-8 text-center">
                  <Ticket size={48} className="text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-2">
                    {filter === 'upcoming' ? 'No upcoming events scheduled at the moment.' : 
                     filter === 'past' ? 'No past events recorded yet.' :
                     'No events available.'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Check back soon or contact us for more information.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Read More Dialog */}
        <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            {selectedEvent && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-xl">{selectedEvent.title}</DialogTitle>
                  <DialogDescription asChild>
                    <div className="flex flex-wrap items-center gap-2 pt-2">
                      <Badge className={getTypeColor(selectedEvent.type)} variant="outline">
                        {getTypeLabel(selectedEvent.type)}
                      </Badge>
                      <Badge variant={selectedEvent.status === 'upcoming' ? 'default' : 'secondary'}>
                        {selectedEvent.status === 'upcoming' ? t.events.upcoming : t.events.past}
                      </Badge>
                    </div>
                  </DialogDescription>
                </DialogHeader>
                
                {/* Main Image */}
                {selectedEvent.imageUrl && (
                  <div className="aspect-video overflow-hidden rounded-lg bg-muted relative">
                    <EventImage src={selectedEvent.imageUrl} alt={selectedEvent.title} />
                  </div>
                )}
                
                {/* Image Gallery */}
                {selectedEvent.images && selectedEvent.images.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Gallery ({selectedEvent.images.length} photos)</p>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                      {selectedEvent.images.map((img, index) => (
                        <div key={index} className="aspect-square overflow-hidden rounded-lg bg-muted relative cursor-pointer hover:opacity-90 transition-opacity">
                          <img 
                            src={img} 
                            alt={`${selectedEvent.title} - Photo ${index + 1}`}
                            className="w-full h-full object-cover"
                            onClick={() => window.open(img, '_blank')}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} weight="bold" />
                      <span>{format(new Date(selectedEvent.date), 'PPP')}</span>
                    </div>
                    {selectedEvent.venue && (
                      <div className="flex items-center gap-2">
                        <MapPin size={16} weight="bold" />
                        <span>{selectedEvent.venue}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{selectedEvent.description}</p>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
