import { type NavItemProps } from '@/components/nav/types'

const navItemsList: NavItemProps[] = [
  {
    href: '/',
    title: 'Home',
    hideNavigation: true
  },
  {
    href: '/posts',
    title: 'Posts'
  },

  {
    href: '/about',
    title: 'About'
  }
]

export { navItemsList }
