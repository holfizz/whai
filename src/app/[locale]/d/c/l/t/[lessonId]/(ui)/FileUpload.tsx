import FileIcon from '@/shared/assets/icons/File'
import UploadIcon from '@/shared/assets/icons/Upload'
import { useTranslations } from 'next-intl'
import React from 'react'
import { useFileUpload } from './useFileUpload'

interface FileUploadProps {
	taskIndex: number
	onDropCallback: (acceptedFiles: File[]) => void
	file: File | null
	fileNames?: string[]
}

const FileUpload: React.FC<FileUploadProps> = ({
	onDropCallback,
	file,
	fileNames
}) => {
	const t = useTranslations('LessonTask')
	const { selectedFiles, imagePreview, getRootProps, getInputProps } =
		useFileUpload(onDropCallback)

	const rootProps = getRootProps({
		className: `${
			!fileNames.length && 'dropzone'
		} p-6 w-full rounded-lg flex flex-col items-center justify-center cursor-pointer bg-decor-4`,
		// Disable dropzone if fileName is provided
		...(fileNames.length && { style: { pointerEvents: 'none', opacity: 0.6 } })
	})

	return (
		<div {...rootProps}>
			{!fileNames.length && <input {...getInputProps()} />}
			{fileNames.length ? (
				<div className='flex flex-col gap-5'>
					{fileNames.map((fileName, index) => {
						return (
							<div key={index} className='flex items-center gap-5'>
								<FileIcon />
								<p className='text-center text-sm'>{fileName}</p>
							</div>
						)
					})}
				</div>
			) : file ? (
				imagePreview ? (
					<img
						src={imagePreview}
						alt='Preview'
						className='w-full h-full object-cover rounded-lg'
					/>
				) : (
					<div className='flex items-center gap-5'>
						<FileIcon />
						<p className='text-center text-sm'>{file.name}</p>
					</div>
				)
			) : (
				// Если файл не загружен, отображаем инструкции и иконку загрузки
				<div className='text-center flex flex-col items-center gap-5'>
					<div className='bg-decor-4'>
						<UploadIcon />
					</div>
					<h1 className='text-sm font-medium mt-4'>
						{t('Supported file formats for upload')}
					</h1>
					<p className='text-gray-600 text-sm'>
						{t('Documents DOC DOCX XLS XLSX PPT PPTX PDF Numbers CSV')}
						<br />
						{t('Images JPG JPG2 PNG GIF WEB HEIC HEIF BMP PCD TIFF')}
						<br />
						{t('The size of all uploaded files is no more than 100 MB')}
					</p>
				</div>
			)}
		</div>
	)
}

export default FileUpload
