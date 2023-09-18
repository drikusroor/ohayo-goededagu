import {
  BsFillPencilFill,
  BsFillTrash3Fill,
  BsPencilSquare,
  BsSearch,
  BsSendFill,
} from 'react-icons/bs'

import { useAuth } from 'src/auth'
import ArticleTypeIcon, {
  EPostType,
} from 'src/components/ArticleTypeIcon/ArticleTypeIcon'
import Button from 'src/components/Button/Button'
import RenderBody from 'src/components/RenderBody/RenderBody'
import { timeTag, truncate } from 'src/lib/formatters'

interface Props {
  headers: Array<string>
  data: object
  onDelete?: (value) => void
  onEdit?: (value) => void
  onShow?: (value) => void
}

const DashboardTable = ({ headers, data, onDelete, onEdit, onShow }: Props) => {
  const { currentUser } = useAuth()

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}> {header} </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((post) => (
            <tr key={post.id}>
              <td>{truncate(post.id)}</td>
              <td>{truncate(post.title)}</td>
              <td>
                <RenderBody body={truncate(post.body)} />
              </td>
              <td>
                <ArticleTypeIcon type={post.type as EPostType} />
              </td>
              <td>{post.published ? <BsSendFill /> : <BsPencilSquare />}</td>
              <td>{post?.user?.name}</td>
              <td>{timeTag(post.createdAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Button
                    title={'Show post' + post.id}
                    onClick={() => onShow(post)}
                    className="rw-button flex items-center gap-2 text-base transition-colors sm:text-sm"
                    color="rw-gray"
                    icon={BsSearch}
                    variant="outlined"
                  >
                    <BsSearch />
                    <span className="hidden lg:inline-block">Show</span>
                  </Button>
                </nav>
              </td>
              <td>
                <nav className="rw-table-actions">
                  <Button
                    title={'Edit post' + post.id}
                    onClick={() => onEdit(post)}
                    className="rw-button rw-button-blue flex items-center gap-2 text-base transition-colors sm:text-sm"
                    color="cobalt-blue"
                    variant="outlined"
                  >
                    <BsFillPencilFill />
                    <span className="hidden lg:inline-block">Edit</span>
                  </Button>
                </nav>
              </td>
              <td>
                <nav className="rw-table-actions">
                  {post?.user?.name === currentUser?.name && (
                    <Button
                      title={'Delete post ' + post.id}
                      onClick={() => onDelete(post.id)}
                      className="rw-button rw-button-red flex items-center gap-2 text-base transition-colors sm:text-sm"
                      color="monza-red"
                      variant="outlined"
                    >
                      <BsFillTrash3Fill />
                      <span className="hidden lg:inline-block">Delete</span>
                    </Button>
                  )}
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DashboardTable
