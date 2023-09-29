// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  article: {
    id: 42,
    postThumbs: [
      { id: 42, up: true },
      { id: 43, up: true },
      { id: 44, up: true },
    ],
    comments: [
      {
        id: 42,
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        user: {
          id: 42,
          email: 'info@example.com',
          profile: {
            name: 'John Doe',
          },
        },
        thumbs: [
          { id: 42, up: true },
          { id: 43, up: true },
          { id: 44, up: true },
        ],
      },
      {
        id: 43,
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        user: {
          id: 42,
          email: 'info@example.com',
          profile: {
            name: 'John Doe',
          },
        },
        thumbs: [
          { id: 42, up: true },
          { id: 43, up: true },
          { id: 44, up: true },
        ],
      },
    ],
    user: {
      id: 42,
      email: 'info@example.com',
      profile: {
        name: 'John Doe',
      },
    },
  },
})
