import React from 'react'
import { PostsProps as Props, Store } from '../../types'
import Topbar from '../../components/Layout/Topbar'
import { useSelector } from 'react-redux'
import PostLink from '../../components/PostLink'
import { Spinner } from 'evergreen-ui'

/**
 * Posts list screen
 */
const Posts: React.FC<Props> = () => {

  const blogReducer = useSelector(({ blog }: Store) => blog)
  const blogData = blogReducer.blog
  
  if (!blogData || blogReducer.working) return <Spinner />

  return (
    <div>
      <Topbar
        actions={[
         { iconName: 'add', label: 'New post', appearance: 'primary', onClick: () => console.log('creating post') },
        ]}
        title='Posts list'
      />
      
      <ul>
        {blogData.posts.map(post => <PostLink postData={post} key={`${post._id}-blogPost`} />)}
      </ul>
    </div>
  )
}

export default Posts