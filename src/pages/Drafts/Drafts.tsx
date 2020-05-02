import React, { useEffect, useState } from 'react'
import Topbar from '../../components/Layout/Topbar'
import { useHistory } from 'react-router-dom'
import PostsTable from '../../components/PostsTable'
import classes from '../Posts/styles.module.scss'
import { Spinner } from 'evergreen-ui'
import { BlogPost, Store } from '../../types'
import { useSelector } from 'react-redux'

const Drafts: React.FC = () => {

  // Local State
  const [posts, setPosts] = useState<BlogPost[]>([])


  // Selectors
  const blogReducer = useSelector(({ blog }: Store) => blog)
  const blogData = blogReducer.blog


  useEffect(() => {
    // getPosts...
  })

  const history = useHistory()

  useEffect(() => {
    setPosts(blogData.posts.filter(p => ['not-listed', 'private'].includes(p.visibility)))
  }, [blogData.posts])

  const nagivateToPostHandler = (postID: string) => () => {
    history.push(`/post/${postID}`)
  }

  const onSearchChange = (value: string) => {
    if (!value) return setPosts(blogData.posts)

    const searchValue = value.toLocaleLowerCase()

    setPosts(posts.filter(post => post.title.toLocaleLowerCase().includes(searchValue)))
  }

  if (!blogData || blogReducer.working || !posts) return <Spinner />

  return (
    <div className={classes.postsContainer}>
      <Topbar
        title='Drafts'
        actions={[
          { iconName: 'add', label: 'New post', appearance: 'primary', onClick: () => history.push('/post/new') },
        ]}
        description='The list of posts that are not published or are work in progress.'
      />

      <PostsTable
        posts={posts}
        onSelect={nagivateToPostHandler}
        onSearchChange={onSearchChange}
      />
    </div>
  )
}

export default Drafts