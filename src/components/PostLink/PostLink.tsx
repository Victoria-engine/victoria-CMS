import React from 'react'
import { Link } from 'evergreen-ui'
import { PostLinkProps } from '../../types'
import classes from './styles.module.scss'
import { getRelativeDate } from '../../utils/dateUtils'
import { useHistory } from 'react-router-dom'

const PostLink: React.FC<PostLinkProps> = ({ postData, ...rest }) => {
  const history = useHistory()

  const handlePostClick = (postID: string) => () => {
    history.push(`/post/${postID}`)
  }

  return (
    <li {...rest} className={classes.postLink} onClick={handlePostClick(postData.id)}>
      <Link to={`/${postData.id}`}>
        <h3>{postData.title}</h3>

        <div className={classes.section}>
          <p>{postData.description}</p>
        </div>

        <div className={classes.section}>
          <p>Published  by <b>{postData.user.name}</b> -- {getRelativeDate(postData.created_at)}</p>
        </div>
      </Link>
    </li>
  )
}

export default PostLink