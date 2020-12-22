import React from 'react'
import { SearchIcon, Table } from 'evergreen-ui'
import { PostsTableProps, BlogPost } from '../../types'
import { getRelativeDate, transformToLocalDate } from '../../utils/dateUtils'

const PostsTable: React.FC<PostsTableProps> = ({ posts, onSelect, onSearchChange }) => {

  const getStatusWording = (status: BlogPost['visibility']) => {
    switch (status) {
      case 'public': return 'PUBLISHED'
      case 'not-listed': return 'DRAFT'
      default: return status
    }
  }

  return (
    <Table>
      <Table.Head>
        <Table.SearchHeaderCell icon={SearchIcon} onChange={onSearchChange} />
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
          <Table.Row key={`${p.id}post`} isSelectable onSelect={onSelect(p.id)}>
            <Table.TextCell>{p.title}</Table.TextCell>
            <Table.TextCell>{getStatusWording(p.visibility)}</Table.TextCell>
            <Table.TextCell>{getRelativeDate(p.updated_at)}</Table.TextCell>
            <Table.TextCell>{transformToLocalDate(p.created_at)}</Table.TextCell>
            <Table.TextCell>{p.user.name}</Table.TextCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default PostsTable