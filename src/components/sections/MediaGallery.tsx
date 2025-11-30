import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, YoutubeLogo } from '@phosphor-icons/react'
import { YouTubeVideo } from '@/lib/types'
import { Language, useTranslation } from '@/lib/i18n'

interface MediaGalleryProps {
  videos: YouTubeVideo[]
  youtubeChannel: string
  language: Language
}

export default function MediaGallery({ videos, youtubeChannel, language }: MediaGalleryProps) {
  const t = useTranslation(language)
  
  const getEmbedUrl = (videoId: string) => {
    return `https://www.youtube.com/embed/${videoId}`
  }

  return (
    <section id="media" className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Play size={32} className="text-primary" weight="fill" />
            <h2 className="text-3xl md:text-4xl font-bold">{t.media.title}</h2>
          </div>
          <div className="w-20 h-1 bg-gradient-to-r from-primary via-accent to-secondary mx-auto mb-4"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.media.subtitle}
          </p>
        </div>

        {videos.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {videos.map(video => (
                <Card
                  key={video.id}
                  className="group hover:shadow-lg hover:scale-[1.02] transition-all duration-300 border-2 hover:border-primary/50 overflow-hidden"
                >
                  <div className="aspect-video bg-muted relative">
                    <iframe
                      src={getEmbedUrl(video.videoId)}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold line-clamp-2">{video.title}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button
                size="lg"
                variant="outline"
                className="gap-2"
                onClick={() => window.open(youtubeChannel, '_blank')}
              >
                <YoutubeLogo size={24} weight="fill" />
                {t.media.visitChannel}
              </Button>
            </div>
          </>
        ) : (
          <Card className="max-w-md mx-auto">
            <CardContent className="p-8 text-center">
              <YoutubeLogo size={48} className="text-muted-foreground mx-auto mb-4" weight="fill" />
              <p className="text-muted-foreground mb-4">
                Our video gallery is being updated. Visit our YouTube channel to watch our performances.
              </p>
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => window.open(youtubeChannel, '_blank')}
              >
                <YoutubeLogo size={20} weight="fill" />
                {t.media.visitChannel}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  )
}
