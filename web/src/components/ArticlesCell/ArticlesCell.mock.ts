// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  posts: [{ id: 42 }, { id: 43 }, { id: 44 }],
  pagination: {
    count: 3,
    page: 1,
    perPage: 10,
  },
  activeFilters: {
    authors: [],
    postTypes: [],
    from: null,
    to: null,
  },
})
