import { Link } from "@redwoodjs/router"

type AdminDashboardLayoutProps = {
  children?: React.ReactNode
}

const AdminDashboardLayout = ({ children }: AdminDashboardLayoutProps) => {
  return <div className="flex flex-row">
    <div className="flex flex-col w-64 h-screen bg-gray-200">
      <div className="flex flex-col items-center justify-center h-16">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>
      <nav>
        <ul className="flex flex-col py-4">
          <li className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 border-r-4 border-gray-700">
            <Link className="w-full" to="/admin/posts">Posts</Link>
          </li>
        </ul>
      </nav>
    </div>
    <div>
      {children}
    </div>
  </div>
}

export default AdminDashboardLayout
