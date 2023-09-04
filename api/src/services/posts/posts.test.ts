import { posts, allPosts, post } from './posts'
import type { StandardScenario } from './posts.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('posts', () => {
  scenario(
    'returns all published posts',
    async (scenario: StandardScenario) => {
      const result = await posts()

      expect(result.length).toEqual(Object.keys(scenario.post).length)
    }
  )

  scenario('returns all  posts', async (scenario: StandardScenario) => {
    const result = await allPosts()

    expect(result.length).toEqual(Object.keys(scenario.post).length)
  })

  scenario('returns a single post', async (scenario: StandardScenario) => {
    const result = await post({ id: scenario.post.one.id })

    expect(result).toEqual(scenario.post.one)
  })
})
