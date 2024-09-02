import FileIcon from '@/shared/assets/icons/File'
import UploadIcon from '@/shared/assets/icons/Upload'
import React from 'react'
import { useFileUpload } from './useFileUpload'

interface FileUploadProps {
	taskIndex: number
	onDropCallback: (acceptedFiles: File[]) => void
	file: File | null
}

const FileUpload: React.FC<FileUploadProps> = ({
	taskIndex,
	onDropCallback,
	file
}) => {
	const { selectedFiles, imagePreview, getRootProps, getInputProps } =
		useFileUpload(onDropCallback)

	return (
		<div
			{...getRootProps({
				className:
					'dropzone p-6 w-full rounded-lg flex flex-col items-center justify-center cursor-pointer bg-decor-4'
			})}
		>
			<input {...getInputProps()} />
			{file ? (
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
				<div className='text-center flex flex-col items-center gap-5'>
					<div className='bg-decor-4'>
						<UploadIcon />
					</div>
					<h1 className='text-sm font-medium mt-4'>
						Supported file formats for upload
					</h1>
					<p className='text-gray-600 text-sm'>
						Documents DOC DOCX XLS XLSX PPT PPTX PDF Numbers CSV
						<br />
						Images JPG JPG2 PNG GIF WEB HEIC HEIF BMP PCD TIFF
						<br />
						The size of all uploaded files is no more than 100 MB
					</p>
				</div>
			)}
		</div>
	)
}

export default FileUpload
