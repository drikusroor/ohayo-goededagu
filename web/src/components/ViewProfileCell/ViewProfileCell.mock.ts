import { UserFixture } from 'src/fixtures/get-user.fixture'

// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  user: new UserFixture().withFullMonty().build(),
})
