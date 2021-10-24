import cn from 'classnames';
import AppLogo from "../../common/AppLogo";
import Text from '../../common/components/Text';

type FooterType = React.ComponentProps<"div">;

const Footer: React.FC<FooterType> = ({className, ...props}) =>{
  return (
    <>
      <div className={cn('flex flex-row justify-center border-t border-grey-100 py-4', className)} {...props}>
        <AppLogo className="mr-2" logoClassName="h-4" />
        <Text className="text-xs text-grey-500">© 2021 Fruittee All rights reserved.</Text>
      </div>
    </>
  )
}

export default Footer;