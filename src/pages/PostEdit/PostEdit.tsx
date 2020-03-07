import React, { useEffect, useState } from 'react'
import { PostEditProps as Props, Store, BlogPost } from '../../types'
import { useLocation, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Topbar from '../../components/Layout/Topbar'
import { Spinner, TextInputField } from 'evergreen-ui'
import { getPostByID, savePost, createPost } from '../../reducers/blog'
import Editor from '@stfy/react-editor.js'
import { EDITOR_JS_TOOLS, getRandomQuote } from './editorTools'
import { OutputData } from '@editorjs/editorjs'

export const getPostIDFromPathname = (pathname: string) => {
  const arr = pathname.split('/')
  return arr[arr.length - 1]
}

const INITIAL_EDITOR_DATA = {
  time: 1556098174501,
  blocks: [
    {
      type: "header",
      data: {
        text: getRandomQuote(),
        level: 2
      }
    },
    {
      type: "paragraph",
      data: {
        text:
          "Pro tip: Press TAB for more commands when writing."
      }
    }
  ]
}

const EMPTY_POST: BlogPost = {
  _id: '',
  html: JSON.stringify(INITIAL_EDITOR_DATA),
  visibility: 'private',
  title: '',
  tags: [],
  author: '',
  createdAt: '',
  excerpt: '',
  reading_time: 0,
  updatedAt: '',
  description: '',
}

/**
 * Post manipulation screen
 */
const PostEdit: React.FC<Props> = () => {
  const [editorData, setEditorData] = useState<OutputData>()
  const [postData, setPostData] = useState({ ...EMPTY_POST })

  const { pathname } = useLocation()
  const dispatch = useDispatch()
  const history = useHistory()

  const postID = getPostIDFromPathname(pathname)

  // Selectors
  const blog = useSelector(({ blog }: Store) => blog.blog)

  const selectedPost = (blog.posts && blog.posts.find(post => post._id === postID))
  const isCreating = postID === 'new'

  const onSaveHandler = () => {
    const { visibility,title, description } = postData
    dispatch(savePost({
      id: selectedPost?._id,
      html: JSON.stringify(editorData) || JSON.stringify(selectedPost?.html),
      visibility,
      title,
      description,
    }))
  }

  const onCreatePost = () => {
    const { html, visibility, title, description } = postData
    dispatch(createPost({ html, visibility, title, description }))
  }

  const onPostDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value, name } } = event

    setPostData({
      ...postData,
      [name]: value,
    })
  }

  useEffect(() => {
    if (isCreating) {
      setEditorData(INITIAL_EDITOR_DATA)
    }
    // We fetch the post again to make it's the latest updated
    if (postID && !isCreating) {
      dispatch(getPostByID({ postID }))
    }

  }, [dispatch, postID, isCreating])

  if (!selectedPost) return <Spinner />

  return (
    <article>
      <Topbar title={postData.title || selectedPost.title} actions={[
        { label: 'Exit', onClick: () => history.push('/'), appearance: 'primary', iconName: 'step-backward', intent: 'none' },
        {
          label: isCreating ? 'Create' : 'Save',
          onClick: isCreating ? onCreatePost : onSaveHandler, appearance: 'primary',
          iconName: isCreating ? 'plus' : 'saved', intent: 'success'
        },
        { label: 'Publish', onClick: () => { }, appearance: 'primary', iconName: 'publish-function', intent: 'warning', isDisabled: true },
        { label: 'Delete', onClick: () => { }, appearance: 'minimal', iconName: 'delete', intent: 'danger', isDisabled: true },
      ]} />

      {/* //FIXME: move this to topbar and REFACTOR ALL OF THIS */}
      <TextInputField
        name='title'
        onChange={onPostDataChange}
        value={postData.title || selectedPost.title}
        label='Title'
      />

      <TextInputField
        name='description'
        onChange={onPostDataChange}
        value={postData.description || selectedPost.description}
        label='Description'
      />

      <div id='editorjs'>
        {selectedPost.html && <Editor
          autofocus
          onChange={() => console.log('Something is changing!!')}
          onData={(data: OutputData) => setEditorData(data)}
          onReady={() => console.log('Start!')}
          //@ts-ignore
          tools={EDITOR_JS_TOOLS}
          data={editorData || JSON.parse(selectedPost.html)}
        />}
      </div>

    </article>
  )
}

export default PostEdit