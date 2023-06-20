// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof EditAccountForm> = (args) => {
//   return <EditAccountForm {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import EditAccountForm from './EditAccountForm'

export const generated = () => {
  return <EditAccountForm />
}

export default {
  title: 'Components/EditAccountForm',
  component: EditAccountForm,
} as ComponentMeta<typeof EditAccountForm>
