import {
	useGetProfile,
	useUpdateProfile,
} from '@/entities/Auth/model/auth.queries'
import { useAuth } from '@/features/auth'
import { useWindowSize } from '@/shared/lib/hooks/useWindowSize'
import Button from '@/shared/ui/Button/Button'
import Loader from '@/shared/ui/Loader/Loader'
import Text from '@/shared/ui/Text/Text'
import {
	Avatar,
	Input,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	Tooltip,
} from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import React, { useEffect, useMemo, useState } from 'react'
import { FaCheck } from 'react-icons/fa'
import { HiMail, HiPhone } from 'react-icons/hi'
import { IoClose } from 'react-icons/io5'
import { MdEdit } from 'react-icons/md'
import { TbReload } from 'react-icons/tb'
import * as z from 'zod' // Import zod for schema validation
import { settingsFormSchema } from '../../../model/sidebarListItem.contracts'
import cls from './UserTab.module.scss'

interface IUserField {
	key: string
	label: string
	icon?: JSX.Element
	isEditable: boolean
}

export function UserTab() {
	const { user, setAuthUser } = useAuth()
	const t = useTranslations('SidebarSetting')
	const tAuth = useTranslations('auth')
	const tAuthValidation = useTranslations('authValidation')
	const { width } = useWindowSize()
	const { userData, errorProfile } = useGetProfile()
	const { updateProfile, updateData, errorUpdate } = useUpdateProfile()

	const [editingField, setEditingField] = useState<string | null>(null)
	const [fieldValues, setFieldValues] = useState<{
		[key: string]: string | null
	}>({})
	const [initialFieldValues, setInitialFieldValues] = useState<{
		[key: string]: string | null
	}>({})
	const [formErrors, setFormErrors] = useState<{
		[key: string]: string
	}>({})

	useEffect(() => {
		setAuthUser(userData)
		const initialValues = {
			email: userData?.email || '',
			firstName: userData?.firstName || '',
			lastName: userData?.lastName || '',
			phoneNumber: userData?.phoneNumber || '',
		}
		setInitialFieldValues(initialValues)
		setFieldValues(initialValues)
	}, [setAuthUser, userData])

	useEffect(() => {
		if (updateData) {
			setAuthUser(updateData)
			const updatedFieldValues: { [key: string]: string | null } =
				Object.fromEntries(
					Object.entries(updateData).map(([key, value]) => [
						key,
						convertStringToNull(String(value)),
					]),
				)
			setFieldValues(updatedFieldValues)
			setInitialFieldValues(updatedFieldValues)
		}
	}, [setAuthUser, updateData])

	const convertStringToNull = (value: any) => {
		if (value === 'null') {
			return null
		}
		return value
	}

	const handleCancelClick = () => {
		setFieldValues(initialFieldValues)
		setEditingField(null)
		setFormErrors({})
	}

	const handleEditClick = (key: string) => {
		setEditingField(editingField === key ? null : key)
		setFormErrors({})
	}

	const handleReturnClick = (key: string) => {
		setFieldValues(prev => ({ ...prev, [key]: initialFieldValues[key] || '' }))
		setFormErrors({})
	}

	const handleClearClick = (key: string) => {
		setFieldValues(prev => ({ ...prev, [key]: '' }))
		setEditingField(key)
		setFormErrors({})
	}

	const renderTableCell = (field: string, value: string | undefined) => {
		const fieldConfig = userFields.find(f => f.key === field)
		if (!fieldConfig) return null

		return (
			<Input
				key={field}
				isRequired
				name={field}
				label={fieldConfig.label}
				defaultValue={value || ''}
				isClearable
				placeholder={fieldConfig.label}
				value={String(fieldValues[field])}
				onChange={e =>
					setFieldValues(prev => ({ ...prev, [field]: e.target.value }))
				}
				errorMessage={
					(formErrors[field] && tAuthValidation(formErrors[field])) || ''
				}
				startContent={fieldConfig.icon}
				isDisabled={editingField !== field}
				onClear={() => setFieldValues(prev => ({ ...prev, [field]: '' }))}
			/>
		)
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			const validationResult = settingsFormSchema.safeParse(fieldValues)

			console.log('validationResult', validationResult)
			if (validationResult.success) {
				const { __typename, avatarPath, ...fieldContent } = fieldValues
				updateProfile({
					variables: {
						input: { ...fieldContent },
						picture: avatarPath || null,
					},
				})
				setEditingField(null)
			} else {
				const fieldErrors: Record<string, string> = {}
				validationResult.error.errors.forEach(err => {
					const field = err.path[0]
					const message = err.message
					fieldErrors[field] = message
				})
				setFormErrors(fieldErrors)
			}
		} catch (error) {
			if (error instanceof z.ZodError) {
				const fieldErrors: Record<string, string> = {}
				error.errors.forEach(err => {
					const field = err.path[0]
					const message = err.message
					fieldErrors[field] = message
				})
				setFormErrors(fieldErrors)
			}
		}
	}

	const isFormChanged = useMemo(() => {
		return Object.keys(initialFieldValues).some(
			key => fieldValues[key] !== initialFieldValues[key],
		)
	}, [fieldValues, initialFieldValues])

	const userFields: IUserField[] = useMemo(
		() => [
			{
				key: 'email',
				label: tAuth('Email'),
				icon: <HiMail fontSize={18} />,
				isEditable: true,
			},
			{ key: 'firstName', label: tAuth('First Name'), isEditable: true },
			{ key: 'lastName', label: tAuth('Last Name'), isEditable: true },
			{
				key: 'phoneNumber',
				label: tAuth('Phone Number'),
				icon: <HiPhone fontSize={18} />,
				isEditable: true,
			},
		],
		[tAuth],
	)

	if (!user) {
		return (
			<div className={cls.UserTab}>
				<Loader />
			</div>
		)
	}

	return (
		<form className={cls.UserTab} onSubmit={handleSubmit}>
			<div className={cls.avatarBlock}>
				<header className={cls.header} />
				<div className={cls.underHeaderBlock}>
					<div className={cls.profileControl}>
						<Avatar
							className={cls.avatar}
							src={user?.avatarPath}
							classNames={{
								base: cls.avatar,
								icon: 'text-black/80',
							}}
						/>
						<Text
							className={cls.profileTitle}
							title={t('Profile')}
							text={t('Update your photo and personal details')}
						/>
					</div>
					<div className={cls.controlButton}>
						<Button
							onClick={handleCancelClick}
							type='button'
							color='clear'
							variant='bordered'
						>
							{t('Cancel')}
						</Button>
						<Button type='submit' isDisabled={!isFormChanged} color='default'>
							{t('Save')}
						</Button>
					</div>
				</div>
			</div>
			<div className={cls.userInfoBlock}>
				<Table className={cls.table} aria-label='User data table'>
					<TableHeader>
						<TableColumn className={cls.desktopVersion}>
							{t('User data')}
						</TableColumn>

						<TableColumn>{t('Field')}</TableColumn>
						<TableColumn>{t('Action')}</TableColumn>
					</TableHeader>
					<TableBody>
						{userFields.map(({ key, label }) => (
							<TableRow key={key}>
								<TableCell>{label}</TableCell>
								<TableCell>
									{renderTableCell(key, (user as any)[key])}
								</TableCell>
								<TableCell className={cls.actions}>
									<Tooltip
										color={editingField === key ? 'success' : undefined}
										content={t('Edit field')}
									>
										<span
											className={`text-lg text-${
												editingField === key ? 'success' : 'default-400'
											} text-cursor-pointer active:opacity-50`}
											onClick={() => handleEditClick(key)}
										>
											{editingField === key ? <FaCheck /> : <MdEdit />}
										</span>
									</Tooltip>
									<Tooltip color='danger' content={t('Clear the field')}>
										<span
											onClick={() => handleClearClick(key)}
											className='text-lg text-danger cursor-pointer active:opacity-50'
										>
											<IoClose />
										</span>
									</Tooltip>
									<Tooltip
										color='warning'
										className={'text-white'}
										content={t('Return')}
									>
										<span
											onClick={() => handleReturnClick(key)}
											className='text-lg text-warning cursor-pointer active:opacity-50'
										>
											<TbReload />
										</span>
									</Tooltip>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</form>
	)
}
