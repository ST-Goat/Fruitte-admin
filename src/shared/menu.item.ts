export type MenuItemProps = {
  key: string
  label: string
  to: string
  icon?: string
  items?: MenuItemProps[]
}

export const menuItems: MenuItemProps[] = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    to: '/',
  },
]
