import { useState } from 'react'
import { useKV } from '@/lib/useKV'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Trash, PencilSimple, Calendar, MapPin, Image as ImageIcon } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { Event } from '@/lib/types'
import { format } from 'date-fns'
import ImageUpload from './ImageUpload'

// Preview image component with fallback
function PreviewImage({ src, alt }: { src: string; alt: string }) {
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  const isValidUrl = src && (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:'))
  
  if (!isValidUrl || hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted">
        <div className="text-center p-4">
          <ImageIcon size={32} className="text-muted-foreground mx-auto mb-1" weight="thin" />
          <p className="text-xs text-muted-foreground">No Image</p>
        </div>
      </div>
    )
  }
  
  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
          <ImageIcon size={24} className="text-muted-foreground" weight="thin" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onError={() => setHasError(true)}
        onLoad={() => setIsLoading(false)}
      />
    </>
  )
}

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
    imageUrl: '',
    images: [] as string[]
  })

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      type: 'cultural-program',
      venue: '',
      status: 'upcoming',
      imageUrl: '',
      images: []
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
      imageUrl: event.imageUrl || '',
      images: event.images || []
    })
    setEditingId(event.id)
  }

  const addImage = (url: string) => {
    if (url && !formData.images.includes(url)) {
      setFormData(prev => ({ ...prev, images: [...prev.images, url] }))
    }
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
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
                  label="Main Event Image (Cover)"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  This is the primary image shown in event cards.
                </p>
              </div>
              
              {/* Multiple Images Section */}
              <div className="md:col-span-2 border-t pt-4">
                <Label className="mb-2 block">Additional Images (Gallery)</Label>
                <p className="text-xs text-muted-foreground mb-3">
                  Add multiple images for this event. These will be shown in the event details dialog.
                </p>
                
                {/* Display existing images */}
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-2 mb-3">
                    {formData.images.map((img, index) => (
                      <div key={index} className="relative group aspect-square rounded overflow-hidden bg-muted">
                        <img src={img} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Add new image */}
                <ImageUpload
                  value=""
                  onChange={(url) => {
                    if (url) addImage(url)
                  }}
                  folder="events/gallery"
                  label="Add Gallery Image"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.images.length} image(s) in gallery
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

            {/* Live Preview */}
            {formData.title && (
              <div className="mt-6 pt-6 border-t">
                <h4 className="text-sm font-semibold mb-3 text-muted-foreground">Preview</h4>
                <Card className="max-w-sm overflow-hidden border-2">
                  <div className="aspect-video overflow-hidden bg-muted relative">
                    <PreviewImage src={formData.imageUrl || ''} alt={formData.title} />
                    {formData.images.length > 0 && (
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        +{formData.images.length} photos
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {formData.type === 'play' ? 'Theatre Play' :
                         formData.type === 'workshop' ? 'Workshop' :
                         formData.type === 'camp' ? 'Training Camp' :
                         formData.type === 'cultural-program' ? 'Cultural Program' : 'Event'}
                      </Badge>
                      <Badge variant={formData.status === 'upcoming' ? 'default' : 'secondary'} className="text-xs">
                        {formData.status}
                      </Badge>
                    </div>
                    <h3 className="font-semibold mb-2 line-clamp-2">{formData.title}</h3>
                    <div className="space-y-1 mb-2 text-xs text-muted-foreground">
                      {formData.date && (
                        <div className="flex items-center gap-1">
                          <Calendar size={12} weight="bold" />
                          <span>{format(new Date(formData.date), 'PPP')}</span>
                        </div>
                      )}
                      {formData.venue && (
                        <div className="flex items-center gap-1">
                          <MapPin size={12} weight="bold" />
                          <span className="line-clamp-1">{formData.venue}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs leading-relaxed line-clamp-3">{formData.description}</p>
                  </CardContent>
                </Card>
              </div>
            )}
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
                  <div className="flex items-start gap-4">
                    {/* Thumbnail */}
                    <div className="w-24 h-16 rounded overflow-hidden bg-muted flex-shrink-0 relative">
                      <PreviewImage src={event.imageUrl || ''} alt={event.title} />
                      {event.images && event.images.length > 0 && (
                        <div className="absolute bottom-0 right-0 bg-black/70 text-white text-[10px] px-1 py-0.5 rounded-tl">
                          +{event.images.length}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold truncate">{event.title}</p>
                        <span className={`text-xs px-2 py-0.5 rounded flex-shrink-0 ${event.status === 'upcoming' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                          {event.status}
                        </span>
                        {event.images && event.images.length > 0 && (
                          <span className="text-xs text-muted-foreground flex-shrink-0">
                            📷 {event.images.length} gallery
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-1 line-clamp-1">{event.description}</p>
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
