'use client'

import {DashboardLayout} from '@/widgets/DashboardLayout'
import Text from "@/shared/ui/Text/Text"
import {useTranslations} from "next-intl"
import {useGetProfile} from "@/entities/Auth/model/auth.queries"
import cls from './Dmain.module.scss'
import {Avatar} from "@nextui-org/react"

export default function DMain() {
  const t = useTranslations('Dashboard')
  const {userData} = useGetProfile()
  return (
    <DashboardLayout>
      <div>
        <Text title={t("Continue education")}/>
        <div className={cls.welcomeBlocks}>
          <div className={cls.personWelcomeBlock}>
            <Avatar className={cls.avatar} src={userData?.avatarPath} alt="Avatar"/>
            <div className={cls.welcomeBlcTitle}>
              <Text title={`${t("Welcome back")},`}/>
              <Text title={`${userData?.firstName}!`}/>
              <Text text={`Давайте продолжим изучать работу с Whai`}/>
            </div>

          </div>
          <div></div>
        </div>
      </div>
    </DashboardLayout>
  )
}
