import { Dispatch, FC, SetStateAction, Suspense, useState } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './AuthModal.module.scss'
import Modal from '@/shared/ui/Modal/Modal'
import Loader from '@/shared/ui/Loader/Loader'
import AuthFormAsync from '@/features/auth/ui/AuthForm/AuthForm.async'
import { authConstants } from '@/shared/const/auth'

interface LoginModalProps {
  className?: string;
  isOpen: boolean;
  onClose:Dispatch<SetStateAction<boolean>>;
	type:authConstants.LOGIN | authConstants.REGISTER,

}

export const AuthModal: FC<LoginModalProps> = ({
  className,
  onClose,
	                                               type,
  isOpen,
}) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={classNames(cls.LoginModal, {},[])}
      setIsSuccess={setIsSuccess} setIsError={setIsError} isSuccess={isSuccess}isError={isError}
    >
      <div className={classNames(cls.wrapper, {}, [])}>
        <Suspense fallback={<Loader />}>
          <AuthFormAsync setIsError={setIsError} setIsSuccess={setIsSuccess} type={type}/>
        </Suspense>
      </div>
    </Modal>
  )
}
