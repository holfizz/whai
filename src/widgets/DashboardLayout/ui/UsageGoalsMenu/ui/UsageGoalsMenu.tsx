import { FC } from 'react'
import cls from './UsageGoalsMenu.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { DropdownItem, DropdownMenu } from '@/shared/ui/Dropdown/Dropdown'
import { DropdownTitle } from './DropDownTitle'
import { Link } from '@/navigation'
import { getCreatePageRoute } from '@/shared/const/router'
import { useTranslations } from 'next-intl'

interface UsageGoalsMenuProps {
	// TODO: поменять названия, когда будут придуманы
	isFirstCourseCreated: boolean
	isFirstLessonFinished: boolean
	isSmthElseCompleted1: boolean
	isSmthElseCompleted2: boolean
}

const UserGoalsOptions: string[] = [
	'Finish your first lesson',
	'Complete your first homework assignment',
	'Complete your first test'
]

const getBgColor = (isCompleted: boolean): string => {
	return isCompleted ? 'bg-[var(--color-decor-5)]' : 'bg-[var(--color-decor-6)]'
}

export const UsageGoalsMenu: FC<UsageGoalsMenuProps> = ({
	isFirstCourseCreated,
	isFirstLessonFinished,
	isSmthElseCompleted1,
	isSmthElseCompleted2
}) => {
	const t = useTranslations('Dashboard')
	return (
		<DropdownMenu className={cls.dropdownMenu}>
			<DropdownItem color='white' as={Link} href={getCreatePageRoute()}>
				<DropdownTitle
					completed={
						Number(isFirstCourseCreated) +
						Number(isFirstLessonFinished) +
						Number(isSmthElseCompleted1) +
						Number(isSmthElseCompleted2)
					}
				/>
			</DropdownItem>
			<DropdownItem
				className={classNames(cls.dropdownItem, {}, [
					getBgColor(isFirstCourseCreated)
				])}
			>
				{t('Start your first course')}
			</DropdownItem>
			<DropdownItem
				className={classNames(cls.dropdownItem, {}, [
					getBgColor(isFirstLessonFinished)
				])}
			>
				{t('Finish your first lesson')}
			</DropdownItem>
			<DropdownItem
				className={classNames(cls.dropdownItem, {}, [
					getBgColor(isSmthElseCompleted1)
				])}
			>
				{t('Complete your first homework assignment')}
			</DropdownItem>
			<DropdownItem
				className={classNames(cls.dropdownItem, {}, [
					getBgColor(isSmthElseCompleted2)
				])}
			>
				{t('Complete your first test')}
			</DropdownItem>
		</DropdownMenu>
	)
}
