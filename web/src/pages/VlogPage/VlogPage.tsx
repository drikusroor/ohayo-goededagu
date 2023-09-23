import { useParams } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import ArticlesCell from 'src/components/ArticlesCell'

const VlogPage = () => {
  const params = useParams()

  const queryInput = {
    page: params.page ? parseInt(params.page) : 1,
    perPage: params.perPage ? parseInt(params.perPage) : 10,
    postTypes: ['VIDEO'],
    authors: params.authors
      ? params.authors.split(',').map((a) => parseInt(a))
      : [],
    from: params.from ? new Date(params.from) : null,
    to: params.to ? new Date(params.to) : null,
  }

  return (
    <>
      <MetaTags title="Vlog" description="Vlog page" />
      <ArticlesCell vlog input={queryInput} />
    </>
  )
}

export default VlogPage
