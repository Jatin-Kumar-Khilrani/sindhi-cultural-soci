import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { List, X, Gear } from '@phosphor-icons/react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

interface HeaderProps {
  onAdminClick: () => void
}

export default function Header({ onAdminClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOwner, setIsOwner] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    window.spark.user().then(user => {
      if (user) {
        setIsOwner(user.isOwner)
      }
    })
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileOpen(false)
    }
  }

  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'Leadership', id: 'leadership' },
    { label: 'Events', id: 'events' },
    { label: 'Media', id: 'media' },
    { label: 'Contact', id: 'contact' }
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-card/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg md:text-xl">
              SCS
            </div>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-bold leading-tight">Sindhi Cultural Society</span>
              <span className="text-xs md:text-sm text-muted-foreground">Jodhpur, Rajasthan</span>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {item.label}
              </button>
            ))}
            {isOwner && (
              <Button
                variant="outline"
                size="sm"
                onClick={onAdminClick}
                className="gap-2"
              >
                <Gear weight="bold" />
                Admin
              </Button>
            )}
          </nav>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                {mobileOpen ? <X size={24} /> : <List size={24} />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-left text-lg font-medium hover:text-primary transition-colors py-2"
                  >
                    {item.label}
                  </button>
                ))}
                {isOwner && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setMobileOpen(false)
                      onAdminClick()
                    }}
                    className="gap-2 mt-4"
                  >
                    <Gear weight="bold" />
                    Admin Panel
                  </Button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
