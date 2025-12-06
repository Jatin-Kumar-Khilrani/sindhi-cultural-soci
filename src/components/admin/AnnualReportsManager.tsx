import { useState } from 'react'
import { useKV } from '@/lib/useKV'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Plus, Trash, PencilSimple } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { AnnualReport } from '@/lib/types'
import FileUpload from './FileUpload'

export default function AnnualReportsManager() {
  const [reports, setReports] = useKV<AnnualReport[]>('annualReports', [])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    year: '',
    title: '',
    description: '',
    fileUrl: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingId) {
      setReports((current) =>
        (current || []).map(report =>
          report.id === editingId
            ? { ...report, ...formData }
            : report
        )
      )
      toast.success('Report updated successfully')
    } else {
      const newReport: AnnualReport = {
        id: Date.now().toString(),
        ...formData
      }
      setReports((current) => [...(current || []), newReport])
      toast.success('Report added successfully')
    }
    
    resetForm()
  }

  const handleEdit = (report: AnnualReport) => {
    setFormData({
      year: report.year,
      title: report.title,
      description: report.description,
      fileUrl: report.fileUrl || ''
    })
    setEditingId(report.id)
  }

  const handleDelete = (id: string) => {
    setReports((current) => (current || []).filter(report => report.id !== id))
    toast.success('Report deleted successfully')
  }

  const resetForm = () => {
    setFormData({
      year: '',
      title: '',
      description: '',
      fileUrl: ''
    })
    setEditingId(null)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingId ? 'Edit Report' : 'Add New Report'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year">Year *</Label>
                <Input
                  id="year"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  placeholder="2024-25"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Annual Report 2024-25"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief summary of the annual report..."
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <FileUpload
                value={formData.fileUrl}
                onChange={(url) => setFormData({ ...formData, fileUrl: url })}
                folder="reports"
                label="Report File (PDF)"
                accept=".pdf,application/pdf"
                maxSizeMB={20}
                fileTypeLabel="PDF"
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit">
                <Plus weight="bold" />
                {editingId ? 'Update Report' : 'Add Report'}
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
        <h3 className="text-lg font-semibold">Existing Reports ({reports?.length || 0})</h3>
        {reports && reports.length > 0 ? (
          <div className="grid gap-4">
            {reports.sort((a, b) => b.year.localeCompare(a.year)).map(report => (
              <Card key={report.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-primary">{report.year}</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="font-medium">{report.title}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{report.description}</p>
                      {report.fileUrl && (
                        <a
                          href={report.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline"
                        >
                          {report.fileUrl}
                        </a>
                      )}
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(report)}
                      >
                        <PencilSimple weight="bold" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(report.id)}
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
              No annual reports added yet
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
