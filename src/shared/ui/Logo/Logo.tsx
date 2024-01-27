import {FC, memo} from "react";
import {classNames} from '@/shared/lib/classNames/classNames'
import cls from "./Logo.module.scss";
import {FaB} from "react-icons/fa6";

interface LogoProps {
  className?: string;
}

const Logo: FC<LogoProps> = memo(({className}) => {
  return (
    <div className={classNames(cls.Logo, {}, [className])}>
      wh?
    </div>
  );
})

export default Logo;
