// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof RenderBody> = (args) => {
//   return <RenderBody {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import RenderBody from './RenderBody'

export const generated = () => {
  const body = `# This is a header

  This is a paragraph

  ## This is a subheader

  This is another paragraph

  ### This is a subsubheader

  This is yet another paragraph

  #### This is a subsubsubheader

  This is yet another paragraph
`

  return <RenderBody body={body} />
}

export default {
  title: 'Components/RenderBody',
  component: RenderBody,
} as ComponentMeta<typeof RenderBody>
