import { useCallback, useEffect, useMemo } from 'react'

import {
  BsBoxArrowUp,
  BsChatLeft,
  BsEnvelope,
  BsFillCalendarEventFill,
  BsFillHandIndexThumbFill,
  BsFillHouseFill,
  BsFillJournalBookmarkFill,
  BsFillPersonFill,
  BsImages,
  BsJournals,
  BsPersonCheckFill,
} from 'react-icons/bs'

import { AvailableRoutes, Link, navigate, routes } from '@redwoodjs/router'
import { useLocation } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import Button from 'src/components/Button/Button'

interface MenuItem {
  name: string
  path: string
  activeRoutePattern?: string
  roles?: string[]
  icon?: React.ReactNode
}

type GetMenuItems = (routes: AvailableRoutes) => MenuItem[]

const getMenuItems: GetMenuItems = (routes) => [
  {
    name: 'Home',
    path: '/',
    icon: <BsFillHouseFill />,
  },
  {
    name: 'Posts',
    path: '/admin/posts',
    activeRoutePattern: '/posts',
    roles: ['ADMIN', 'MODERATOR'],
    icon: <BsJournals />,
  },
  {
    name: 'My Posts',
    path: '/admin/my-posts',
    activeRoutePattern: '/my-posts',
    roles: ['ADMIN', 'MODERATOR'],
    icon: <BsFillJournalBookmarkFill />,
  },
  {
    name: 'Image Galleries',
    path: '/admin/image-galleries',
    activeRoutePattern: '/image-galleries',
    roles: ['ADMIN', 'MODERATOR'],
    icon: <BsImages />,
  },
  {
    name: 'Comments',
    path: '/admin/comments',
    activeRoutePattern: '/comments',
    roles: ['ADMIN', 'MODERATOR'],
    icon: <BsChatLeft />,
  },
  {
    name: 'Subscriptions',
    path: '/admin/user-subscriptions',
    activeRoutePattern: '/user-subscriptions',
    roles: ['ADMIN', 'MODERATOR'],
    icon: <BsFillHandIndexThumbFill />,
  },
  {
    name: 'Account',
    path: '/admin/account/edit',
    activeRoutePattern: '/account/edit',
    icon: <BsFillPersonFill />,
  },
  {
    name: 'Email settings',
    path: routes.emailSettings(),
    activeRoutePattern: '/email-settings',
    icon: <BsEnvelope />,
  },
  {
    name: 'Moderate Users',
    path: '/admin/user-moderation',
    activeRoutePattern: '/user-moderation',
    roles: ['ADMIN', 'MODERATOR'],
    icon: <BsPersonCheckFill />,
  },
  {
    name: 'User Actions',
    path: '/admin/user-actions',
    activeRoutePattern: '/user-actions',
    roles: ['ADMIN', 'MODERATOR'],
    icon: <BsFillCalendarEventFill />,
  },
]

type AdminDashboardLayoutProps = {
  children?: React.ReactNode
}

const AdminDashboardLayout = ({ children }: AdminDashboardLayoutProps) => {
  const { isAuthenticated, currentUser, logOut } = useAuth()
  const { pathname } = useLocation()

  useEffect(() => {
    // apply .admin-dashboard-layout class to body
    document.body.classList.add('admin-dashboard-layout')

    // cleanup
    return () => {
      document.body.classList.remove('admin-dashboard-layout')
    }
  }, [])

  const getIsActiveClass = useCallback(
    (path: string) => {
      if (!pathname) return ''

      return pathname.includes(path) ? 'border-r-4 border-gray-700' : ''
    },
    [pathname]
  )

  const menuItems = useMemo(() => {
    return getMenuItems(routes)
  }, [])

  return (
    <div className="flex flex-row">
      <div className="fixed flex h-screen w-8 flex-col justify-between bg-gray-200 md:w-14 lg:w-64">
        <div>
          <div
            className="p-1 lg:p-3 lg:text-center"
            onClick={() => navigate(routes.home())}
            onKeyDown={() => navigate(routes.home())}
            tabIndex={0}
            role="button"
          >
            <h1 className="flex items-center justify-between text-xl font-bold lg:text-3xl">
              <span className="hidden lg:inline">Dashboard</span>
              <img
                className="inline h-6 w-6 md:h-12 md:w-12"
                alt="Logo"
                src="/images/logo.png"
                width="48"
                height="48"
              />
            </h1>
          </div>
          <nav>
            <ul className="flex flex-col gap-1 py-2">
              {menuItems.map((item) => {
                const isAllowed =
                  !item.roles ||
                  currentUser?.roles?.some((r) =>
                    item.roles.includes(r as string)
                  )

                if (!isAllowed) return null

                return (
                  <Link
                    key={item.name}
                    className={`dashboard-item flex items-center gap-2 ${getIsActiveClass(
                      item.activeRoutePattern
                    )}`}
                    to={item.path}
                  >
                    <span className="mx-auto md:my-2 md:text-lg lg:mx-0">
                      {item.icon}
                    </span>
                    <span className="hidden lg:inline-block">{item.name}</span>
                  </Link>
                )
              })}
            </ul>
          </nav>
        </div>
        {isAuthenticated ? (
          <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-500 p-0.5 text-white md:p-1 lg:p-3">
            <span className="hidden lg:block">
              Logged in as {currentUser.email}
            </span>
            <Button
              onClick={logOut}
              icon={<BsBoxArrowUp />}
              color="monza-red"
              size="xs"
              className="flex items-center gap-2 text-xs md:text-sm"
            >
              <span className="hidden text-xs lg:block">Uitloggen</span>
            </Button>
          </div>
        ) : (
          <Link to={routes.login()}>Inloggen</Link>
        )}
      </div>
      <div className="flex flex-1 flex-col overflow-auto pl-8 md:pl-14 lg:pl-64">
        {children}
      </div>
    </div>
  )
}

export default AdminDashboardLayout
