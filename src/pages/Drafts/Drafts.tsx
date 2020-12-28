import React, { useEffect, useState } from 'react'
import Topbar from '../../components/Layout/Topbar'
import { useHistory } from 'react-router-dom'
import PostsTable from '../../components/PostsTable'
import classes from '../Posts/styles.module.scss'
import { AddIcon, Spinner, useTheme } from 'evergreen-ui'
import { BlogPost, PostVisibility, Store, VictoriaTheme } from '../../types'
import { useDispatch, useSelector } from 'react-redux'
import { getPostsList } from '../../reducers/blog'

const Drafts: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const theme = useTheme() as VictoriaTheme

  const blogReducer = useSelector(({ blog }: Store) => blog)
  const blogData = blogReducer.blog

  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getPostsList(PostVisibility.NotListed))
  }, [dispatch, getPostsList])

  const history = useHistory()

  useEffect(() => {
    setPosts(blogData.posts)
  }, [blogData.posts])

  const handlePostClick = (postID: string) => () => {
    history.push(`/post/${postID}`)
  }

  const handleOnSearchChange = (value: string) => {
    if (!value) return setPosts(blogData.posts)

    const searchValue = value.toLocaleLowerCase()
    setPosts(posts.filter(post => post.title.toLocaleLowerCase().includes(searchValue)))
  }

  if (!blogData || blogReducer.working || !posts) return <Spinner marginX="auto" marginY={120} />

  return (
    <div className={classes.postsContainer}>
      <Topbar
        title='Drafts'
        actions={[
          { icon: AddIcon, label: 'New post', appearance: 'primary', onClick: () => history.push('/post/new'), style: theme.primary },
        ]}
        description='The list of posts that are not published or are work in progress.'
      />

      <PostsTable
        posts={posts}
        onSelect={handlePostClick}
        onSearchChange={handleOnSearchChange}
      />
    </div>
  )
}

export default Drafts