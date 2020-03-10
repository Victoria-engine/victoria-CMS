import React, { useEffect, useState } from 'react'
import { PostEditProps as Props, Store } from '../../types'
import { useLocation, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Topbar from '../../components/Layout/Topbar'
import { Spinner, TextInputField } from 'evergreen-ui'
import { getPostByID, savePost } from '../../reducers/blog'
import Editor from './Editor'
import { EDITOR_JS_TOOLS } from './editorTools'
import { OutputData } from '@editorjs/editorjs'

export const getPostIDFromPathname = (pathname: string) => {
  const arr = pathname.split('/')
  return arr[arr.length - 1]
}


/**
 * Post manipulation screen
 */
const PostEdit: React.FC<Props> = () => {
  // Selectors
  const blog = useSelector(({ blog }: Store) => blog.blog)

  const { pathname } = useLocation()
  const postID = getPostIDFromPathname(pathname)
  const selectedPost = (blog.posts && blog.posts.find(post => post._id === postID))

  // Locale State
  const [editorData, setEditorData] = useState<OutputData>()
  const [postData, setPostData] = useState(selectedPost)
  const [fetchSuccess, setFetchSuccess] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()

  const isCreating = postID === 'new'

  const onSaveHandler = () => {
    if (!postData) return

    const { visibility, title, excerpt } = postData
    dispatch(savePost({
      id: selectedPost?._id,
      //@ts-ignore
      html: editorData || selectedPost?.html,
      visibility,
      title,
      description: excerpt,
    }))
  }

  const onPostDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!postData) return

    const { target: { value, name } } = event

    setPostData({
      ...postData,
      [name]: value,
    })
  }

  useEffect(() => {
    // We fetch the post again to make it's the latest updated
    if (postID && !isCreating) {
      dispatch(getPostByID({ postID }))
    }
  }, [dispatch, postID, isCreating])

  useEffect(() => {
    // Sync Props with state
    selectedPost && setPostData(selectedPost)
    setFetchSuccess(true)

  }, [selectedPost])

  if (!selectedPost || !postData) return <Spinner />

  return (
    <article>
      <Topbar title={postData.title} actions={[
        { label: 'Exit', onClick: () => history.push('/'), appearance: 'primary', iconName: 'step-backward', intent: 'none' },
        { label: 'Save', onClick: onSaveHandler, appearance: 'primary', iconName: 'saved', intent: 'success' },
        { label: 'Publish', onClick: () => { }, appearance: 'primary', iconName: 'publish-function', intent: 'warning', isDisabled: true },
        { label: 'Delete', onClick: () => { }, appearance: 'minimal', iconName: 'delete', intent: 'danger', isDisabled: true },
      ]} />

      <TextInputField
        name='title'
        onChange={onPostDataChange}
        value={postData.title}
        label='Title'
      />

      <TextInputField
        name='excerpt'
        onChange={onPostDataChange}
        value={postData.excerpt}
        label='Description'
      />

      {fetchSuccess && <Editor
        tools={EDITOR_JS_TOOLS as any}
        data={postData.html}
        onData={setEditorData}
      />}

    </article>
  )
}

export default PostEdit