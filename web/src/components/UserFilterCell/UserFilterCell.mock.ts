// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  usersWithPosts: [
    {
      id: 42,
      profile: {
        name: 'John Doe',
        avatarUrl: 'https://avatars2.githubusercontent.com/u/69631?s=460&v=4',
      },
    },
  ],
  activeAuthors: [42],
})
