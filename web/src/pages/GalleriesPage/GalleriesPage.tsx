import { MetaTags } from '@redwoodjs/web'

import ArticlesCell from 'src/components/ArticlesCell'

const GalleriesPage = () => {
  return (
    <>
      <MetaTags title="Galleries" description="Galleries page" />
      <ArticlesCell gallery />
    </>
  )
}

export default GalleriesPage
