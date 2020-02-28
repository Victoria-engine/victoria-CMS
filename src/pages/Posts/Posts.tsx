import React from 'react'
import { PostsProps as Props } from '../../types'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../reducers/auth'
import Topbar from '../../components/Layout/Topbar'

/**
 * Posts list
 */
const Posts: React.FC<Props> = () => {

  const dispatch = useDispatch()

  const onLoginUser = () => {
    dispatch(loginUser({
      credentials: {
        email: 'dev@victoria.com',
        password: 'asd'
      }
    }))

  }

  return (
    <div>
      <Topbar
        actions={[
         { iconName: 'add', label: 'New post', appearance: 'primary', onClick: () => console.log('creating post') },
        ]}
        title='Posts list'
      />
      Posts list

      <button onClick={onLoginUser}>Login user</button>
    </div>
  )
}

export default Posts