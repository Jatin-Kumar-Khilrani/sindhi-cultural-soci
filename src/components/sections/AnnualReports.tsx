import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, Calendar } from '@phosphor-icons/react'
import { AnnualReport } from '@/lib/types'
import { Language, useTranslation } from '@/lib/i18n'

interface AnnualReportsProps {
  reports: AnnualReport[]
  language: Language
}

export default function AnnualReports({ reports, language }: AnnualReportsProps) {
  const t = useTranslation(language)
  
  if (!reports || reports.length === 0) {
    return null
  }

  const sortedReports = [...reports].sort((a, b) => b.year.localeCompare(a.year))

  return (
    <section id="annual-reports" className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.annualReports.title}</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary via-accent to-secondary mx-auto mb-4"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.annualReports.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedReports.map(report => (
            <Card key={report.id} className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar size={24} className="text-primary" weight="bold" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground mb-1">{t.annualReports.year}</div>
                    <h3 className="font-bold text-xl text-primary">{report.year}</h3>
                  </div>
                </div>
                
                <h4 className="font-semibold text-lg mb-2">{report.title}</h4>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {report.description}
                </p>
                
                {report.fileUrl && (
                  <Button
                    onClick={() => window.open(report.fileUrl, '_blank')}
                    className="w-full gap-2"
                    variant="outline"
                  >
                    <Download weight="bold" />
                    {t.annualReports.downloadReport}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
