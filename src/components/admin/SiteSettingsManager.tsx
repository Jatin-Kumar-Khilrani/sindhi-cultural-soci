import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'
import { SiteSettings } from '@/lib/types'

export default function SiteSettingsManager() {
  const [settings, setSettings] = useKV<SiteSettings>('siteSettings', {
    adminUsername: 'admin',
    adminPassword: 'admin123'
  })
  
  const [formData, setFormData] = useState({
    adminUsername: '',
    adminPassword: '',
    facebookUrl: '',
    benevityUrl: ''
  })

  useEffect(() => {
    if (settings) {
      setFormData({
        adminUsername: settings.adminUsername || '',
        adminPassword: settings.adminPassword || '',
        facebookUrl: settings.facebookUrl || '',
        benevityUrl: settings.benevityUrl || ''
      })
    }
  }, [settings])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSettings(formData)
    toast.success('Settings updated successfully')
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Site Settings</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <h4 className="font-medium text-sm text-muted-foreground">Admin Credentials</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="adminUsername">Admin Username *</Label>
                  <Input
                    id="adminUsername"
                    value={formData.adminUsername}
                    onChange={(e) => setFormData({ ...formData, adminUsername: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminPassword">Admin Password *</Label>
                  <Input
                    id="adminPassword"
                    type="password"
                    value={formData.adminPassword}
                    onChange={(e) => setFormData({ ...formData, adminPassword: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h4 className="font-medium text-sm text-muted-foreground">Social & Donation Links</h4>
              <div className="space-y-2">
                <Label htmlFor="facebookUrl">Facebook Page URL</Label>
                <Input
                  id="facebookUrl"
                  value={formData.facebookUrl}
                  onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                  placeholder="https://www.facebook.com/..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="benevityUrl">Benevity Donation URL</Label>
                <Input
                  id="benevityUrl"
                  value={formData.benevityUrl}
                  onChange={(e) => setFormData({ ...formData, benevityUrl: e.target.value })}
                  placeholder="https://benevity.com/..."
                />
              </div>
            </div>

            <Button type="submit">Save Settings</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
