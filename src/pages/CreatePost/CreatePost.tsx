import React from 'react'
import Topbar from '../../components/Layout/Topbar'

const CreatePost: React.FC = () => {
  return (
    <Topbar 
      title='Create Post'
      actions={[
        { iconName: 'add', label: 'New post', appearance: 'primary', onClick: () => console.log('creating post') },
       ]}
    />
  )
}

export default CreatePost