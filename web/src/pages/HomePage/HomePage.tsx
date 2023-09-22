import { useParams } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import ArticlesCell from 'src/components/ArticlesCell'

const HomePage = () => {
  const params = useParams()

  const queryInput = {
    page: params.page ? parseInt(params.page) : 1,
    perPage: params.perPage ? parseInt(params.perPage) : 10,
    postTypes: params.postTypes ? params.postTypes.split(',') : [],
    authors: params.authors
      ? params.authors.split(',').map((a) => parseInt(a))
      : [],
  }

  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <ArticlesCell input={queryInput} />
    </>
  )
}

export default HomePage
