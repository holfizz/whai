import { FC } from 'react'
import cls from './UsageGoalsMenu.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { DropdownItem, DropdownMenu } from '@/shared/ui/Dropdown/Dropdown'
import { DropdownTitle } from './DropDownTitle'
import { Link } from '@/navigation'
import { getCreatePageRoute } from '@/shared/const/router'

interface UsageGoalsMenuProps {
	// TODO: поменять названия, когда будут придуманы
	isFirstCourseCreated: boolean
	isFirstLessonFinished: boolean
	isSmthElseCompleted1: boolean
	isSmthElseCompleted2: boolean
}

const UserGoalsOptions: string[] = [
	// TODO: поменять названия, когда будут + сделать переводы
	'Start your first course',
	'Finish your first lesson',
	'Something else',
	'Something else else'
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
				{UserGoalsOptions[0]}
			</DropdownItem>
			<DropdownItem
				className={classNames(cls.dropdownItem, {}, [
					getBgColor(isFirstLessonFinished)
				])}
			>
				{UserGoalsOptions[1]}
			</DropdownItem>
			<DropdownItem
				className={classNames(cls.dropdownItem, {}, [
					getBgColor(isSmthElseCompleted1)
				])}
			>
				{UserGoalsOptions[2]}
			</DropdownItem>
			<DropdownItem
				className={classNames(cls.dropdownItem, {}, [
					getBgColor(isSmthElseCompleted2)
				])}
			>
				{UserGoalsOptions[3]}
			</DropdownItem>
		</DropdownMenu>
	)
}
