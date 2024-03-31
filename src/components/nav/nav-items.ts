import { type NavItemProps } from '@/components/nav/types'

const navItemsList: NavItemProps[] = [
  {
    href: '/',
    title: 'Home',
    hideNavigation: true
  },
  {
    href: '/search',
    title: 'Search'
  },
  {
    href: '/posts',
    title: 'Posts'
  },

  {
    href: '/contact',
    title: 'Contact'
  }
]

export { navItemsList }
