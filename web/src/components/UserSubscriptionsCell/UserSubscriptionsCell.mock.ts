// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  user: {
    id: 42,
    userSubscriptions: [{ id: 1, userId: 1, type: 'POST_AUTHOR', target: 1 }],
  },
  users: [
    {
      id: 1,
      profile: {
        name: 'Jane Doe',
        email: 'info@example.com',
      },
    },
  ],
})
