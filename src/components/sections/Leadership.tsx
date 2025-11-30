import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UsersFour, Envelope, Phone } from '@phosphor-icons/react'
import { Leader } from '@/lib/types'

interface LeadershipProps {
  leaders: Leader[]
}

export default function Leadership({ leaders }: LeadershipProps) {
  const sortedLeaders = [...leaders].sort((a, b) => a.order - b.order)

  return (
    <section id="leadership" className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <UsersFour size={32} className="text-primary" weight="fill" />
            <h2 className="text-3xl md:text-4xl font-bold">Our Leadership</h2>
          </div>
          <div className="w-20 h-1 bg-gradient-to-r from-primary via-accent to-secondary mx-auto mb-4"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Dedicated individuals guiding our mission to preserve and promote cultural heritage
          </p>
        </div>

        {sortedLeaders.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {sortedLeaders.map(leader => (
              <Card
                key={leader.id}
                className="group hover:shadow-lg hover:scale-[1.02] transition-all duration-300 border-2 hover:border-primary/50"
              >
                <CardContent className="p-6 text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4 ring-4 ring-background group-hover:ring-primary/20 transition-all">
                    <AvatarImage src={leader.photo} alt={leader.name} />
                    <AvatarFallback className="text-2xl font-semibold bg-primary/10 text-primary">
                      {leader.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <h3 className="text-lg font-semibold mb-1">{leader.name}</h3>
                  <p className="text-sm font-medium text-primary mb-3">{leader.position}</p>
                  
                  {(leader.email || leader.phone) && (
                    <div className="space-y-1 pt-3 border-t">
                      {leader.email && (
                        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                          <Envelope size={14} />
                          <span className="truncate">{leader.email}</span>
                        </div>
                      )}
                      {leader.phone && (
                        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                          <Phone size={14} />
                          <span>{leader.phone}</span>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="max-w-md mx-auto">
            <CardContent className="p-8 text-center">
              <UsersFour size={48} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Leadership information will be added soon. Please check back later.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  )
}
