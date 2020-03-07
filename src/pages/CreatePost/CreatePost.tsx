import React from 'react'
import Topbar from '../../components/Layout/Topbar'
import { useHistory } from 'react-router-dom'

const CreatePost: React.FC = () => {

  const history = useHistory()

  return (
    <Topbar 
      title='Create Post'
      actions={[
        { iconName: 'add', label: 'New post', appearance: 'primary', onClick: () => history.push('/post/new') },
       ]}
    />
  )
}

export default CreatePost