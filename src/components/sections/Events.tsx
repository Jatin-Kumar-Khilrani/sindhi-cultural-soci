import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar, MapPin, Ticket } from '@phosphor-icons/react'
import { Event } from '@/lib/types'
import { format } from 'date-fns'

interface EventsProps {
  events: Event[]
}

export default function Events({ events }: EventsProps) {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all')

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
            <h2 className="text-3xl md:text-4xl font-bold">Events & Programs</h2>
          </div>
          <div className="w-20 h-1 bg-gradient-to-r from-primary via-accent to-secondary mx-auto mb-4"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join us in celebrating and preserving our rich cultural heritage through various programs
          </p>
        </div>

        <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)} className="mb-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="all">All Events</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>

          <TabsContent value={filter} className="mt-8">
            {filteredEvents.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map(event => (
                  <Card
                    key={event.id}
                    className="group hover:shadow-lg hover:scale-[1.02] transition-all duration-300 border-2 hover:border-primary/50 overflow-hidden"
                  >
                    {event.imageUrl && (
                      <div className="aspect-video overflow-hidden bg-muted">
                        <img
                          src={event.imageUrl}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <Badge className={getTypeColor(event.type)} variant="outline">
                          {getTypeLabel(event.type)}
                        </Badge>
                        <Badge variant={event.status === 'upcoming' ? 'default' : 'secondary'}>
                          {event.status === 'upcoming' ? 'Upcoming' : 'Completed'}
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
      </div>
    </section>
  )
}
