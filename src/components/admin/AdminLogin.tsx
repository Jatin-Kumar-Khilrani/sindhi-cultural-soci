import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { SiteSettings } from '@/lib/types'

interface AdminLoginProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAuthenticated: () => void
}

export default function AdminLogin({ open, onOpenChange, onAuthenticated }: AdminLoginProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [siteSettings] = useKV<SiteSettings>('siteSettings', {
    adminUsername: 'admin',
    adminPassword: 'admin123'
  })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (username === siteSettings?.adminUsername && password === siteSettings?.adminPassword) {
      toast.success('Login successful')
      onAuthenticated()
      onOpenChange(false)
      setUsername('')
      setPassword('')
    } else {
      toast.error('Invalid username or password')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Admin Login</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleLogin} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
