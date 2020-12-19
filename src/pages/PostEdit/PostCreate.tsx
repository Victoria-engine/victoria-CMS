import React, { useState, useEffect } from 'react'
import { PostEditProps as Props, Store } from '../../types'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Topbar from '../../components/Layout/Topbar'
import { TextInputField } from 'evergreen-ui'
import { createPost } from '../../reducers/blog'
import Editor from './Editor'
import { EDITOR_JS_TOOLS, EMPTY_POST, INITIAL_EDITOR_DATA, isNameValidField } from './editorTools'
import { OutputData } from '@editorjs/editorjs'
import classes from './styles.module.scss'
import cx from 'classnames'


/**
 * Post manipulation screen
 */
const PostEdit: React.FC<Props> = () => {
  const [editorData, setEditorData] = useState<OutputData>(INITIAL_EDITOR_DATA)
  const [postData, setPostData] = useState({ ...EMPTY_POST })
  const [hasChangesToSave, setHasChangesToSave] = useState(false)
  const [hasFieldChanged, setHasFieldChanged] = useState({
    title: false,
    description: false,
    editor: false,
  })

  const dispatch = useDispatch()
  const history = useHistory()

  const hasSavedSuccess = useSelector(({ blog }: Store) => blog.hasSavedSuccess)

  const onCreatePost = () => {
    const { visibility, title, description } = postData

    dispatch(
      createPost({
        text: JSON.stringify(editorData),
        visibility,
        title,
        description,
      }))

    window.setTimeout(() => { history.push('/drafts') }, 700)
  }

  const onPostDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value, name } } = event

    setPostData({
      ...postData,
      [name]: value,
    })

    if (!isNameValidField(name)) return

    if (!hasFieldChanged[name]) setHasFieldChanged({ ...hasFieldChanged, [name]: true })
    if (!hasChangesToSave) setHasChangesToSave(true)
  }

  const onEditorDataChange = (value: OutputData) => {
    setEditorData(value)

    if (!hasChangesToSave) setHasChangesToSave(true)
  }

  useEffect(() => {
    hasSavedSuccess && setHasChangesToSave(false)
  }, [hasSavedSuccess])

  return (
    <article>
      <Topbar title={postData.title} actions={[
        { label: 'Exit', onClick: () => history.push('/'), appearance: 'primary', iconName: 'step-backward', intent: 'none' },
        { label: 'Create', onClick: onCreatePost, appearance: 'primary', iconName: 'plus', intent: 'success', isDisabled: !hasChangesToSave },
        { label: 'Publish', onClick: () => { }, appearance: 'primary', iconName: 'publish-function', intent: 'warning', isDisabled: true },
        { label: 'Delete', onClick: () => { }, appearance: 'minimal', iconName: 'delete', intent: 'danger', isDisabled: true },
      ]} />

      <div className={classes.mainWrapper}>

        <TextInputField
          name='title'
          onChange={onPostDataChange}
          value={postData.title}
          className={cx(classes.borderlessInput, classes.title)}
          isInvalid={postData.title.length <= 0 && hasFieldChanged['title']}
          placeholder='Title'
        />

        <TextInputField
          name='description'
          onChange={onPostDataChange}
          value={postData.description}
          className={classes.borderlessInput}
          isInvalid={postData.description.length <= 0 && hasFieldChanged['description']}
          placeholder='Description'
        />

        <Editor
          tools={EDITOR_JS_TOOLS as any}
          data={editorData}
          onData={onEditorDataChange}
          autofocus
        />

      </div>

    </article>
  )
}

export default PostEdit