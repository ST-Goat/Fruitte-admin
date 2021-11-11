import cn from 'classnames'
import React, { forwardRef, HTMLAttributes, LegacyRef } from 'react'

type SidebarMenuProps = {
  className?: string
  children?: React.ReactNode
  popperArrow?: boolean
} & HTMLAttributes<HTMLElement>

const SidebarMenu: React.FC<SidebarMenuProps> = forwardRef<unknown, SidebarMenuProps>(
  ({ children, className, popperArrow, ...props }, ref) => {
    const sidebarMenuRef: LegacyRef<HTMLElement> = (ref as any) || React.createRef<HTMLElement>()

    return (
      <nav ref={sidebarMenuRef} className={cn('', className)} {...props}>
        <ul>
          {React.Children.toArray(children)
            .filter(Boolean)
            .map((child, index) => {
              return React.cloneElement(child as React.ReactElement, {
                key: index,
                firstChild: 1,
                popperArrow: popperArrow === true ? 1 : 0,
              })
            })}
        </ul>
      </nav>
    )
  },
)

export default SidebarMenu;
