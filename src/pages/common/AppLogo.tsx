import cn from 'classnames'

import logo from '../../assets/icons/logo.svg'
import logoWhite from '../../assets/icons/logo-white.svg'

interface AppLogoProps {
  white?: boolean;
  logoClassName?: string;
}
type AppLogoType = AppLogoProps & React.ComponentProps<"img">;

const AppLogo: React.FC<AppLogoType> = ({className, logoClassName, white}) => {
  return (
    <a href="/" className={cn('flex items-center justify-center', className)}>
    <img className={logoClassName} src={white ? "" : ""} alt="Fruittee Logo" />
  </a>
  )
}
export default AppLogo;