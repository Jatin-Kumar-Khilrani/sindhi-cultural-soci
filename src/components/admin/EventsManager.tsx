import { useState } from 'react'
import { useKV } from '@/lib/useKV'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Trash, PencilSimple } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { Event } from '@/lib/types'
import { format } from 'date-fns'
import ImageUpload from './ImageUpload'

export default function EventsManager() {
  const [events, setEvents] = useKV<Event[]>('events', [])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    type: 'cultural-program' as Event['type'],
    venue: '',
    status: 'upcoming' as Event['status'],
    imageUrl: ''
  })

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      type: 'cultural-program',
      venue: '',
      status: 'upcoming',
      imageUrl: ''
    })
    setEditingId(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.description || !formData.date) {
      toast.error('Title, description, and date are required')
      return
    }

    if (editingId) {
      setEvents(current => 
        (current || []).map(event => 
          event.id === editingId 
            ? { ...formData, id: editingId }
            : event
        )
      )
      toast.success('Event updated successfully')
    } else {
      const newEvent: Event = {
        ...formData,
        id: Date.now().toString()
      }
      setEvents(current => [...(current || []), newEvent])
      toast.success('Event added successfully')
    }
    
    resetForm()
  }

  const handleEdit = (event: Event) => {
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      type: event.type,
      venue: event.venue || '',
      status: event.status,
      imageUrl: event.imageUrl || ''
    })
    setEditingId(event.id)
  }

  const handleDelete = (id: string) => {
    setEvents(current => (current || []).filter(event => event.id !== id))
    toast.success('Event removed successfully')
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingId ? 'Edit Event' : 'Add New Event'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="title">Event Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Event title"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Event description"
                  rows={3}
                  required
                />
              </div>
              <div>
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="type">Event Type *</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as Event['type'] }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="play">Theatre Play</SelectItem>
                    <SelectItem value="workshop">Workshop</SelectItem>
                    <SelectItem value="camp">Training Camp</SelectItem>
                    <SelectItem value="cultural-program">Cultural Program</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="venue">Venue</Label>
                <Input
                  id="venue"
                  value={formData.venue}
                  onChange={(e) => setFormData(prev => ({ ...prev, venue: e.target.value }))}
                  placeholder="Event venue"
                />
              </div>
              <div>
                <Label htmlFor="status">Status *</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as Event['status'] }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="past">Past</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <ImageUpload
                  value={formData.imageUrl}
                  onChange={(url) => setFormData(prev => ({ ...prev, imageUrl: url }))}
                  folder="events"
                  label="Event Image"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Upload an image or paste a URL. If no image is uploaded, a placeholder will be used.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="gap-2">
                <Plus weight="bold" />
                {editingId ? 'Update' : 'Add'} Event
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">All Events ({events?.length || 0})</h3>
        {events && events.length > 0 ? (
          <div className="grid gap-4">
            {[...(events || [])].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(event => (
              <Card key={event.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="font-semibold">{event.title}</p>
                        <span className={`text-xs px-2 py-1 rounded ${event.status === 'upcoming' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                          {event.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{event.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(event.date), 'PPP')} {event.venue && `• ${event.venue}`}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(event)}
                      >
                        <PencilSimple weight="bold" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(event.id)}
                      >
                        <Trash weight="bold" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              No events added yet. Add your first event above.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
