import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { uploadImage } from '@/lib/image-upload'
import { toast } from 'sonner'
import { File, Trash, Upload } from '@phosphor-icons/react'

interface FileUploadProps {
  value: string
  onChange: (url: string) => void
  folder?: string
  label?: string
  placeholder?: string
  accept?: string
  maxSizeMB?: number
  fileTypeLabel?: string
}

export default function FileUpload({ 
  value, 
  onChange, 
  folder,
  label = 'File',
  placeholder = 'https://... (file URL)',
  accept = '.pdf,application/pdf',
  maxSizeMB = 25,
  fileTypeLabel = 'PDF'
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      toast.error(`File must be less than ${maxSizeMB}MB`)
      return
    }

    setIsUploading(true)
    try {
      const url = await uploadImage(file, folder)
      onChange(url)
      toast.success('File uploaded successfully!')
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Failed to upload file. You can still use a URL.')
    } finally {
      setIsUploading(false)
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const getFileName = (url: string) => {
    if (!url) return ''
    try {
      const parts = url.split('/')
      const filename = parts[parts.length - 1]
      // Remove timestamp prefix if present
      return filename.replace(/^\d+-/, '').substring(0, 30) + (filename.length > 30 ? '...' : '')
    } catch {
      return url.substring(0, 30) + '...'
    }
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1"
        />
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
          id={`file-upload-${folder || 'default'}`}
          aria-label={`Upload ${fileTypeLabel} file`}
        />
        <Button
          type="button"
          variant="outline"
          disabled={isUploading}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="mr-1" weight="bold" />
          {isUploading ? 'Uploading...' : 'Upload'}
        </Button>
      </div>
      {value && (
        <div className="mt-2 flex items-center gap-2 p-2 bg-muted rounded-md">
          <File size={20} weight="duotone" className="text-primary flex-shrink-0" />
          <a 
            href={value} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline flex-1 truncate"
          >
            {getFileName(value)}
          </a>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onChange('')}
            className="h-6 w-6 p-0"
          >
            <Trash size={14} />
          </Button>
        </div>
      )}
      <p className="text-xs text-muted-foreground">
        Upload a {fileTypeLabel} file (max {maxSizeMB}MB) or paste a URL
      </p>
    </div>
  )
}
