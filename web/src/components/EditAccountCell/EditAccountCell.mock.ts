// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  editAccount: {
    id: 42,
    email: 'info@example.com',
    name: '',
    profile: {
      id: 42,
      name: 'John',
      japaneseName: 'Doe',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      avatar: 'https://i.pravatar.cc/300',
      createdAt: '2021-07-01T00:00:00Z',
      updatedAt: '2021-07-01T00:00:00Z',
    },
  },
})
