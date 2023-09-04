import { Role } from 'src/types/role'

// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  users: [
    {
      id: 42,
      email: 'info@example.com',
      name: 'Normal guest',
      roles: [Role.GUEST],
    },
  ],
})
