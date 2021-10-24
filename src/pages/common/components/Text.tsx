import cn from 'classnames';
import * as React from 'react';

type TextRenderProps = {
  className: string
}

export type TextProps = {
  color?: 'primary' | 'black' | 'grey' | 'darkgrey' | 'mediumgrey' | 'lightgrey' | 'lightergrey' | 'offwhite' | 'white'
  render?: (props: TextRenderProps) => React.ReactElement<any, any> | null
} & React.ComponentPropsWithoutRef<'p'>

const colorClasses: Record<NonNullable<TextProps['color']>, string> = {
  primary: 'text-primary-500',
  black: 'text-black-500',
  grey: 'text-grey-500',
  darkgrey: 'text-darkgrey',
  mediumgrey: 'text-mediumgrey',
  lightgrey: 'text-lightgrey',
  lightergrey: 'text-lightergrey',
  offwhite: 'text-offwhite',
  white: 'text-white',
}

const Text = ({ color = 'darkgrey', render, ...props }: TextProps) => {
  if (render) {
    return render({
      className: colorClasses[color],
    })
  }

  return <p {...props} className={cn(colorClasses[color], props.className)} />
}

export default Text;

