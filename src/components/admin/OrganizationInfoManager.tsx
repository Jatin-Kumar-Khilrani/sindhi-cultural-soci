import { useState, useEffect } from 'react'
import { useKV } from '@/lib/useKV'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Trash, FloppyDisk } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { OrganizationInfo } from '@/lib/types'

const defaultOrgInfo: OrganizationInfo = {
  name: 'Sindhi Cultural Society',
  foundedYear: 1982,
  registeredYear: 1984,
  mission: 'To preserve and promote Indian culture, art, and the Sindhi language through theatre, workshops, and cultural programs.',
  description: 'Sindhi Cultural Society, Jodhpur is a registered institution.',
  affiliations: [],
  address: '',
  phone: '',
  email: '',
  pan: '',
  youtubeChannel: ''
}

export default function OrganizationInfoManager() {
  const [orgInfo, setOrgInfo] = useKV<OrganizationInfo>('organizationInfo', defaultOrgInfo)
  const [formData, setFormData] = useState<OrganizationInfo>(defaultOrgInfo)
  const [newAffiliation, setNewAffiliation] = useState('')

  useEffect(() => {
    if (orgInfo) {
      setFormData(orgInfo)
    }
  }, [orgInfo])

  const handleSave = () => {
    setOrgInfo(formData)
    toast.success('Organization info saved successfully!')
  }

  const handleAddAffiliation = () => {
    if (!newAffiliation.trim()) return
    setFormData(prev => ({
      ...prev,
      affiliations: [...(prev.affiliations || []), newAffiliation.trim()]
    }))
    setNewAffiliation('')
  }

  const handleRemoveAffiliation = (index: number) => {
    setFormData(prev => ({
      ...prev,
      affiliations: (prev.affiliations || []).filter((_, i) => i !== index)
    }))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Organization Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Sindhi Cultural Society"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="foundedYear">Founded Year</Label>
                <Input
                  id="foundedYear"
                  type="number"
                  value={formData.foundedYear}
                  onChange={(e) => setFormData({ ...formData, foundedYear: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="registeredYear">Registered Year</Label>
                <Input
                  id="registeredYear"
                  type="number"
                  value={formData.registeredYear}
                  onChange={(e) => setFormData({ ...formData, registeredYear: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mission">Mission Statement</Label>
            <Textarea
              id="mission"
              value={formData.mission}
              onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
              rows={3}
              placeholder="Our mission is to..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">About Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              placeholder="Detailed description of the organization..."
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Affiliations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newAffiliation}
              onChange={(e) => setNewAffiliation(e.target.value)}
              placeholder="e.g., Central Sahitya Akademi, New Delhi"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddAffiliation())}
            />
            <Button type="button" onClick={handleAddAffiliation} variant="outline">
              <Plus weight="bold" />
              Add
            </Button>
          </div>
          
          {formData.affiliations && formData.affiliations.length > 0 ? (
            <ul className="space-y-2">
              {formData.affiliations.map((affiliation, index) => (
                <li key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                  <span className="text-sm">{affiliation}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveAffiliation(index)}
                  >
                    <Trash size={16} />
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No affiliations added yet</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="9876543210"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="info@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              rows={2}
              placeholder="Full address..."
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pan">PAN Number</Label>
              <Input
                id="pan"
                value={formData.pan}
                onChange={(e) => setFormData({ ...formData, pan: e.target.value })}
                placeholder="AAATS8265M"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="youtubeChannel">YouTube Channel URL</Label>
              <Input
                id="youtubeChannel"
                value={formData.youtubeChannel}
                onChange={(e) => setFormData({ ...formData, youtubeChannel: e.target.value })}
                placeholder="https://youtube.com/@channel"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">
          <FloppyDisk weight="bold" className="mr-2" />
          Save Organization Info
        </Button>
      </div>
    </div>
  )
}
