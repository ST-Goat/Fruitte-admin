import React from "react";
import cn from 'classnames';

type SidebarHeaderType = React.ComponentProps<"div">

const SideBarHeader: React.FC<SidebarHeaderType> = ({children, className}) => {
  return (
    <div className={cn('flex flex-row items-center justify-center', className)}>
        {children}
    </div>
  )
}
export default SideBarHeader;