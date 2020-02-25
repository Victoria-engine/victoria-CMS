import React from 'react'
import { PostsProps as Props } from '../../types'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../reducers/auth'


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
      Posts list

      <button onClick={onLoginUser}>Login user</button>
    </div>
  )
}

export default Posts