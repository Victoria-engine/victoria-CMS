import React from 'react'
import { PostsProps as Props } from '../../types'
import { useDispatch } from 'react-redux'
import Topbar from '../../components/Layout/Topbar'

/**
 * Posts list
 */
const Posts: React.FC<Props> = () => {

  const dispatch = useDispatch()
  return (
    <div>
      <Topbar
        actions={[
         { iconName: 'add', label: 'New post', appearance: 'primary', onClick: () => console.log('creating post') },
        ]}
        title='Posts list'
      />
      Posts list
    </div>
  )
}

export default Posts