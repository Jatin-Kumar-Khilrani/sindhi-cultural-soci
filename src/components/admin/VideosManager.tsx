import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Plus, Trash, PencilSimple } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { YouTubeVideo } from '@/lib/types'

export default function VideosManager() {
  const [videos, setVideos] = useKV<YouTubeVideo[]>('videos', [])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    videoId: ''
  })

  const resetForm = () => {
    setFormData({ title: '', videoId: '' })
    setEditingId(null)
  }

  const extractVideoId = (input: string): string => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/,
      /^([a-zA-Z0-9_-]{11})$/
    ]
    
    for (const pattern of patterns) {
      const match = input.match(pattern)
      if (match) return match[1]
    }
    
    return input
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.videoId) {
      toast.error('Title and video ID/URL are required')
      return
    }

    const extractedId = extractVideoId(formData.videoId)

    if (editingId) {
      setVideos(current => 
        (current || []).map(video => 
          video.id === editingId 
            ? { ...formData, videoId: extractedId, id: editingId }
            : video
        )
      )
      toast.success('Video updated successfully')
    } else {
      const newVideo: YouTubeVideo = {
        id: Date.now().toString(),
        title: formData.title,
        videoId: extractedId
      }
      setVideos(current => [...(current || []), newVideo])
      toast.success('Video added successfully')
    }
    
    resetForm()
  }

  const handleEdit = (video: YouTubeVideo) => {
    setFormData({
      title: video.title,
      videoId: video.videoId
    })
    setEditingId(video.id)
  }

  const handleDelete = (id: string) => {
    setVideos(current => (current || []).filter(video => video.id !== id))
    toast.success('Video removed successfully')
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingId ? 'Edit Video' : 'Add New Video'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Video Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Video title"
                required
              />
            </div>
            <div>
              <Label htmlFor="videoId">YouTube Video ID or URL *</Label>
              <Input
                id="videoId"
                value={formData.videoId}
                onChange={(e) => setFormData(prev => ({ ...prev, videoId: e.target.value }))}
                placeholder="dQw4w9WgXcQ or full YouTube URL"
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                Enter the 11-character video ID or paste the full YouTube URL
              </p>
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="gap-2">
                <Plus weight="bold" />
                {editingId ? 'Update' : 'Add'} Video
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
        <h3 className="text-lg font-semibold">All Videos ({videos?.length || 0})</h3>
        {videos && videos.length > 0 ? (
          <div className="grid gap-4">
            {(videos || []).map(video => (
              <Card key={video.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-32 h-20 bg-muted rounded overflow-hidden flex-shrink-0">
                        <img
                          src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">{video.title}</p>
                        <p className="text-xs text-muted-foreground font-mono">{video.videoId}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(video)}
                      >
                        <PencilSimple weight="bold" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(video.id)}
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
              No videos added yet. Add your first video above.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
