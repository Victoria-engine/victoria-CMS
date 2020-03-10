import React, { useEffect } from 'react'
import { PostsProps as Props, Store } from '../../types'
import Topbar from '../../components/Layout/Topbar'
import { useSelector } from 'react-redux'
import PostLink from '../../components/PostLink'
import { Spinner } from 'evergreen-ui'
import classes from './styles.module.scss'
import { useHistory } from 'react-router-dom'

/**
 * Posts list screen
 */
const Posts: React.FC<Props> = () => {

  useEffect(() => {
    // getPosts...
  })

  const history = useHistory()

  // Selectors
  const blogReducer = useSelector(({ blog }: Store) => blog)
  const blogData = blogReducer.blog
  
  if (!blogData || blogReducer.working) return <Spinner />

  return (
    <div className={classes.postsContainer}>
      <Topbar
        title='Posts list'
        actions={[
          { iconName: 'add', label: 'New post', appearance: 'primary', onClick: () => history.push('/post/new') },
         ]}
      />
      
      <ul className={classes.postsList}>
        {blogData.posts.map(post => <PostLink postData={post} key={`${post._id}-blogPost`} />)}
      </ul>
    </div>
  )
}

export default Posts