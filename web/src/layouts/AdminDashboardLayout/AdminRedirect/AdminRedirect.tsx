import { Role } from 'types/graphql'

import { Redirect } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

const RedirectAdmin = () => {
  const { currentUser } = useAuth()
  const requiredRolesAdminPosts = ['ADMIN', 'MODERATOR']
  const roles = (currentUser?.roles || []) as Role[]
  const adminRedirectPath = roles.some((role) =>
    requiredRolesAdminPosts.includes(role)
  )
    ? '/admin/posts'
    : '/admin/account/edit'

  return <Redirect to={adminRedirectPath} />
}

export default RedirectAdmin
