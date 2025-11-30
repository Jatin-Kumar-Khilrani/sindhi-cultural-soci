export interface Leader {
  id: string
  name: string
  position: string
  photo?: string
  email?: string
  phone?: string
  order: number
}

export interface Event {
  id: string
  title: string
  description: string
  date: string
  type: 'play' | 'workshop' | 'camp' | 'cultural-program' | 'other'
  venue?: string
  status: 'upcoming' | 'past'
  imageUrl?: string
}

export interface OrganizationInfo {
  name: string
  foundedYear: number
  registeredYear: number
  mission: string
  description: string
  affiliations: string[]
  address: string
  phone: string
  email: string
  pan: string
  youtubeChannel: string
}

export interface YouTubeVideo {
  id: string
  title: string
  videoId: string
  thumbnail?: string
}

export interface NewspaperPublication {
  id: string
  title: string
  description: string
  publicationName: string
  date: string
  imageUrl?: string
  externalLink?: string
}
