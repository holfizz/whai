import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'
const MAX_FILE_SIZE_MB = 100
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024
export const useFileUpload = (
	onDropCallback: (acceptedFiles: File[]) => void
) => {
	const t = useTranslations('LessonTask')
	const [selectedFiles, setSelectedFiles] = useState<File | null>(null)
	const [imagePreview, setImagePreview] = useState<string | null>(null)

	const handleDrop = (acceptedFiles: File[], rejectedFiles: File[]) => {
		if (rejectedFiles.length > 0) {
			rejectedFiles.forEach(file => {
				//@ts-ignore
				if (file.file.size > MAX_FILE_SIZE_BYTES) {
					toast.error(t('File is too large Maximum size is 100 MB'))
				} else {
					toast.error(t('Only one file can be uploaded at a time'))
				}
			})
			return
		}
		if (acceptedFiles.length > 0) {
			const file = acceptedFiles[0]
			setSelectedFiles(file)
			onDropCallback([file])

			const fileType = file.type.split('/')[0]
			if (fileType === 'image') {
				const reader = new FileReader()
				reader.onloadend = () => {
					setImagePreview(reader.result as string)
				}
				reader.readAsDataURL(file)
			} else {
				setImagePreview(null)
			}
		}
	}

	const { getRootProps, getInputProps } = useDropzone({
		//@ts-ignore
		onDrop: handleDrop,
		accept: {
			'application/msword': ['.doc', '.docx'],
			'application/vnd.ms-excel': ['.xls', '.xlsx'],
			'application/vnd.ms-powerpoint': ['.ppt', '.pptx'],
			'application/pdf': ['.pdf'],
			'application/vnd.apple.numbers': ['.numbers'],
			'text/csv': ['.csv'],
			'image/jpeg': ['.jpg', '.jpeg'],
			'image/jp2': ['.jp2'],
			'image/png': ['.png'],
			'image/gif': ['.gif'],
			'image/webp': ['.webp'],
			'image/heic': ['.heic'],
			'image/heif': ['.heif'],
			'image/bmp': ['.bmp'],
			'image/x-photo-cd': ['.pcd'],
			'image/tiff': ['.tiff', '.tif']
		},
		multiple: false
	})

	return {
		selectedFiles,
		imagePreview,
		getRootProps,
		getInputProps
	}
}
