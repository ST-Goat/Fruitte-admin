
import cn from 'classnames';
type SidebarContentType = React.ComponentProps<"div">

const SidebarContent: React.FC<SidebarContentType> = ({children, className}) =>{
  return (
      <div className={cn('flex flex-col flex-1', className)}>
        {children}
      </div>
  )
}

export default SidebarContent;