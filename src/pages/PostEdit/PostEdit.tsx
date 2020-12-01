import React, { useEffect, useState } from 'react'
import { PostEditProps as Props, Store, BlogPost } from '../../types'
import { useLocation, useHistory, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Topbar from '../../components/Layout/Topbar'
import { Spinner, TextInput } from 'evergreen-ui'
import { getPostByID, savePost, togglePublishPost } from '../../reducers/blog'
import Editor from './Editor'
import { EDITOR_JS_TOOLS, isNameValidField } from './editorTools'
import { OutputData } from '@editorjs/editorjs'
import classes from './styles.module.scss'
import cx from 'classnames'

export const getPostIDFromPathname = (pathname: string) => {
  const arr = pathname.split('/')
  return arr[arr.length - 1]
}


/**
 * Post manipulation screen
 */
const PostEdit: React.FC<Props> = () => {
  const { blog, hasSavedSuccess } = useSelector(({ blog }: Store) => blog)

  const { pathname } = useLocation()
  const postID = getPostIDFromPathname(pathname)
  const selectedPost = blog.posts.find(p => p.id == postID)

  const [editorData, setEditorData] = useState<OutputData>()
  const [postData, setPostData] = useState<BlogPost | undefined>(selectedPost)
  const [fetchSuccess, setFetchSuccess] = useState(false)
  const [hasChangesToSave, setHasChangesToSave] = useState(false)
  const [hasFieldChanged, setHasFieldChanged] = useState({
    title: false,
    excerpt: false,
    editor: false,
  })

  const dispatch = useDispatch()
  const history = useHistory()

  const isCreating = postID === 'new'

  useEffect(() => {
    if (!postID) {
      history.push('/')
      return
    }

    const consumerKey = blog.key
    if (!postID || isCreating || !consumerKey) return

    dispatch(getPostByID({ postID }))
  }, [dispatch, postID, isCreating, blog.key, history])


  const onSaveHandler = () => {
    if (!postData) return

    const { title, description: excerpt, visibility } = postData
    const postText = editorData || selectedPost?.text

    dispatch(
      savePost({
        id: selectedPost?.id,
        text: JSON.stringify(postText),
        title,
        visibility,
        description: excerpt,
      }))
  }

  const onPublishHandler = () => {
    if (!postData) return

    const { title, description: excerpt, visibility } = postData

    const newVisibility: BlogPost['visibility'] = ['not-listed', 'private'].includes(visibility) ? 'public' : 'not-listed'
    const postText = editorData || selectedPost?.text

    dispatch(
      togglePublishPost({
        id: selectedPost?.id,
        visibility: newVisibility,
        text: postText,
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

    if (!isNameValidField(name)) return
    if (!hasFieldChanged[name]) setHasFieldChanged({ ...hasFieldChanged, [name]: true })
    if (!hasChangesToSave) setHasChangesToSave(true)
  }

  const onEditorDataChange = (value: OutputData) => {
    setEditorData(value)

    if (!hasChangesToSave) setHasChangesToSave(true)
  }

  useEffect(() => {
    if (!selectedPost) return

    setPostData(selectedPost)
    setFetchSuccess(true)
  }, [selectedPost])

  useEffect(() => {
    if (!hasSavedSuccess) return

    setHasChangesToSave(false)
  }, [hasSavedSuccess])


  if (!selectedPost || !postData) return <Spinner />

  const publishButtonText = postData.visibility === 'public' ? 'Unpublish' : 'Publish'
  const isDisabled = postData.visibility !== 'not-listed'

  console.log(postData)


  return (
    <article>
      <Topbar title={postData.title} actions={[
        { label: 'Exit', onClick: () => history.goBack(), appearance: 'primary', iconName: 'step-backward', intent: 'none' },
        { label: 'Save', onClick: onSaveHandler, appearance: 'primary', iconName: 'saved', intent: 'success', isDisabled: !hasChangesToSave || isDisabled },
        { label: publishButtonText, onClick: onPublishHandler, appearance: 'primary', iconName: 'publish-function', intent: 'warning' },
        { label: 'Delete', onClick: () => { }, appearance: 'minimal', iconName: 'delete', intent: 'danger', isDisabled: true },
      ]} />

      <div className={classes.mainWrapper}>

        <TextInput
          name='title'
          onChange={onPostDataChange}
          value={postData.title}
          className={cx(classes.borderlessInput, classes.title)}
          isInvalid={postData.title.length <= 0}
          placeholder='Title'
          disabled={isDisabled}
        />

        <TextInput
          name='excerpt'
          onChange={onPostDataChange}
          value={postData.description}
          className={classes.borderlessInput}
          isInvalid={postData.description.length <= 0}
          placeholder='Description'
          disabled={isDisabled}
        />

        {fetchSuccess &&
          <Editor
            tools={EDITOR_JS_TOOLS as any}
            data={JSON.parse(postData.text as string)}
            onData={onEditorDataChange}
            autofocus
          />}

      </div>

    </article>
  )
}

export default PostEdit