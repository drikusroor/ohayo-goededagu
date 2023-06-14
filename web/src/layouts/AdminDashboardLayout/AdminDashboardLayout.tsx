import { Link, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

type AdminDashboardLayoutProps = {
  children?: React.ReactNode
}

const AdminDashboardLayout = ({ children }: AdminDashboardLayoutProps) => {
  const { isAuthenticated, currentUser, logOut } = useAuth()

  return (
    <div className="flex flex-row">
      <div className="flex h-screen w-64 flex-col justify-between bg-gray-200">
        <div>
          <div className="flex h-16 flex-col items-center justify-center">
            <h1 className="text-3xl font-bold">Dashboard</h1>
          </div>
          <nav>
            <ul className="flex flex-col gap-1 py-4">
              <li className="dashboard-item">
                <Link className="w-full" to="/">
                  Home
                </Link>
              </li>
              <li className="dashboard-item">
                <Link className="w-full" to="/admin/posts">
                  Posts
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        {isAuthenticated ? (
          <div className="flex items-center justify-between bg-slate-500 p-3 text-white">
            <span>Logged in as {currentUser.email.split('@')[0]}</span>
            <button
              type="button"
              onClick={logOut}
              className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to={routes.login()}>Login</Link>
        )}
      </div>
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  )
}

export default AdminDashboardLayout
