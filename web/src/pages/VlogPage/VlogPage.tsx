import { MetaTags } from '@redwoodjs/web'

import ArticlesCell from 'src/components/ArticlesCell'

const VlogPage = () => {
  return (
    <>
      <MetaTags title="Vlog" description="Vlog page" />
      <ArticlesCell vlog />
    </>
  )
}

export default VlogPage
