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
import {
  checkboxInputTag,
  truncate,
  useWindowDimensions,
} from 'src/lib/formatters'
import { getUserName } from 'src/lib/get-user-name'

import DisplayDatetime from '../DisplayDatetime/DisplayDatetime'

interface Props {
  headers: Array<string>
  data: object[]
  onDelete?: (value) => void
  onEdit?: (value) => void
  onShow?: (value) => void
}

const DashboardTable = ({ headers, data, onDelete, onEdit, onShow }: Props) => {
  const { currentUser } = useAuth()
  const { width } = useWindowDimensions()
  const isMobile = width < 428

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
                  {header === 'Id' && <td>{truncate(item.id, isMobile)}</td>}
                  {header === 'Title' && (
                    <td
                      onClick={() => onEdit(item)}
                      className="cursor-pointer underline decoration-blue-500 hover:text-blue-500 hover:underline xl:no-underline"
                    >
                      {truncate(item.title, isMobile)}
                    </td>
                  )}
                  {header === 'Body' && (
                    <td>{truncate(item.body, isMobile)}</td>
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
                  {header === 'Author' && <td>{getUserName(item?.user)}</td>}
                  {header === 'Created at' && (
                    <td>
                      <DisplayDatetime
                        datetime={item.createdAt}
                        showDate
                        showTimeago={false}
                      />
                    </td>
                  )}
                  {header === 'User id' && (
                    <td>{truncate(item.userId, isMobile)}</td>
                  )}
                  {header === 'Post id' && (
                    <td>
                      <Link
                        to={routes.article({ id: item.postId })}
                        title={'Show post ' + item.postId + ' detail'}
                        className="flex flex-row items-center gap-2 text-blue-500 underline hover:text-blue-700"
                      >
                        {truncate(item.postId, isMobile)}
                      </Link>
                    </td>
                  )}
                  {header === 'Parent id' && (
                    <td>{truncate(item.parentId, isMobile)}</td>
                  )}
                  {header === 'Deleted' && (
                    <td>{checkboxInputTag(item.deleted)}</td>
                  )}

                  {header === 'Name' && (
                    <td>{truncate(item.name, isMobile)}</td>
                  )}
                  {header === 'Description' && (
                    <td>{truncate(item.description, isMobile)}</td>
                  )}
                  {header === 'Show' && (
                    <td>
                      <nav className="rw-table-actions">
                        <Button
                          title={'Show post' + item.id}
                          text="Show"
                          size="xs"
                          icon={<BsSearch />}
                          onClick={() => onShow(item)}
                          className="text-slate-500"
                          variant="outlined"
                        />
                      </nav>
                    </td>
                  )}
                  {header === 'Edit' && (
                    <td>
                      <nav className="rw-table-actions">
                        <Button
                          title={'Edit post' + item.id}
                          text="Edit"
                          size="xs"
                          icon={<BsFillPencilFill />}
                          onClick={() => onEdit(item)}
                          color="cobalt-blue"
                          variant="outlined"
                        />
                      </nav>
                    </td>
                  )}
                  {header === 'Delete' && (
                    <td>
                      <nav className="rw-table-actions">
                        {showDelete(item) && (
                          <Button
                            title={'Delete post ' + item.id}
                            text="Delete"
                            size="xs"
                            icon={<BsFillTrash3Fill />}
                            onClick={() => onDelete(item)}
                            color="monza-red"
                            variant="outlined"
                          />
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
