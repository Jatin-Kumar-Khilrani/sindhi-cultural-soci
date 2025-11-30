import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Leader, Event, YouTubeVideo } from '@/lib/types'
import LeadershipManager from './LeadershipManager'
import EventsManager from './EventsManager'
import VideosManager from './VideosManager'

interface AdminPanelProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function AdminPanel({ open, onOpenChange }: AdminPanelProps) {
  const [isOwner, setIsOwner] = useState(false)
  const [leaders] = useKV<Leader[]>('leaders', [])
  const [events] = useKV<Event[]>('events', [])
  const [videos] = useKV<YouTubeVideo[]>('videos', [])

  useEffect(() => {
    window.spark.user().then(user => {
      if (user) {
        setIsOwner(user.isOwner)
      }
    })
  }, [])

  if (!isOwner) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Admin Configuration Panel</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="leadership" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="leadership">Leadership</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
          </TabsList>

          <TabsContent value="leadership" className="mt-6">
            <LeadershipManager />
          </TabsContent>

          <TabsContent value="events" className="mt-6">
            <EventsManager />
          </TabsContent>

          <TabsContent value="videos" className="mt-6">
            <VideosManager />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
