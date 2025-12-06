import { useState } from 'react'
import { useKV } from '@/lib/useKV'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Plus, Trash, PencilSimple } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { Leader } from '@/lib/types'

export default function LeadershipManager() {
  const [leaders, setLeaders] = useKV<Leader[]>('leaders', [])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    photo: '',
    email: '',
    phone: '',
    order: 0
  })

  const resetForm = () => {
    setFormData({ name: '', position: '', photo: '', email: '', phone: '', order: 0 })
    setEditingId(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.position) {
      toast.error('Name and position are required')
      return
    }

    if (editingId) {
      setLeaders(current => 
        (current || []).map(leader => 
          leader.id === editingId 
            ? { ...formData, id: editingId }
            : leader
        )
      )
      toast.success('Leader updated successfully')
    } else {
      const newLeader: Leader = {
        ...formData,
        id: Date.now().toString()
      }
      setLeaders(current => [...(current || []), newLeader])
      toast.success('Leader added successfully')
    }
    
    resetForm()
  }

  const handleEdit = (leader: Leader) => {
    setFormData({
      name: leader.name,
      position: leader.position,
      photo: leader.photo || '',
      email: leader.email || '',
      phone: leader.phone || '',
      order: leader.order
    })
    setEditingId(leader.id)
  }

  const handleDelete = (id: string) => {
    setLeaders(current => (current || []).filter(leader => leader.id !== id))
    toast.success('Leader removed successfully')
  }

  return (
    <div className="space-y-6">
      <Card className="bg-accent/50 border-accent">
        <CardContent className="p-4">
          <p className="text-sm">
            <strong>Note:</strong> "President" and "Adhyaksh" are the same position. Use "President" for English, and the translations will automatically show "Adhyaksh" in Hindi/Sindhi.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingId ? 'Edit Leader' : 'Add New Leader'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Full name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="position">Position *</Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                  placeholder="e.g., President, Secretary"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Phone number"
                />
              </div>
              <div>
                <Label htmlFor="photo">Photo URL</Label>
                <Input
                  id="photo"
                  value={formData.photo}
                  onChange={(e) => setFormData(prev => ({ ...prev, photo: e.target.value }))}
                  placeholder="https://... (image URL)"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Upload your image to a service like Imgur, ImgBB, or use a direct URL
                </p>
                {formData.photo && (
                  <div className="mt-2 p-4 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground mb-2">Preview:</p>
                    <img 
                      src={formData.photo} 
                      alt="Photo preview" 
                      className="w-20 h-20 rounded-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="order">Display Order</Label>
                <Input
                  id="order"
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                  placeholder="0"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="gap-2">
                <Plus weight="bold" />
                {editingId ? 'Update' : 'Add'} Leader
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
        <h3 className="text-lg font-semibold">Current Leadership ({leaders?.length || 0})</h3>
        {leaders && leaders.length > 0 ? (
          <div className="grid gap-4">
            {[...(leaders || [])].sort((a, b) => a.order - b.order).map(leader => (
              <Card key={leader.id}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {leader.photo ? (
                      <img 
                        src={leader.photo} 
                        alt={leader.name}
                        className="w-12 h-12 rounded-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    ) : (
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center font-semibold text-primary">
                        {leader.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                    )}
                    <div>
                      <p className="font-semibold">{leader.name}</p>
                      <p className="text-sm text-muted-foreground">{leader.position}</p>
                      {leader.email && (
                        <p className="text-xs text-muted-foreground">{leader.email}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(leader)}
                    >
                      <PencilSimple weight="bold" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(leader.id)}
                    >
                      <Trash weight="bold" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              No leaders added yet. Add your first leader above.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
