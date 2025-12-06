import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import LeadershipManager from './LeadershipManager'
import EventsManager from './EventsManager'
import VideosManager from './VideosManager'
import PublicationsManager from './PublicationsManager'
import AnnualReportsManager from './AnnualReportsManager'
import SiteSettingsManager from './SiteSettingsManager'
import OrganizationInfoManager from './OrganizationInfoManager'

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
          <DialogDescription>Manage your website content, leadership, events, and settings</DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[calc(90vh-120px)] pr-4">
          <Tabs defaultValue="organization" className="mt-4">
            <TabsList className="flex flex-wrap h-auto gap-1 p-1">
              <TabsTrigger value="organization" className="text-xs px-3 py-1.5">Organization</TabsTrigger>
              <TabsTrigger value="leadership" className="text-xs px-3 py-1.5">Leadership</TabsTrigger>
              <TabsTrigger value="events" className="text-xs px-3 py-1.5">Events</TabsTrigger>
              <TabsTrigger value="videos" className="text-xs px-3 py-1.5">Videos</TabsTrigger>
              <TabsTrigger value="publications" className="text-xs px-3 py-1.5">Publications</TabsTrigger>
              <TabsTrigger value="reports" className="text-xs px-3 py-1.5">Reports</TabsTrigger>
              <TabsTrigger value="settings" className="text-xs px-3 py-1.5">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="organization" className="mt-6">
              <OrganizationInfoManager />
            </TabsContent>

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
