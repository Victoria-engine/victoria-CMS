import React, { useEffect, useState } from 'react'
import { PostEditProps as Props, Store, BlogPost, PostVisibility } from '../../types'
import { useLocation, useHistory, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Topbar from '../../components/Layout/Topbar'
import { DeleteIcon, PublishFunctionIcon, SavedIcon, Spinner, StepBackwardIcon, TextInput } from 'evergreen-ui'
import { deletePost, getPostByID, savePost, togglePublishPost } from '../../reducers/blog'
import Editor from './Editor'
import { EDITOR_JS_TOOLS, isNameValidField } from './editorTools'
import { OutputData } from '@editorjs/editorjs'
import classes from './styles.module.scss'
import cx from 'classnames'
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal'

export const getPostIDFromPathname = (pathname: string) => {
  const arr = pathname.split('/')
  return arr[arr.length - 1]
}

/**
 * Posts text string is converted safely to a OutputData block
 */
const safeRenderEditorText = (data: BlogPost['text']): OutputData => {
  if (typeof data === 'string') {
    return {
      blocks: [
        {
          type: 'paragraph',
          data: {
            text: data,
          },
        }
      ]
    } as OutputData
  }

  return data
}


/**
 * Post manipulation screen
 */
const PostEdit: React.FC<Props> = () => {
  const { blog, hasSavedSuccess, postDeletedID } = useSelector(({ blog }: Store) => blog)

  const { pathname } = useLocation()
  const postID = getPostIDFromPathname(pathname)
  const selectedPost = blog.posts.find(p => p.id == postID)

  const [editorData, setEditorData] = useState<OutputData>()
  const [postData, setPostData] = useState<BlogPost | undefined>(selectedPost)
  const [fetchSuccess, setFetchSuccess] = useState(false)
  const [hasChangesToSave, setHasChangesToSave] = useState(false)
  const [hasFieldChanged, setHasFieldChanged] = useState({
    title: false,
    description: false,
    editor: false,
  })
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)

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

  useEffect(() => {
    if (!selectedPost) return

    setPostData(selectedPost)
    setFetchSuccess(true)
  }, [selectedPost])

  useEffect(() => {
    if (!hasSavedSuccess) return

    setHasChangesToSave(false)
  }, [hasSavedSuccess])

  useEffect(() => {
    if (postDeletedID === selectedPost?.id) {
      history.push('/drafts')
      return
    }
  }, [postDeletedID])


  const onSaveClick = () => {
    if (!postData) return

    const { title, description, visibility } = postData
    const postText = editorData || selectedPost?.text

    dispatch(
      savePost({
        id: selectedPost?.id,
        text: typeof postText === 'string' ? postText : JSON.stringify(postText),
        title,
        visibility,
        description,
      }))
  }

  const onPublishClick = () => {
    if (!postData) return

    const { title, description, visibility } = postData

    const newVisibility: BlogPost['visibility'] = [PostVisibility.NotListed]
      .includes(visibility) ? PostVisibility.Public : PostVisibility.NotListed
    const postText = editorData || selectedPost?.text

    dispatch(
      togglePublishPost({
        id: selectedPost?.id,
        visibility: newVisibility,
        text: postText,
        title,
        description,
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


  const onConfirmDelete = () => {
    if (!selectedPost) return
    dispatch(deletePost(selectedPost.id))
    setDeleteConfirmOpen(false)
  }

  const onDeleteClick = () => {
    setDeleteConfirmOpen(true)
  }

  if (!selectedPost || !postData) return <Spinner marginX="auto" marginY={120} />

  const publishButtonText = postData.visibility === 'public' ? 'Unpublish' : 'Publish'
  const isDisabled = postData.visibility !== 'not-listed'


  return (
    <article>
      <Topbar title={postData.title} actions={[
        { label: 'Exit', onClick: () => history.goBack(), appearance: 'primary', icon: StepBackwardIcon, intent: 'none' },
        { label: 'Save', onClick: onSaveClick, appearance: 'primary', icon: SavedIcon, intent: 'success', isDisabled: !hasChangesToSave || isDisabled },
        { label: publishButtonText, onClick: onPublishClick, appearance: 'primary', icon: PublishFunctionIcon, intent: 'warning' },
        { label: 'Delete', onClick: onDeleteClick, appearance: 'minimal', icon: DeleteIcon, intent: 'danger', isDisabled: isDisabled },
      ]} />

      <div className={classes.mainWrapper}>

        <TextInput
          name='title'
          onChange={onPostDataChange}
          value={postData.title}
          className={cx(classes.borderlessInput, classes.title)}
          isInvalid={postData.title?.length <= 0}
          placeholder='Title'
          disabled={isDisabled}
        />

        <TextInput
          name='description'
          onChange={onPostDataChange}
          value={postData.description}
          className={classes.borderlessInput}
          isInvalid={postData.description?.length <= 0}
          placeholder='Description'
          disabled={isDisabled}
        />

        {fetchSuccess &&
          <Editor
            tools={EDITOR_JS_TOOLS as any}
            data={safeRenderEditorText(postData.text)}
            onData={onEditorDataChange}
            autofocus
          />}
      </div>

      <ConfirmDeleteModal
        open={deleteConfirmOpen}
        confirmText='Delete'
        title={<p>Delete post <b>{selectedPost.title}</b></p>}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={onConfirmDelete}
      >
        This action is irreversible, are you sure you want to delete this post ?
      </ConfirmDeleteModal>

    </article>
  )
}

export default PostEdit