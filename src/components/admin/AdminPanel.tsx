import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import LeadershipManager from './LeadershipManager'
import EventsManager from './EventsManager'
import VideosManager from './VideosManager'
import PublicationsManager from './PublicationsManager'
import AnnualReportsManager from './AnnualReportsManager'
import SiteSettingsManager from './SiteSettingsManager'

interface AdminPanelProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  isAuthenticated: boolean
}

export default function AdminPanel({ open, onOpenChange, isAuthenticated }: AdminPanelProps) {
  if (!isAuthenticated) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Admin Configuration Panel</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[calc(90vh-120px)] pr-4">
          <Tabs defaultValue="leadership" className="mt-4">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="leadership">Leadership</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="publications">Publications</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
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

            <TabsContent value="publications" className="mt-6">
              <PublicationsManager />
            </TabsContent>

            <TabsContent value="reports" className="mt-6">
              <AnnualReportsManager />
            </TabsContent>

            <TabsContent value="settings" className="mt-6">
              <SiteSettingsManager />
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
