import React, { useEffect, useState } from 'react'
import { PostEditProps as Props, Store } from '../../types'
import { useLocation, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Topbar from '../../components/Layout/Topbar'
import { Spinner } from 'evergreen-ui'
import { getPostByID, savePost } from '../../reducers/blog'
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

/**
 * Post manipulation screen
 */
const PostEdit: React.FC<Props> = () => {
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  const history = useHistory()

  const postID = getPostIDFromPathname(pathname)

  // Selectors
  const blog = useSelector(({ blog }: Store) => blog.blog)

  const selectedPost = blog.posts && blog.posts.find(post => post._id === postID)


  const [editorData, setEditorData] = useState<OutputData>()

  const onSaveHandler = () => {
    dispatch(savePost({
      description: 'DUMMY DESCRIPTION',
      html: JSON.stringify(editorData),
      slug: 'DUMMY SLUG',
      title: 'DUMMY TITLE',
      visibility: 'public',
    }))
  }

  useEffect(() => {
    // We fetch the post again to make it's the latest updated
    if (postID) {
      dispatch(getPostByID({ postID }))
    }

  }, [dispatch, postID])

  if (!selectedPost) return <Spinner />

  return (
    <article>
      <Topbar title={selectedPost.title} actions={[
        { label: 'Exit', onClick: () => history.push('/'), appearance: 'primary', iconName: 'step-backward', intent: 'none' },
        { label: 'Save', onClick: onSaveHandler, appearance: 'primary', iconName: 'saved', intent: 'success' },
        { label: 'Publish', onClick: () => { }, appearance: 'primary', iconName: 'publish-function', intent: 'warning' },
        { label: 'Delete', onClick: () => { }, appearance: 'minimal', iconName: 'delete', intent: 'danger' },
      ]} />

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