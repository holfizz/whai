import { Avatar, DropdownTrigger } from '@nextui-org/react'
import Text, { TextAlign, TextSize } from '@/shared/ui/Text/Text'
import { FC } from 'react'
import cls from './WelcomeBack.module.scss'
import { useTranslations } from 'next-intl'
import { IUser } from '@/entities/Auth'
import Button from '@/shared/ui/Button/Button'
import { UsageGoalsMenu } from '@/features/DashBoard/UsageGoalsMenu'
import { Dropdown } from '@/shared/ui/Dropdown/Dropdown'
import { Link } from '@/navigation'
import { getCreatePageRoute } from '@/shared/const/router'

export const WelcomeBack: FC<{ userData: IUser }> = ({ userData }) => {
	const t = useTranslations('Dashboard')
	const t2 = useTranslations()

	return (
		<div className={cls.welcomeBlocks}>
			<div className={cls.personWelcomeBlock}>
				<Avatar
					className={cls.avatar}
					src={userData?.avatarPath}
					alt='Avatar'
				/>
				<div className={cls.welcomeBackTitle}>
					<Text title={`${t('Welcome back')},`} />
					<Text title={`${userData?.firstName}!`} />
					<Text
						className={cls.keepWorkingMessage}
						align={TextAlign.CENTER}
						size={TextSize.M}
						text={`${t("Let's continue to explore working with Whai")}`}
					/>
					<Dropdown className={cls.dropdown}>
						<DropdownTrigger>
							<h1 className='text-[var(--color-decor-2)] font-semibold text-2xl mt-[15px] cursor-pointer'>
								{t("Let's begin! (1/4)")}
							</h1>
						</DropdownTrigger>
						<UsageGoalsMenu
							isFirstCourseCreated={false}
							isFirstLessonFinished={true}
							isSmthElseCompleted1={false}
							isSmthElseCompleted2={false}
						/>
					</Dropdown>
				</div>

				<Button
					color='accent'
					size='xl'
					className='mt-[40px] z-0'
					as={Link}
					href={getCreatePageRoute()}
				>
					{`${t('Create')}`}
				</Button>
			</div>
		</div>
	)
}
