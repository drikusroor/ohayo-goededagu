import { Link, routes } from '@redwoodjs/router'
import { useLocation } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import Button from 'src/components/Button/Button'

type AdminDashboardLayoutProps = {
  children?: React.ReactNode
}

const AdminDashboardLayout = ({ children }: AdminDashboardLayoutProps) => {
  const { isAuthenticated, currentUser, logOut } = useAuth()

  const { pathname } = useLocation()

  const getIsActiveClass = (path: string) => {
    return pathname === path ? 'border-r-4 border-gray-700' : ''
  }

  return (
    <div className="flex flex-row">
      <div className="flex h-screen w-64 flex-col justify-between bg-gray-200">
        <div>
          <div className="flex h-16 flex-col items-center justify-center">
            <h1 className="text-3xl font-bold">Dashboard</h1>
          </div>
          <nav>
            <ul className="flex flex-col gap-1 py-4">
              <Link className={`dashboard-item`} to="/">
                Home
              </Link>
              <Link
                className={`dashboard-item ${getIsActiveClass('/admin/posts')}`}
                to="/admin/posts"
              >
                Posts
              </Link>
            </ul>
          </nav>
        </div>
        {isAuthenticated ? (
          <div className="flex items-center justify-between bg-slate-500 p-3 text-white">
            <span>Logged in as {currentUser.email.split('@')[0]}</span>
            <Button text="Logout" onClick={logOut} color="monza-red" />
          </div>
        ) : (
          <Link to={routes.login()}>Login</Link>
        )}
      </div>
      <div className="flex flex-1 flex-col overflow-auto">{children}</div>
    </div>
  )
}

export default AdminDashboardLayout
