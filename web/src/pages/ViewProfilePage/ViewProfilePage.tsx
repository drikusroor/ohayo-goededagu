import { MetaTags } from '@redwoodjs/web'

import ViewProfileCell from 'src/components/ViewProfileCell'

type ViewProfilePageProps = {
  id: number
}

const ViewProfilePage = ({ id }: ViewProfilePageProps) => {
  return (
    <>
      <MetaTags title="ViewProfile" description="ViewProfile page" />

      <ViewProfileCell id={id} />
    </>
  )
}

export default ViewProfilePage
