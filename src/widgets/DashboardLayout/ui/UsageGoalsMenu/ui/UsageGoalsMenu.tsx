import { Link } from '@/navigation'
import { getCreatePageRoute, getLibraryRoute } from '@/shared/const/router'
import { classNames } from '@/shared/lib/classNames/classNames'
import { DropdownItem, DropdownMenu } from '@/shared/ui/Dropdown/Dropdown'
import { useTranslations } from 'next-intl'
import { FC } from 'react'
import { DropdownTitle } from './DropDownTitle'
import cls from './UsageGoalsMenu.module.scss'

interface UsageGoalsMenuProps {
	// TODO: поменять названия, когда будут придуманы
	isFirstCourseCreated: boolean
	isFirstLessonFinished: boolean
	isQuizCompleted: boolean
	isHomeworkCompleted: boolean
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
	isQuizCompleted,
	isHomeworkCompleted
}) => {
	const t = useTranslations('Dashboard')
	return (
		<DropdownMenu className={cls.dropdownMenu}>
			<DropdownItem color='white' as={Link} href={getCreatePageRoute()}>
				<DropdownTitle
					completed={
						Number(isFirstCourseCreated) +
						Number(isFirstLessonFinished) +
						Number(isQuizCompleted) +
						Number(isHomeworkCompleted)
					}
				/>
			</DropdownItem>
			<DropdownItem
				as={Link}
				href={getCreatePageRoute()}
				className={classNames(cls.dropdownItem, {}, [
					getBgColor(isFirstCourseCreated)
				])}
			>
				{t('Start your first course')}
			</DropdownItem>
			<DropdownItem
				as={Link}
				href={getLibraryRoute('lessons')}
				className={classNames(cls.dropdownItem, {}, [
					getBgColor(isFirstLessonFinished)
				])}
			>
				{t('Finish your first lesson')}
			</DropdownItem>
			<DropdownItem
				as={Link}
				href={getLibraryRoute('tests')}
				className={classNames(cls.dropdownItem, {}, [
					getBgColor(isQuizCompleted)
				])}
			>
				{t('Complete your first test')}
			</DropdownItem>
			<DropdownItem
				as={Link}
				href={getLibraryRoute('homework')}
				className={classNames(cls.dropdownItem, {}, [
					getBgColor(isHomeworkCompleted)
				])}
			>
				{t('Complete your first homework assignment')}
			</DropdownItem>
		</DropdownMenu>
	)
}
