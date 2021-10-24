import * as React from 'react'
import { Link as ReactRouterLink, LinkProps as OriProps } from 'react-router-dom'

export type LinkProps = OriProps

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function LinkImpl(props, ref) {
  return <ReactRouterLink {...props} ref={ref} />
})
