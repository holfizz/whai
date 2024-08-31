import { IUser } from '@/entities/Auth'
import { useGetStatProfile } from '@/entities/Auth/model/auth.queries'
import { Link } from '@/navigation'
import BaseAvatar from '@/shared/assets/image/BaseAvatar.png'
import { getCreatePageRoute } from '@/shared/const/router'
import Button from '@/shared/ui/Button/Button'
import { Dropdown } from '@/shared/ui/Dropdown/Dropdown'
import { Avatar, DropdownTrigger } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { FC } from 'react'
import { UsageGoalsMenu } from '../../DashboardLayout/ui/UsageGoalsMenu'
import cls from './WelcomeBack.module.scss'

export const WelcomeBack: FC<{ userData: IUser }> = ({ userData }) => {
	const t = useTranslations('Dashboard')
	const { userStat } = useGetStatProfile()
	return (
		<div className={cls.welcomeBlocks}>
			<div className={cls.personWelcomeBlock}>
				<Avatar
					classNames={{ base: 'bg-white' }}
					className={cls.avatar}
					src={userData?.avatarPath || BaseAvatar.src}
					alt='Avatar'
				/>
				<div className={cls.welcomeBackTitle}>
					<h1 className='text-2xl font-semibold max-640:text-4xl'>{`${t(
						'Welcome back'
					)},`}</h1>
					<h1 className='text-2xl font-semibold max-640:text-4xl'>{`${userData?.firstName}!`}</h1>
					<h1 className='text-lg max-640:text-2xl w-[85%] text-center'>
						{t("Let's continue to explore working with Whai")}
					</h1>
					<Dropdown className={cls.dropdown}>
						<DropdownTrigger>
							<h1 className='text-[var(--color-decor-2)] font-semibold text-2xl mt-[15px] cursor-pointer max-640:text-4xl'>
								{t("Let's begin!")}{' '}
								{Number(userStat?.isFirstCourseCompleted) +
									Number(userStat?.isFirstLessonCompleted) +
									Number(userStat?.isQuizCompleted) +
									Number(userStat?.isHomeworkCompleted)}
								/4
							</h1>
						</DropdownTrigger>
						<UsageGoalsMenu
							isFirstCourseCreated={userStat?.isFirstCourseCompleted}
							isFirstLessonFinished={userStat?.isFirstLessonCompleted}
							isQuizCompleted={userStat?.isQuizCompleted}
							isHomeworkCompleted={userStat?.isHomeworkCompleted}
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
