import React, { useState } from 'react'
import { PostEditProps as Props } from '../../types'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Topbar from '../../components/Layout/Topbar'
import { TextInputField } from 'evergreen-ui'
import { createPost } from '../../reducers/blog'
import Editor from './Editor'
import { EDITOR_JS_TOOLS, EMPTY_POST } from './editorTools'
import { OutputData } from '@editorjs/editorjs'

/**
 * Post manipulation screen
 */
const PostEdit: React.FC<Props> = () => {
  const [editorData, setEditorData] = useState<OutputData>()
  const [postData, setPostData] = useState({ ...EMPTY_POST })

  const dispatch = useDispatch()
  const history = useHistory()

  const onCreatePost = () => {
    const { visibility, title, excerpt } = postData
    dispatch(createPost({ html: postData as any, visibility, title, description: excerpt }))
  }

  const onPostDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value, name } } = event

    setPostData({
      ...postData,
      [name]: value,
    })
  }

  return (
    <article>
      <Topbar title={postData.title} actions={[
        { label: 'Exit', onClick: () => history.push('/'), appearance: 'primary', iconName: 'step-backward', intent: 'none' },
        { label: 'Create', onClick: onCreatePost, appearance: 'primary', iconName: 'plus', intent: 'success' },
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

      <Editor
        tools={EDITOR_JS_TOOLS as any}
        data={editorData}
        onData={setEditorData}
      />

    </article>
  )
}

export default PostEdit