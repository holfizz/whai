'use client'

import {DashboardLayout} from '@/widgets/DashboardLayout'
import Text, {TextSize} from "@/shared/ui/Text/Text"
import {useTranslations} from "next-intl"
import {useGetProfile} from "@/entities/Auth/model/auth.queries"
import cls from './Dmain.module.scss'
import {Avatar, Skeleton} from "@nextui-org/react"
import {useGetLastCourse} from "@/entities/course/model/course.queries";
import {Progress} from "@/shared/ui/Progress/Progress";
import Icon from "@/shared/ui/Icon/Icon";
import {BsPerson} from "react-icons/bs";
import {ArrowUpRight, Clock4} from "lucide-react";
import Button from "@/shared/ui/Button/Button";
import {TbBrain} from "react-icons/tb";
import {Link} from "@/navigation";
import {getCourseByIdRoute} from "@/shared/const/router";

export default function DMain() {
  const t = useTranslations('Dashboard')
  const {userData} = useGetProfile()
  const {lastCourseData, loadingLastCourse} = useGetLastCourse()
  return (
    <DashboardLayout>
      <Text title={t("Continue education")}/>

      <div className={'flex justify-between'}>

        <div className={'flex w-full justify-between'}>

          <div>

            <div
              className={'w-[800px] flex justify-between items-center border-solid border-2 border-opacity-50 border-secondary rounded-2xl p-2'}>
              <div className={'flex'}>
                <div className={'w-[70px] h-[70px]  rounded-full bg-decor-8 mr-4 flex justify-center items-center'}>
                  <Icon className={"stroke-[var(--color-white)]  text-3xl"} SVG={TbBrain}/>
                </div>
                <div>
                  <div>
                    {loadingLastCourse ? <Skeleton className="h-3 w-3/5 rounded-lg"/> :
                      <Text size={TextSize.S} title={lastCourseData?.name}/>}
                    <Progress className={'w-[390px] mt-4 rounded-xl'} color="peach"
                              value={lastCourseData?.progressPercents}
                              size={'sm'}/>
                  </div>
                  <div className={'flex w-[300px] justify-between mt-4'}>
                    <div className={'flex text-2xl'}><Icon color={"var(--color-accent)"} SVG={BsPerson}/><Text
                      size={TextSize.L}
                      text={'2/5 тем пройдено'}/></div>
                    <div className={'flex'}><Icon className={'stroke-[var(--color-accent)]'} SVG={Clock4}/><Text
                      text={'4 часа'}/></div>
                  </div>
                </div>
              </div>
              <Button size={'mRound'} href={getCourseByIdRoute(lastCourseData?.id)} isIconOnly
                      startContent={<ArrowUpRight color={'#fff'}/>}
                      variant={'round'} as={Link}>
              </Button>
            </div>

          </div>
        <div className={cls.welcomeBlocks}>
          <div className={cls.personWelcomeBlock}>
            <Avatar className={cls.avatar} src={userData?.avatarPath} alt="Avatar"/>
            <div className={cls.welcomeBlcTitle}>
              <Text title={`${t("Welcome back")},`}/>
              <Text title={`${userData?.firstName}!`}/>
              <Text text={`Давайте продолжим изучать работу с Whai`}/>
              <Text classNameTitle={'text-color-decor-8'} title={`Начнем! (1/4)`}/>
            </div>

          </div>
        </div>

        </div>
      </div>
    </DashboardLayout>
  )
}
