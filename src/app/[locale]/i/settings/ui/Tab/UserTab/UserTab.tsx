import { useAuth } from '@/features/auth'
import Button from '@/shared/ui/Button/Button'
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
import { useMemo } from 'react'
import { HiMail, HiPhone } from 'react-icons/hi' // Make sure you're using HiPhone for the phone icon
import { IoClose } from 'react-icons/io5'
import { MdEdit } from 'react-icons/md'
import cls from './UserTab.module.scss'

interface IUserField {
	key: string
	label: string
	icon?: JSX.Element
	isEditable: boolean
}

export function UserTab() {
	const { user } = useAuth()
	const t = useTranslations('SidebarSetting')
	const tAuth = useTranslations('auth')

	// Define user fields with useMemo to avoid recalculating on each render
	const userFields: IUserField[] = useMemo(
		() => [
			{
				key: 'email',
				label: tAuth('Email'),
				icon: <HiMail fontSize={18} />,
				isEditable: true, // Assuming you might want this to be true if editing is allowed
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

	const renderTableCell = (field, value) => {
		const fieldConfig = userFields.find(f => f.key === field)
		if (!fieldConfig) return null // Guard clause in case of undefined fieldConfig

		switch (field) {
			case 'email':
			case 'phoneNumber':
			case 'firstName':
			case 'lastName':
				return (
					<Input
						isRequired
						label={fieldConfig.label}
						defaultValue={value || ''}
						startContent={fieldConfig.icon}
						isClearable
						placeholder={fieldConfig.label}
						isDisabled={fieldConfig.isEditable}
					/>
				)

			default:
				return <Text>{value}</Text>
		}
	}

	if (!user) {
		return <div>Loading...</div> // Or any other placeholder you prefer
	}

	return (
		<div className={cls.UserTab}>
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
						<Button color='clear' variant='bordered'>
							{t('Cancel')}
						</Button>
						<Button isDisabled color='default'>
							{t('Save')}
						</Button>
					</div>
				</div>
			</div>
			<div className={cls.userInfoBlock}>
				<Table aria-label='User data table'>
					<TableHeader>
						<TableColumn>{t('User data')}</TableColumn>
						<TableColumn>{t('Field')}</TableColumn>
						<TableColumn>{t('Action')}</TableColumn>
					</TableHeader>
					<TableBody>
						{userFields.map(({ key, label }, index) => (
							<TableRow key={index}>
								<TableCell>{label}</TableCell>
								<TableCell>{renderTableCell(key, user[key])}</TableCell>
								<TableCell className={'flex'}>
									<Tooltip content='Edit user'>
										<span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
											<MdEdit />
										</span>
									</Tooltip>
									<Tooltip color='danger' content='Delete user'>
										<span className='text-lg text-danger cursor-pointer active:opacity-50'>
											<IoClose />
										</span>
									</Tooltip>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}
