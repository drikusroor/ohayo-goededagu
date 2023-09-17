import { User } from 'types/graphql'

import { Role } from 'src/types/role'

import getArticle from './get-article.fixture'

export class UserFixture {
  user: User

  constructor() {}

  initUser(overrides: Partial<User> = {}) {
    this.user = {
      id: 1,
      email: 'info@example.com',
      posts: [],
      roles: [],
      profile: null,
      ...overrides,
    }
    return this
  }

  withProfile(overrides: Partial<User['profile']> = {}) {
    this.user.profile = {
      id: 42,
      name: 'John Doe',
      japaneseName: 'ジョン・ドゥ',
      avatar: 'https://example.com/avatar.png',
      bio: 'Hello, World!',
      createdAt: '2020-01-01T12:34:56.789Z',
      ...overrides,
    }
    return this
  }

  withPosts(overrides: Partial<User['posts'][0]>[] = []) {
    this.user.posts = [
      getArticle({ id: 1 }),
      getArticle({ id: 2 }),
      ...overrides,
    ]
    return this
  }

  withRoles(overrides: Role[] = []) {
    this.user.roles = [Role.ADMIN, ...overrides]
    return this
  }

  withFullMonty() {
    return this.initUser().withProfile().withPosts().withRoles()
  }

  build() {
    return this.user
  }
}
