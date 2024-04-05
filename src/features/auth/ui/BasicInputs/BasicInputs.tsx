import { Input } from '@nextui-org/react'
import { FC, useState } from 'react'

import cls from '../AuthForm/AuthForm.module.scss'
import InputField from '../InputLabel/InputField'
import { useTranslations } from 'next-intl'
import { z } from 'zod'

import { HiOutlineEye } from 'react-icons/hi'
import { PiEyeClosedBold } from 'react-icons/pi'

interface BasicInputsProps {
    formErrors: z.ZodFormattedError<{
        email: string;
        password: string;
        phoneNumber?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, string>
}


const BasicInputs: FC<BasicInputsProps> = ({
    formErrors
}) => {

    const t = useTranslations('auth')
    const tAuthValidation = useTranslations('authValidation')

    const [isVisible, setIsVisible] = useState(false)

    const toggleVisibility = () => setIsVisible(!isVisible)

    return (
        <>
            <InputField
                className={cls.label}
                name={'email'}
                type='email'
                label={t('Email')}
                color={formErrors.email?._errors.length ? 'danger' : 'default'}
                errorMessage={formErrors.email?._errors
                    ?.map((error: string) => tAuthValidation(error))
                    .join(', ')}
                placeholder={t('Enter your email')}
            />

            <label className={cls.label}>
                <div className={cls.passwordInput}>
                    <Input
                        label={t('Password')}
                        variant='bordered'
                        placeholder={t('Enter your password')}
                        isRequired
                        endContent={
                            <button
                                className='focus:outline-none'
                                type='button'
                                onClick={toggleVisibility}
                            >
                                {isVisible ? (
                                    <HiOutlineEye className='text-2xl text-default-400 pointer-events-none' />
                                ) : (
                                    <PiEyeClosedBold className='text-2xl text-default-400 pointer-events-none' />
                                )}
                            </button>
                        }
                        color={formErrors.password?._errors.length ? 'danger' : 'default'}
                        errorMessage={formErrors.password?._errors
                            ?.map((error: string) => tAuthValidation(error))
                            .join(', ')}
                        type={isVisible ? 'text' : 'password'}
                        name='password'
                    />
                </div>
            </label>
        </>
    )
}

export default BasicInputs
