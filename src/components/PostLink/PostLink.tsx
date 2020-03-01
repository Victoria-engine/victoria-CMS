import React from 'react'
import { Link } from 'evergreen-ui'
import { PostLinkProps } from '../../types'

const PostLink: React.FC<PostLinkProps> = ({ postData, ...rest }) => {

  return (
    <li  {...rest}>
      <Link to={`/${postData._id}`}>
        <h3>{postData.title}</h3>
      </Link>
    </li>
  )
}

export default PostLink