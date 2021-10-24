import cn from 'classnames';
import AppLogo from '../../common/AppLogo';
import Icon from '../../common/components/Icon';
import Text from '../../common/components/Text';
type HeaderType = React.ComponentProps<'div'>;

const Header: React.FC<HeaderType> = ({className, ...props}) =>{
  return (
    <>
      <div
        className={cn('flex flex-row items-center justify-between shadow-dash-header h-20 px-10', className)}
        {...props}
      >
        <AppLogo logoClassName="h-8" />
        <div className="flex flex-row items-center">
          <Text className="text-base font-bold ml-4" color="grey">
            Tone
          </Text>
          <div className="w-10 h-10 border rounded-full ml-4"></div>
        </div>
      </div>
    </>
  )
}
export default Header;