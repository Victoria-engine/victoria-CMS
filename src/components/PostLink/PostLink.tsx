import React from 'react'
import { Link } from 'evergreen-ui'
import { PostLinkProps } from '../../types'
import classes from './styles.module.scss'
import { getRelativeDate } from '../../utils/dateUtils'

const PostLink: React.FC<PostLinkProps> = ({ postData, ...rest }) => {

  return (
    <li {...rest} className={classes.postLink}>
      <Link to={`/${postData._id}`}>
        <h3>{postData.title}</h3>

        <div className={classes.section}>
          <p>{postData.excerpt}</p>
        </div>

        <div className={classes.section}>
          <p>Published  by <b>{postData.author}</b> -- {getRelativeDate(postData.createdAt)}</p>
        </div>
      </Link>
    </li>
  )
}

export default PostLink