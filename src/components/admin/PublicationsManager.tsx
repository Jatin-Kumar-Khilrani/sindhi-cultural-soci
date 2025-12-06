import { useState } from 'react'
import { useKV } from '@/lib/useKV'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Trash, Plus, ArrowSquareOut } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { NewspaperPublication } from '@/lib/types'
import ImageUpload from './ImageUpload'

export default function PublicationsManager() {
  const [publications, setPublications] = useKV<NewspaperPublication[]>('publications', [])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    publicationName: '',
    date: '',
    imageUrl: '',
    externalLink: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.publicationName || !formData.date) {
      toast.error('Please fill in all required fields')
      return
    }

    if (editingId) {
      setPublications((current) =>
        (current || []).map((pub) =>
          pub.id === editingId ? { ...formData, id: editingId } : pub
        )
      )
      toast.success('Publication updated successfully')
    } else {
      const newPublication: NewspaperPublication = {
        ...formData,
        id: Date.now().toString()
      }
      setPublications((current) => [...(current || []), newPublication])
      toast.success('Publication added successfully')
    }

    resetForm()
  }

  const handleEdit = (publication: NewspaperPublication) => {
    setFormData({
      title: publication.title,
      description: publication.description,
      publicationName: publication.publicationName,
      date: publication.date,
      imageUrl: publication.imageUrl || '',
      externalLink: publication.externalLink || ''
    })
    setEditingId(publication.id)
  }

  const handleDelete = (id: string) => {
    setPublications((current) => (current || []).filter((pub) => pub.id !== id))
    toast.success('Publication deleted successfully')
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      publicationName: '',
      date: '',
      imageUrl: '',
      externalLink: ''
    })
    setEditingId(null)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">
          {editingId ? 'Edit Publication' : 'Add New Publication'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Publication headline"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="publicationName">Publication Name *</Label>
              <Input
                id="publicationName"
                value={formData.publicationName}
                onChange={(e) => setFormData({ ...formData, publicationName: e.target.value })}
                placeholder="e.g., Times of Bluecity"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of the publication"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Publication Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="externalLink">External Link</Label>
              <Input
                id="externalLink"
                value={formData.externalLink}
                onChange={(e) => setFormData({ ...formData, externalLink: e.target.value })}
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <ImageUpload
              value={formData.imageUrl}
              onChange={(url) => setFormData({ ...formData, imageUrl: url })}
              folder="publications"
              label="Publication Image"
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit">
              <Plus className="mr-2" />
              {editingId ? 'Update Publication' : 'Add Publication'}
            </Button>
            {editingId && (
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Existing Publications</h3>
        <div className="space-y-3">
          {publications?.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No publications added yet
            </p>
          ) : (
            publications?.map((publication) => (
              <Card key={publication.id} className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-semibold">{publication.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {publication.publicationName} • {new Date(publication.date).toLocaleDateString()}
                    </p>
                    {publication.description && (
                      <p className="text-sm mt-2">{publication.description}</p>
                    )}
                    {publication.externalLink && (
                      <a
                        href={publication.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary flex items-center gap-1 mt-2 hover:underline"
                      >
                        <ArrowSquareOut size={14} />
                        View Article
                      </a>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(publication)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(publication.id)}
                    >
                      <Trash />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
