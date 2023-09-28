interface User {
  profile: {
    name: string
  }
  email: string
}

export function getUserName(user: User) {
  return user?.profile?.name || user?.email || 'Anon'
}
