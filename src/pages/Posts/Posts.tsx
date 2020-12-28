import React, { useEffect, useState } from 'react'
import { PostsProps as Props, Store, BlogPost, RemoteDataStatus, PostVisibility, VictoriaTheme } from '../../types'
import Topbar from '../../components/Layout/Topbar'
import { useDispatch, useSelector } from 'react-redux'
import { AddIcon, Spinner, useTheme } from 'evergreen-ui'
import classes from './styles.module.scss'
import { useHistory } from 'react-router-dom'
import PostsTable from '../../components/PostsTable/PostsTable'
import { getPostsList } from '../../reducers/blog'

/**
 * Posts list screen
 */
const Posts: React.FC<Props> = () => {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const theme = useTheme() as VictoriaTheme

  const blogReducer = useSelector(({ blog }: Store) => blog)
  const { posts: blogPosts } = blogReducer.blog
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPostsList(PostVisibility.Public))
  }, [dispatch, getPostsList])


  useEffect(() => {
    setPosts(blogPosts.filter(p => ['public'].includes(p.visibility)))
  }, [blogPosts, setPosts])

  const history = useHistory()

  const nagivateToPostHandler = (postID: string) => () => {
    history.push(`/post/${postID}`)
  }

  const onSearchChange = (value: string) => {
    if (!value) return setPosts(blogPosts.filter(p => ['public'].includes(p.visibility)))

    const searchValue = value.toLocaleLowerCase()

    setPosts(posts.filter(post =>
      post.title.toLocaleLowerCase().includes(searchValue) && ['public'].includes(post.visibility)))
  }

  if (blogReducer.working || !posts) return <Spinner marginX="auto" marginY={120} />

  return (
    <div className={classes.postsContainer}>
      <Topbar
        title='Posts list'
        actions={[
          { icon: AddIcon, label: 'New post', appearance: 'primary', onClick: () => history.push('/post/new'), style: theme.primary },
        ]}
        description='The list with all of the public posts, the posts the users will see on your blog.'
      />

      <PostsTable
        posts={posts}
        onSelect={nagivateToPostHandler}
        onSearchChange={onSearchChange}
      />
    </div>
  )
}

export default Posts