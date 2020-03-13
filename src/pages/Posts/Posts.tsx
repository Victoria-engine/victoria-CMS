import React, { useEffect, useState } from 'react'
import { PostsProps as Props, Store, BlogPost } from '../../types'
import Topbar from '../../components/Layout/Topbar'
import { useSelector } from 'react-redux'
import { Spinner } from 'evergreen-ui'
import classes from './styles.module.scss'
import { useHistory } from 'react-router-dom'
import PostsTable from '../../components/PostsTable/PostsTable'
import OnBoarder from '../../components/OnBoarder'
import { getPostsSteps } from '../../components/OnBoarder/steps'

/**
 * Posts list screen
 */
const Posts: React.FC<Props> = () => {

  // Local State
  const [posts, setPosts] = useState<BlogPost[]>([])


  // Selectors
  const blogReducer = useSelector(({ blog }: Store) => blog)
  const blogData = blogReducer.blog


  useEffect(() => {
    // getPosts...
  })

  useEffect(() => {
    setPosts(blogData.posts.filter(p => ['public'].includes(p.visibility)))
  }, [blogData.posts])

  const history = useHistory()

  const nagivateToPostHandler = (postID: string) => () => {
    history.push(`/post/${postID}`)
  }

  const onSearchChange = (value: string) => {
    if (!value) return setPosts(blogData.posts.filter(p => ['public'].includes(p.visibility)))

    const searchValue = value.toLocaleLowerCase()

    setPosts(posts.filter(post =>
      post.title.toLocaleLowerCase().includes(searchValue) && ['public'].includes(post.visibility)))
  }

  if (!blogData || blogReducer.working || !posts) return <Spinner />

  return (
    <div className={classes.postsContainer}>
      <OnBoarder 
        steps={getPostsSteps({ show: true })}
        run
        
      />
      <Topbar
        title='Posts list'
        actions={[
          { iconName: 'add', label: 'New post', appearance: 'primary', onClick: () => history.push('/post/new') },
         ]}
         description='The list with all of the public posts, the posts the users will see on your blog.'
      />
      
      <PostsTable
        posts={posts}
        onSelect={nagivateToPostHandler}
        onSearchChange={onSearchChange}
        onBoardingID='posts-table'
      />
    </div>
  )
}

export default Posts