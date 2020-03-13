import React from 'react'
import { Table } from 'evergreen-ui'
import { PostsTableProps, BlogPost } from '../../types'
import { getRelativeDate, transformToLocalDate } from '../../utils/dateUtils'

const PostsTable: React.FC<PostsTableProps> = ({ posts, onBoardingID, onSelect, onSearchChange, ...props }) => {

  const getStatusWording = (status: BlogPost['visibility']) => {
    switch (status) {
      case 'private': return 'DRAFT'
      case 'public': return 'PUBLISHED'
      case 'not-listed': return 'NOT LISTED'
      default: return status
    }
  }

  return (
    <Table {...props} id={onBoardingID}>
      <Table.Head>
        <Table.SearchHeaderCell icon='search' onChange={onSearchChange} />
        <Table.TextHeaderCell>
          Status
        </Table.TextHeaderCell>
        <Table.TextHeaderCell>
          Updated
        </Table.TextHeaderCell>
        <Table.TextHeaderCell>
          Created
        </Table.TextHeaderCell>
        <Table.TextHeaderCell>
          Author
        </Table.TextHeaderCell>
      </Table.Head>

      <Table.Body>
        {posts.map(p => (
          <Table.Row key={`${p._id}post`} isSelectable onSelect={onSelect(p._id)}>
            <Table.TextCell>{p.title}</Table.TextCell>
            <Table.TextCell>{getStatusWording(p.visibility)}</Table.TextCell>
            <Table.TextCell>{getRelativeDate(p.updatedAt)}</Table.TextCell>
            <Table.TextCell>{transformToLocalDate(p.createdAt)}</Table.TextCell>
            <Table.TextCell>{p.author}</Table.TextCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default PostsTable