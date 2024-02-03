import { Dispatch, FC, PropsWithChildren, SetStateAction, useEffect } from 'react'
import { classNames, Mods } from '@/shared/lib/classNames/classNames'
import cls from './Modal.module.scss'
import dynamic from 'next/dynamic'
import { IoClose } from 'react-icons/io5'

interface ModalProps {
  className?: string;
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
	isSuccess?:boolean;
	isError?:boolean;
	setIsSuccess?:Dispatch<SetStateAction<boolean>>
	setIsError?:Dispatch<SetStateAction<boolean>>
}

const DynamicComponentWithNoSSR = dynamic(() => import('@/shared/ui/Portal/Portal'), {
  ssr: false
})



const Modal: FC<PropsWithChildren<ModalProps>> = (props) => {
  const { className, children, isOpen, onClose, setIsSuccess, isSuccess, setIsError, isError } = props
  const mods: Mods = {
    [cls.opened]: isOpen,
	  [cls.success]:isSuccess,
	  [cls.error]:isError,

  }
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose(false)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])
  return (
    <DynamicComponentWithNoSSR>
      { isOpen && <>
        <div onClick={() => {
				  onClose(false)
	        setIsSuccess?.(false)
	        setIsError?.(false)
			  }} className={classNames(cls.Modal, mods, [className])}>
          <div onClick={(e) => e.stopPropagation()} className={classNames(cls.content, mods, [])}>
            <IoClose onClick={()=>onClose(false)} className={classNames(cls.closeModal, {[cls.successElement]:isSuccess,
	            [cls.errorElement]:isError,}, [])} />
            {children}
          </div>
        </div>
      </>
		  }</DynamicComponentWithNoSSR>
  )
}

export default Modal
