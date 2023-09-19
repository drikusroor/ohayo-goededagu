import {
  BsFillPencilFill,
  BsFillTrash3Fill,
  BsPencilSquare,
  BsSearch,
  BsSendFill,
} from 'react-icons/bs'

import { Link, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import ArticleTypeIcon, {
  EPostType,
} from 'src/components/ArticleTypeIcon/ArticleTypeIcon'
import Button from 'src/components/Button/Button'
import RenderBody from 'src/components/RenderBody/RenderBody'
import { checkboxInputTag, truncate } from 'src/lib/formatters'

import DisplayDatetime from '../DisplayDatetime/DisplayDatetime'

interface Props {
  headers: Array<string>
  data: object
  onDelete?: (value) => void
  onEdit?: (value) => void
  onShow?: (value) => void
}

const DashboardTable = ({ headers, data, onDelete, onEdit, onShow }: Props) => {
  const { currentUser } = useAuth()

  const showDelete = (item) => {
    if (item.__typename === 'Post' && item?.user?.name === currentUser?.name) {
      return true
    } else if (item.__typename !== 'Post') {
      return true
    }
  }

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
          {data.map((item) => (
            <tr key={item.id}>
              {headers.map((header) => (
                <>
                  {header === 'Id' && <td>{truncate(item.id)}</td>}
                  {header === 'Title' && <td>{truncate(item.title)}</td>}
                  {header === 'Body' && (
                    <td>
                      <RenderBody body={truncate(item.body)} />
                    </td>
                  )}
                  {header === 'Type' && (
                    <td>
                      <ArticleTypeIcon type={item.type as EPostType} />
                    </td>
                  )}
                  {header === 'Published' && (
                    <td>
                      {item.published ? <BsSendFill /> : <BsPencilSquare />}
                    </td>
                  )}
                  {header === 'Author' && <td>{item?.user?.name}</td>}
                  {header === 'Created at' && (
                    <td>
                      <DisplayDatetime datetime={item.createdAt} showDate />
                    </td>
                  )}
                  {header === 'User id' && <td>{truncate(item.userId)}</td>}
                  {header === 'Post id' && (
                    <td>
                      <Link
                        to={routes.article({ id: item.postId })}
                        title={'Show post ' + item.postId + ' detail'}
                        className="flex flex-row items-center gap-2 text-blue-500 underline hover:text-blue-700"
                      >
                        {truncate(item.postId)}
                      </Link>
                    </td>
                  )}
                  {header === 'Parent id' && <td>{truncate(item.parentId)}</td>}
                  {header === 'Deleted' && (
                    <td>{checkboxInputTag(item.deleted)}</td>
                  )}

                  {header === 'Name' && <td>{truncate(item.name)}</td>}
                  {header === 'Description' && (
                    <td>{truncate(item.description)}</td>
                  )}
                  {header === 'Show' && (
                    <td>
                      <nav className="rw-table-actions">
                        <Button
                          title={'Show post' + item.id}
                          onClick={() => onShow(item)}
                          className="rw-button rw-button-small flex items-center gap-1"
                          color="rw-gray"
                          icon={BsSearch}
                          variant="outlined"
                        >
                          <BsSearch />
                          <span className="hidden lg:inline-block">Show</span>
                        </Button>
                      </nav>
                    </td>
                  )}
                  {header === 'Edit' && (
                    <td>
                      <nav className="rw-table-actions">
                        <Button
                          title={'Edit post' + item.id}
                          onClick={() => onEdit(item)}
                          className="rw-button rw-button-small rw-button-blue flex items-center gap-1"
                          color="cobalt-blue"
                          variant="outlined"
                        >
                          <BsFillPencilFill />
                          <span className="hidden lg:inline-block">Edit</span>
                        </Button>
                      </nav>
                    </td>
                  )}
                  {header === 'Delete' && (
                    <td>
                      <nav className="rw-table-actions">
                        {showDelete(item) && (
                          <Button
                            title={'Delete post ' + item.id}
                            onClick={() => onDelete(item.id)}
                            className="rw-button rw-button-small rw-button-red flex items-center gap-1"
                            color="monza-red"
                            variant="outlined"
                          >
                            <BsFillTrash3Fill />
                            <span className="hidden lg:inline-block">
                              Delete
                            </span>
                          </Button>
                        )}
                      </nav>
                    </td>
                  )}
                </>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DashboardTable
