import React from 'react'
import { PostsProps as Props, Store } from '../../types'
import Topbar from '../../components/Layout/Topbar'
import { useSelector } from 'react-redux'
import PostLink from '../../components/PostLink'
import { Spinner } from 'evergreen-ui'
import classes from './styles.module.scss'

/**
 * Posts list screen
 */
const Posts: React.FC<Props> = () => {

  const blogReducer = useSelector(({ blog }: Store) => blog)
  const blogData = blogReducer.blog
  
  if (!blogData || blogReducer.working) return <Spinner />

  return (
    <div className={classes.postsContainer}>
      <Topbar
        actions={[]}
        title='Posts list'
      />
      
      <ul className={classes.postsList}>
        {blogData.posts.map(post => <PostLink postData={post} key={`${post._id}-blogPost`} />)}
      </ul>
    </div>
  )
}

export default Posts